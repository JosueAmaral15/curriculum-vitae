// Read-only page audit. Three.js' devtools hook exposes the rendered scene;
// render calls pass through unchanged. No application source or GLB is edited.
import { chromium, firefox } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const at = arg.indexOf('=');
  if (at < 0) throw new Error('Use --name=value arguments');
  return [arg.slice(2, at), arg.slice(at + 1)];
}));
const output = resolve(args.output ?? 'test-results/camera-audit');
await mkdir(output, { recursive: true });
let server;
let url = args.url;
if (args['static-dir']) {
  const root = resolve(args['static-dir']);
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.glb': 'model/gltf-binary', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
  server = createServer(async (req, res) => {
    try {
      let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
      if (file !== root && !file.startsWith(root + sep)) throw new Error('Outside static directory');
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      const bytes = await readFile(file);
      res.writeHead(200, { 'Content-Type': types[extname(file)] ?? 'application/octet-stream', 'Cache-Control': 'no-store' });
      res.end(bytes);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  url = `http://127.0.0.1:${server.address().port}`;
}
if (!url) throw new Error('Supply --url=URL or --static-dir=PATH');

const cases = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844 },
  { name: 'short-phone-pt', width: 390, height: 650, language: 'pt-BR' },
  { name: 'breakpoint', width: 680, height: 900 },
  { name: 'tablet', width: 834, height: 1194 },
];
if (args.matrix === 'true') cases.push(
  ...[320, 639, 640, 704, 705].map(width => ({ name: `width-${width}`, width, height: 650 })),
  { name: 'landscape-pt', width: 844, height: 390, language: 'pt-BR' },
);
const report = { date: new Date().toISOString(), url, staticDirectory: args['static-dir'], scope: 'Rendered vertex projections, not occlusion or physical-device performance', cases: [] };
const engines = args.browser ? [args.browser] : ['chromium', 'firefox'];
try {
  for (const engine of engines) {
    const browser = await ({ chromium, firefox }[engine]).launch({ headless: true });
    try {
      for (const viewport of cases.filter(c => !args.case || c.name === args.case)) {
        const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, reducedMotion: 'no-preference', deviceScaleFactor: 1 });
        await context.addInitScript(language => {
          if (language) localStorage.setItem('portfolio-language', language);
          const hook = new EventTarget();
          window.__THREE_DEVTOOLS__ = hook;
          window.__cameraAudit = { frames: 0 };
          hook.addEventListener('observe', ({ detail }) => {
            if (!detail.isWebGLRenderer) return;
            const setLoop = detail.setAnimationLoop;
            detail.setAnimationLoop = function(callback) {
              if (callback) window.__cameraAudit.loop = callback;
              return setLoop.call(this, callback);
            };
            const render = detail.render;
            detail.render = function(scene, camera) {
              const result = render.call(this, scene, camera);
              Object.assign(window.__cameraAudit, { scene, camera, renderer: this });
              window.__cameraAudit.frames++;
              return result;
            };
          });
        }, args.language ?? viewport.language);
        const page = await context.newPage();
        const entry = { engine, version: browser.version(), viewport, errors: [], requests: [], phases: [] };
        report.cases.push(entry);
        page.on('pageerror', e => entry.errors.push(String(e)));
        page.on('console', m => { if (m.type() === 'error') entry.errors.push(m.text()); });
        page.on('response', r => { if (r.url().endsWith('.glb')) entry.requests.push({ url: r.url(), status: r.status() }); });
        try {
          await page.goto(url, { waitUntil: 'load', timeout: 30000 });
          await page.waitForFunction(() => document.querySelector('[aria-labelledby="assembly-title"]')?.className.includes('ready'), null, { timeout: 20000 });
          await page.evaluate(() => document.fonts.ready);
          await page.waitForTimeout(300);
          const { start, distance } = await page.locator('[aria-labelledby="assembly-title"]').evaluate(s => {
            const track = s.querySelector('[data-assembly-track]');
            const stage = s.querySelector('[data-assembly-stage]');
            if (track && stage) return { start: scrollY + track.getBoundingClientRect().top - parseFloat(getComputedStyle(stage).top), distance: track.clientHeight - stage.clientHeight };
            return { start: (s.parentElement.classList.contains('pin-spacer') ? s.parentElement : s).getBoundingClientRect().top + scrollY, distance: innerWidth < 640 ? 1100 : innerWidth < 1024 ? 1300 : 1600 };
          });
          for (const [name, progress] of [['exploded', 0], ['middle', 0.5], ['assembled', 0.995], ['reverse', 0]]) {
            await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), start + distance * progress);
            await page.waitForTimeout(1800); // Allow the existing one-second scrub to settle.
            const metrics = await page.evaluate(sweep => {
              const { scene, camera, renderer, frames } = window.__cameraAudit;
              const section = document.querySelector('[aria-labelledby="assembly-title"]');
              const canvas = section.querySelector('canvas');
              const copy = section.querySelector('h2').parentElement;
              const box = e => e.getBoundingClientRect().toJSON();
              const canvasBounds = canvas.getBoundingClientRect();
              if (!scene || !camera) return { frames, sceneMissing: true, section: box(section), canvas: box(canvas) };
              const meshes = [];
              scene.traverse(o => {
                if (!o.isMesh) return;
                const a = o.geometry.attributes.position;
                const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
                const outside = { left: 0, right: 0, top: 0, bottom: 0, depth: 0 };
                const screenOutside = { left: 0, right: 0, top: 0, bottom: 0 };
                const v = o.position.clone();
                for (let i = 0; i < a.count; i++) {
                  v.fromBufferAttribute(a, i).applyMatrix4(o.matrixWorld).project(camera);
                  [v.x, v.y, v.z].forEach((n, k) => { min[k] = Math.min(min[k], n); max[k] = Math.max(max[k], n); });
                  if (v.x < -1) outside.left++; if (v.x > 1) outside.right++;
                  if (v.y > 1) outside.top++; if (v.y < -1) outside.bottom++;
                  if (v.z < -1 || v.z > 1) outside.depth++;
                  const screenX = canvasBounds.left + (v.x + 1) * canvasBounds.width / 2;
                  const screenY = canvasBounds.top + (1 - v.y) * canvasBounds.height / 2;
                  if (screenX < 0) screenOutside.left++; if (screenX > innerWidth) screenOutside.right++;
                  if (screenY < 0) screenOutside.top++; if (screenY > innerHeight) screenOutside.bottom++;
                }
                meshes.push({ name: o.name, parent: o.parent.name, visible: o.visible, vertices: a.count, min, max, outside, screenOutside });
              });
              const model = scene.children.find(c => c.isGroup);
              const sweepFailures = [];
              if (sweep && model) {
                const rotation = model.rotation.y;
                const loop = window.__cameraAudit.loop;
                renderer.setAnimationLoop(null);
                for (let step = 0; step < 16; step++) {
                  model.rotation.y = step * Math.PI / 8;
                  renderer.render(scene, camera);
                  scene.traverse(o => {
                    if (!o.isMesh) return;
                    const a = o.geometry.attributes.position, v = o.position.clone();
                    for (let i = 0; i < a.count; i++) {
                      v.fromBufferAttribute(a, i).applyMatrix4(o.matrixWorld).project(camera);
                      const screenX = canvasBounds.left + (v.x + 1) * canvasBounds.width / 2;
                      const screenY = canvasBounds.top + (1 - v.y) * canvasBounds.height / 2;
                      if (Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z)) > 1
                        || screenX < 0 || screenX > innerWidth || screenY < 0 || screenY > innerHeight) {
                        sweepFailures.push({ angle: step, part: o.parent.name }); break;
                      }
                    }
                  });
                }
                model.rotation.y = rotation;
                renderer.render(scene, camera);
                renderer.setAnimationLoop(loop);
              }
              const a = box(canvas), b = box(copy);
              const overlap = Math.min(a.right, b.right) > Math.max(a.left, b.left) && Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top);
              const intentionalOverlay = section.dataset.assemblyOverlay === 'true';
              return { frames, scrollY, section: box(section), canvas: box(canvas), copy: box(copy),
                overlap, intentionalOverlay, sweepFailures, canvasInViewport: a.top >= -1 && a.bottom <= innerHeight + 1 && a.left >= -1 && a.right <= innerWidth + 1,
                css: { clipPath: getComputedStyle(canvas).clipPath, canvasHeight: getComputedStyle(canvas).height, sectionOverflow: getComputedStyle(section).overflow,
                  canvasZ: Number(getComputedStyle(canvas).zIndex), copyZ: Number(getComputedStyle(copy).zIndex) },
                camera: { aspect: camera.aspect, fov: camera.fov, position: camera.position.toArray() },
                model: model && { position: model.position.toArray(), scale: model.scale.toArray(), rotation: model.rotation.toArray() },
                drawingBuffer: [canvas.width, canvas.height], draw: { ...renderer.info.render }, contextLost: renderer.getContext().isContextLost(), meshes };
            }, args.verify === 'true');
            const filename = `${engine}-${viewport.name}-${name}.png`;
            const phase = { name, requestedProgress: progress, screenshot: filename, ...metrics };
            entry.phases.push(phase);
            try { if (args.screenshots !== 'false') await page.screenshot({ path: resolve(output, filename), timeout: 15000 }); }
            catch (error) { phase.screenshotError = String(error); }
            console.log(JSON.stringify({ engine, case: viewport.name, phase: name, meshes: metrics.meshes?.length, outside: metrics.meshes?.filter(m => Object.values(m.outside).some(Boolean)).map(m => m.parent), canvas: metrics.canvas }));
          }
        } catch (error) { entry.failure = String(error); console.error(engine, viewport.name, entry.failure); }
        finally { await context.close(); await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2)); }
      }
    } finally { await browser.close(); }
  }
} finally { if (server) await new Promise(r => server.close(r)); }
if (args.verify === 'true') {
  const failures = report.cases.filter(c => c.failure || c.errors.length || c.phases.length !== 4 || c.phases.some(p =>
    p.meshes?.length !== 28 || p.contextLost || p.css?.clipPath !== 'none' ||
    (p.intentionalOverlay && (!p.overlap || p.css.copyZ <= p.css.canvasZ)) ||
    (p.overlap && !p.intentionalOverlay) || (!p.intentionalOverlay && !p.canvasInViewport) ||
    p.sweepFailures?.length || p.meshes.some(m => !m.visible || Object.values(m.outside).some(Boolean)
      || Object.values(m.screenOutside).some(Boolean))));
  console.log(JSON.stringify({ checked: report.cases.length, failed: failures.map(c => c.viewport.name) }));
  if (failures.length) process.exitCode = 1;
}
