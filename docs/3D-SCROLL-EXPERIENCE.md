# Scroll-Controlled 3D Experience

## Objective

Add one high-quality, externally sourced mechanical object to the portfolio.
The object must have meaningful, recognisable components — for example a
camera body, lens modules, casing and mount — that assemble as the visitor
scrolls down and return to an exploded state when the visitor scrolls up.

The experience is decorative. It must never block the content, navigation or
contact paths already present in the portfolio.

## Non-negotiable asset policy

The portfolio must **not** use procedural Three.js geometry, an original
Blender model, primitive shapes presented as a 3D product, or an unverified
third-party file for this feature.

An asset is eligible only when all of the following can be recorded before it
is added to `public/`:

1. A source page and named author.
2. A licence that permits public redistribution in a browser and commercial
   portfolio use. CC0 or CC BY is preferred. Reject Editorial,
   CC BY-NC, no-download, and marketplace assets unless their terms expressly
   allow this public distribution.
3. An original download archive and the licence/attribution information are
   preserved outside the web bundle.
4. Multiple separately named meshes or a supplied assembly animation.
5. A practical web budget after optimisation: target below 2 MB compressed and
   below 75,000 visible triangles on desktop. A deliberate, documented
   exception is required for anything larger.
6. No visible protected logo, product name, character, franchise artwork,
   private project data or personal data.

`FinalAR.blend` remains a private visual reference only. It is not an approved
web asset and must not be exported, committed, served or used as the source of
a replacement model.

## Shortlist

### Preferred: AXIS-Q6010-E Surveillance Camera

- Source: <https://sketchfab.com/3d-models/axis-q6010-e-surveillance-camera-143e552bde554ea2aaa72664efab003e>
- Author: ArtOfSylr.
- Source-page licence: Creative Commons Attribution (CC BY).
- Source-page specifications: 39,500 triangles, 21,000 vertices, custom
  materials and many individual camera parts.
- Why it fits: it gives a real exploded-view sequence without inventing simple
  blocks, and it supports the portfolio's computer-vision/engineering story.
- Publication check: inspect the downloaded textures and mesh names for visible
  Axis marks before inclusion. Do not claim endorsement by Axis.

### Alternative: Unmarked Processor (CPU) + Socket

- Source: <https://sketchfab.com/3d-models/unmarked-processor-cpu-socket-hp-lp-anim-26d2147e082648949b9c703c514e6901>
- Author: 00004707.
- Source-page licence: Creative Commons Attribution (CC BY).
- Source-page specifications: CPU installation animation; separate socket
  Lever, Lower and Upper pieces; CPU LOD 2 has 22,784 triangles and socket
  LOD 1 has 962 triangles.
- Why it fits: an unbranded component links naturally to AI, backend and
  infrastructure work. The supplied FBX download is preferred because the
  source page says the preview formats omit the other LODs and components.

The paid TurboSquid watch is technically promising but is not selected: a
purchase is not authorised, and a standard marketplace licence needs a
separate public-redistribution review before a downloadable GLB could be put in
a public Git repository.

## Acquisition hand-off

Sketchfab downloads require the account holder's authenticated session. To
continue, download **one** of the preferred or alternative source files from
its source page and place the original archive, unchanged, in:

```text
/home/josue/Documents/Informática/montagem-3D/inbox/
```

Also preserve either the downloaded licence text or a screenshot/PDF of the
source page showing author, licence and URL. Do not rename or unpack it before
the asset review.

## Integration sequence after acquisition

1. Inspect the archive and licence, then record author, URL, licence, version,
   file hash and any changes in `docs/assets.md`.
2. Open the existing asset in Blender with scripts disabled; inventory meshes,
   animations, textures, triangle count and visible marks. No new 3D geometry
   will be modelled.
3. Select existing LODs and meshes, remove only empty/unneeded scene objects,
   and export an optimised GLB. Preserve the supplied topology and identity of
   the asset.
4. Load the GLB in a client-only Three.js component. Use the supplied animation
   when present; otherwise animate only the existing mesh transforms in a
   staged order.
5. Bind progress to GSAP ScrollTrigger with `scrub` and `pin`: scrolling down
   assembles; scrolling up reverses it.
6. Keep the static CAD/SVG treatment for reduced motion, failed WebGL and
   small/low-capability devices.
7. Run unit, type, production, GitHub Pages-export and browser checks before
   committing. Review desktop and mobile visuals manually.

## 2026-08-16 implementation record

- Received the original Blender, glTF, GLB and USDZ downloads in the approved
  local inbox. The downloadable glTF archive supplies the CC BY 4.0 credit.
- Selected the supplied GLB because it is already 1.36 MiB and has 28 meshes;
  the other formats are preserved as source material outside the repository.
- The client scene loads only that GLB. The exploded state and scroll sequence
  change existing object transforms; they do not generate geometry or recreate
  any camera component.
- The source credit is both visible in the section and retained next to the
  model. Full provenance and checksums are in `docs/assets.md`.
- The effect remains optional: reduced-motion or unavailable WebGL keeps the
  static, readable CSS background and all content paths.

## Acceptance criteria

- A recognisable sourced object, never primitive stand-ins, appears in the
  3D section.
- The exact attribution is public in `docs/assets.md` and the portfolio can be
  served from both Vercel and GitHub Pages without violating the asset licence.
- Scroll reversal is deterministic and does not require direction-specific
  animation code.
- The site is still readable, navigable and fast when WebGL or motion is
  unavailable.
