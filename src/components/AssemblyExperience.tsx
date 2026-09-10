"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { assemblyRadius, fitAssemblyCamera } from "@/lib/assembly-framing";
import styles from "./AssemblyExperience.module.css";

type AssemblyCopy = {
  eyebrow: string;
  title: string;
  description: string;
  status: string;
  creditPrefix: string;
};

type AnimatedPart = {
  object: THREE.Object3D;
  assembledPosition: THREE.Vector3;
  explodedPosition: THREE.Vector3;
  assembledQuaternion: THREE.Quaternion;
  explodedQuaternion: THREE.Quaternion;
  start: number;
  end: number;
};

const sourceUrl = "https://sketchfab.com/3d-models/axis-q6010-e-surveillance-camera-143e552bde554ea2aaa72664efab003e";

const directionFor = (index: number) => {
  const directions = [
    new THREE.Vector3(-1.12, 0.68, 0.65),
    new THREE.Vector3(1.08, 0.78, -0.56),
    new THREE.Vector3(-1.16, -0.68, -0.44),
    new THREE.Vector3(1.2, -0.62, 0.62),
    new THREE.Vector3(0.06, 1.2, -0.76),
    new THREE.Vector3(-0.12, -1.08, 0.82),
  ];
  return directions[index % directions.length].clone();
};

const phaseFor = (name: string) => {
  if (/^camera\.00\d/.test(name)) return 0.1;
  if (name.startsWith("cameraBrackets")) return 0.23;
  if (name.startsWith("cameraSmall")) return 0.38;
  if (name.startsWith("cameraLense1")) return 0.5;
  if (name.startsWith("cameraLense2")) return 0.58;
  if (name.includes("panorama")) return 0.68;
  if (name.startsWith("housing")) return 0.76;
  if (name.startsWith("glass")) return 0.86;
  return 0.72;
};

const isAssemblyPart = (name: string) => /^(camera\.00\d|cameraBrackets|cameraSmall|cameraLense|camera\.panorama|housing|glass)/.test(name);

export function AssemblyExperience({ copy, modelUrl }: { copy: AssemblyCopy; modelUrl: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [sceneReady, setSceneReady] = useState(false);
  const [contextAvailable, setContextAvailable] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!section || !stage || !canvas || reduceMotion) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, canvas, powerPreference: "low-power" });
    } catch {
      return;
    }

    const context = renderer.getContext();
    const rendererInfo = context.getExtension("WEBGL_debug_renderer_info");
    const rendererName = rendererInfo
      ? String(context.getParameter(rendererInfo.UNMASKED_RENDERER_WEBGL)).toLowerCase()
      : String(context.getParameter(context.RENDERER)).toLowerCase();
    const isFirefox = /firefox\//i.test(navigator.userAgent);
    const usesSoftwareRendering = /swiftshader|llvmpipe|software/.test(rendererName);
    const drawingBufferPixelBudget = usesSoftwareRendering ? 150_000 : isFirefox ? 450_000 : 1_200_000;
    const renderInterval = usesSoftwareRendering ? 1000 : isFirefox ? 1000 / 12 : 1000 / 30;

    const initialStageBounds = stage.getBoundingClientRect();
    let cancelled = false;
    let visible = initialStageBounds.bottom > 0 && initialStageBounds.top < window.innerHeight;
    let modelReady = false;
    let model: THREE.Group | undefined;
    const parts: AnimatedPart[] = [];
    let observer: IntersectionObserver | undefined;
    const state = { progress: 0 };
    let targetProgress = 0;
    let rotation = 0.15;
    let lastRenderTime = 0;
    let effectiveRenderInterval = renderInterval;
    let scrollFrame = 0;
    const scene = new THREE.Scene();
    const assembly = new THREE.Group();
    assembly.name = "CameraAssembly";
    scene.add(assembly);
    let framingRadius = 1;
    let aspect = 1;
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);

    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    scene.add(new THREE.HemisphereLight(0xb9ecff, 0x080e19, 1.15));
    const keyLight = new THREE.DirectionalLight(0x9ceeff, 3.8);
    keyLight.position.set(4.5, 5.5, 6);
    scene.add(keyLight);
    keyLight.intensity = 2.55;
    const edgeLight = new THREE.PointLight(0xff8c58, 7.5, 18);
    edgeLight.position.set(-4, -1.8, 4);
    scene.add(edgeLight);

    const resize = () => {
      const { width, height } = stage.getBoundingClientRect();
      if (!width || !height) return;
      const isPhone = width < 640;
      const pixelBudgetRatio = Math.sqrt(drawingBufferPixelBudget / (width * height));
      const pixelRatio = Math.min(window.devicePixelRatio, isPhone ? 1.15 : 1.25, Math.max(0.5, pixelBudgetRatio));
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(width, height, false);
      aspect = width / height;
      fitAssemblyCamera(camera, framingRadius, aspect);
    };
    resize();

    let resizeFrame = 0;
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(() => {
        resize();
        updateScrollTarget();
      });
    });
    resizeObserver.observe(stage);

    const updateScrollTarget = () => {
      const distance = Math.max(1, section.offsetHeight - stage.offsetHeight);
      targetProgress = THREE.MathUtils.clamp(-section.getBoundingClientRect().top / distance, 0, 1);
    };

    const scheduleScrollUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        updateScrollTarget();
      });
    };

    window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });

    const pose = (value: number) => {
      for (const part of parts) {
        const progress = THREE.MathUtils.smoothstep((value - part.start) / (part.end - part.start), 0, 1);
        part.object.position.lerpVectors(part.explodedPosition, part.assembledPosition, progress);
        part.object.quaternion.slerpQuaternions(part.explodedQuaternion, part.assembledQuaternion, progress);
      }
    };

    new GLTFLoader().load(modelUrl, (gltf) => {
      if (cancelled) return;
      section.dataset.assemblyPhase = "model-loaded";
      model = gltf.scene;
      if (isFirefox) {
        // The source GLB uses clearcoat/transmission physical materials. On
        // Firefox 155 with the Dell's Intel renderer, compiling those shaders
        // can monopolize the content process. Keep the source colours and
        // transparency while using the lighter standard-material shader path.
        const replacements = new Map<THREE.Material, THREE.Material>();
        const simplifyMaterial = (material: THREE.Material) => {
          const cached = replacements.get(material);
          if (cached) return cached;
          if (!(material instanceof THREE.MeshStandardMaterial)) return material;
          const replacement = new THREE.MeshStandardMaterial({
            alphaTest: material.alphaTest,
            color: material.color.clone(),
            depthTest: material.depthTest,
            depthWrite: material.opacity >= 0.98 && material.depthWrite,
            emissive: material.emissive.clone(),
            emissiveIntensity: material.emissiveIntensity,
            flatShading: material.flatShading,
            metalness: material.metalness,
            name: `${material.name}-firefox`,
            opacity: material.opacity,
            roughness: Math.max(0.12, material.roughness),
            side: material.side,
            transparent: material.transparent || material.opacity < 0.98,
            vertexColors: material.vertexColors,
          });
          replacements.set(material, replacement);
          return replacement;
        };
        model.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          object.material = Array.isArray(object.material)
            ? object.material.map(simplifyMaterial)
            : simplifyMaterial(object.material);
        });
        replacements.forEach((_, original) => original.dispose());
      }
      section.dataset.assemblyPhase = "materials-ready";
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const largestDimension = Math.max(size.x, size.y, size.z);
      model.position.sub(center);
      // Rotate around the actual assembled centre, after centring the source.
      assembly.add(model);
      assembly.scale.setScalar(2.2 / largestDimension);
      assembly.rotation.set(-0.12, 0.15, 0.02);

      let partIndex = 0;
      model.traverse((object) => {
        if (!isAssemblyPart(object.name)) return;
        const assembledPosition = object.position.clone();
        const assembledQuaternion = object.quaternion.clone();
        const phase = phaseFor(object.name);
        const distance = largestDimension * (0.32 + phase * 0.42);
        const explodedPosition = assembledPosition.clone().addScaledVector(directionFor(partIndex), distance);
        const rotation = new THREE.Quaternion().setFromEuler(new THREE.Euler(0.24 + partIndex * 0.045, -0.2 + partIndex * 0.065, 0.14 - partIndex * 0.03));
        parts.push({ object, assembledPosition, explodedPosition, assembledQuaternion, explodedQuaternion: assembledQuaternion.clone().multiply(rotation), start: phase, end: Math.min(1, phase + 0.25) });
        partIndex += 1;
      });

      section.dataset.assemblyPhase = "parts-ready";
      pose(state.progress);
      // Frame the largest, exploded state once. Keeping this distance fixed
      // preserves the original background emphasis while every part remains
      // inside the viewport throughout assembly and rotation.
      framingRadius = assemblyRadius(assembly);
      resize();
      section.dataset.assemblyPhase = "warming-renderer";
      try {
        // A separate compileAsync pass raced the active render loop in the
        // installed Firefox build and could starve its main thread. Render one
        // deterministic warm-up frame before allowing the animation loop to
        // touch the imported model.
        const warmupStartedAt = performance.now();
        renderer.render(scene, camera);
        const warmupDuration = performance.now() - warmupStartedAt;
        section.dataset.assemblyWarmupMs = warmupDuration.toFixed(1);
        if (isFirefox || usesSoftwareRendering) {
          effectiveRenderInterval = Math.max(renderInterval, Math.min(2500, warmupDuration * 3));
        }
      } catch {
        if (!cancelled) setSceneReady(false);
        return;
      }
      if (cancelled) return;
      section.dataset.assemblyPhase = "ready";
      modelReady = true;
      setContextAvailable(true);
      setSceneReady(true);
      resizeFrame = requestAnimationFrame(() => {
        resize();
        updateScrollTarget();
      });
    }, undefined, () => {
      if (!cancelled) {
        section.dataset.assemblyPhase = "load-error";
        setSceneReady(false);
      }
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: 0 });
      observer.observe(stage);
    }

    const render = (time: number) => {
      if (!modelReady || !visible || document.hidden) {
        lastRenderTime = time;
        return;
      }
      if (lastRenderTime && time - lastRenderTime < effectiveRenderInterval) return;
      const delta = lastRenderTime ? Math.min((time - lastRenderTime) / 1000, 0.1) : 1 / 30;
      state.progress = usesSoftwareRendering
        ? targetProgress
        : THREE.MathUtils.damp(state.progress, targetProgress, 12, delta);
      pose(state.progress);
      rotation += delta * 0.18;
      assembly.rotation.y = rotation;
      const renderStartedAt = performance.now();
      renderer.render(scene, camera);
      if (isFirefox || usesSoftwareRendering) {
        const renderDuration = performance.now() - renderStartedAt;
        const measuredInterval = Math.max(renderInterval, Math.min(2500, renderDuration * 3));
        effectiveRenderInterval = THREE.MathUtils.lerp(effectiveRenderInterval, measuredInterval, 0.25);
      }
      // Measure the idle interval after a potentially expensive WebGL draw.
      // Otherwise a software renderer whose draw exceeds the interval would
      // immediately render again and starve Firefox's scroll/main thread.
      lastRenderTime = performance.now();
    };
    renderer.setAnimationLoop(render);

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      visible = false;
      modelReady = false;
      // Keep the established scroll geometry so context loss cannot move the
      // visitor abruptly; only swap the canvas for the static visual.
      setContextAvailable(false);
    };
    const handleContextRestored = () => {
      const bounds = stage.getBoundingClientRect();
      visible = bounds.bottom > 0 && bounds.top < window.innerHeight;
      lastRenderTime = 0;
      resize();
      updateScrollTarget();
      modelReady = true;
      setContextAvailable(true);
      setSceneReady(true);
    };
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    return () => {
      cancelled = true;
      observer?.disconnect();
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      cancelAnimationFrame(resizeFrame);
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", scheduleScrollUpdate);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);
      model?.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();
        (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => material.dispose());
      });
      renderer.dispose();
    };
  }, [modelUrl]);

  return (
    <section ref={sectionRef} className={`${styles.section} ${sceneReady ? styles.ready : ""} ${contextAvailable ? "" : styles.fallbackOnly}`} aria-labelledby="assembly-title" data-assembly-overlay="true" data-assembly-track>
      <div ref={stageRef} className={styles.stage} data-assembly-stage>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.fallback} aria-hidden="true" />
        <div className={styles.copy}>
          <p className={styles.eyebrow}>02 / {copy.eyebrow}</p>
          <h2 id="assembly-title">{copy.title}</h2>
          <p>{copy.description}</p>
          <span className={styles.status}><i /> {copy.status}</span>
          <p className={styles.credit}>{copy.creditPrefix}: <a href={sourceUrl} target="_blank" rel="noreferrer">AXIS-Q6010-E Surveillance Camera — ArtOfSylr, CC BY 4.0</a></p>
        </div>
      </div>
    </section>
  );
}
