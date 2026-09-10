# Mobile and Tablet Motion Action Plan

## Objective

Keep the portfolio expressive on touch devices without making animation a
barrier to reading, navigation, battery life, or access to professional links.
This plan covers the hero video, progressive reveals, reading progress, floating
WhatsApp action, and the optional WebGL camera assembly.

## Delivery sequence

1. **Establish the responsive baseline.** Test the content at 320, 375, 390,
   768, and 1024 CSS pixels in portrait; test 844 and 1024 pixels in landscape.
   Record a screenshot of the hero, the camera assembly at its first and last
   scroll positions, the MindSIM experience, and the professional-resources
   section for each breakpoint class.
2. **Preserve readable motion.** Keep `prefers-reduced-motion` as a hard
   override: remove decorative video and WebGL motion, show the static visual
   fallback, retain all links and text, and avoid auto-scrolling or pinned
   content that blocks reading. For visitors who permit motion, every content
   reveal must be reversible: it enters when at least 12% is visible and fades
   back to its resting state after it leaves the viewport, so a return scroll
   replays the same short transition rather than showing a one-time effect.
3. **Tune the 3D scene for touch hardware.** Derive pixel ratio from a bounded
   drawing-buffer budget, pause rendering outside the viewport, reduce cadence
   for software renderers, use a shorter scroll range on narrow screens, and
   verify that the camera never obscures the title, curriculum links, or
   floating WhatsApp control.
4. **Respect touch interaction.** Ensure every external link and CV button has
   a 44-by-44 CSS-pixel minimum hit area, clear keyboard focus, no hover-only
   information, and adequate spacing when the on-screen keyboard is open.
5. **Measure before embellishing.** Use browser performance tooling on a
   physical Android phone and a tablet. If the camera animation causes
   sustained frame drops, replace it on that class of device with the existing
   static fallback rather than lowering text contrast or responsiveness.
6. **Automate the stable checks.** Add Playwright projects for phone and tablet
   dimensions, including a reduced-motion assertion, visibility checks for the
   two resume links, Lattes, YouTube, the portrait alternative text, and the
   MindSIM experience. Keep visual judgment and physical-device performance as
   documented manual release checks.

## Acceptance criteria

- No heading, portrait, curriculum action, or professional link is clipped at
  the supported viewport sizes.
- The 3D camera section has a readable static fallback and is skipped for
  reduced-motion visitors.
- English remains the default and switching to Portuguese preserves all links
  and the MindSIM role.
- All external destinations open safely in a new tab with `noopener` behavior
  (`rel="noreferrer"` is already used).
- Mobile and tablet screenshots, browser tests, and one physical-device check
  are recorded in `docs/TESTING-STATUS.md` before a release is marked complete.

## Implemented browser baseline — 2026-09-08

**Superseded visual claim:** the 64% canvas crop described below hid real
camera parts. The 2026-09-09 audit reproduced it on production in Firefox.
The corrective implementation removes that crop and fits all source meshes
from their transformed bounds. A later scope clarification restores the camera
as a centred, restrained full-section background behind the copy; the copy
remains above it in the stacking order. Camera distance stays fixed from the
largest exploded state, so assembly does not create a zoom-in. Its isolated
production export passed the full Firefox viewport/rotation matrix and the
cross-browser E2E suite. See
[the audit and action plan](audits/2026-09-09-camera/README.md).

- Chromium-class hardware rendering is capped at 1.2 million drawing-buffer
  pixels and 30 frames per second. Firefox uses a 450,000-pixel budget, lighter
  standard-material shaders and a 12-frame-per-second baseline; software
  rendering uses a 150,000-pixel budget and low cadence. Firefox/software idle
  intervals adapt to measured frame cost. Device pixel ratio remains capped at
  1.15 on phones and 1.25 elsewhere, and rendering pauses outside the viewport
  or while the document is hidden.
- The camera assembly uses a 1,100-pixel touch scroll range on phones, a
  1,300-pixel range on tablets, and retains the 1,600-pixel desktop sequence.
- On phone-width screens the superseded deployment cropped the canvas to its
  lower 36%. This was an inadequate workaround that hid camera parts and is
  absent from commit `68d56c8` and the current Vercel production deployment.
- Playwright emulates iPhone 13 and iPad Pro 11 dimensions in Chromium. It
  verifies the collapsed mobile-language menu, 44-pixel curriculum/link targets,
  professional-resource visibility, and the reduced-motion camera fallback.
- This is browser-emulated evidence, not a substitute for the remaining
  physical Android and tablet performance check.

## Cross-browser scroll correction — 2026-09-10

The approved full-section camera remains behind the copy, but the interaction
no longer uses JavaScript pinning. Native CSS sticky positioning supplies the
stationary stage while a passive scroll observer updates only assembly
progress. Desktop Firefox is now part of the routine Playwright matrix, and a
Chromium/Firefox regression verifies monotonic upward scrolling before, during
and after the camera interval. The installed graphical Firefox 155.0.1 also
crossed the full interval in 16 strictly decreasing W3C wheel steps, with no
reverse or stalled sample. Motorola and tablet checks remain manual release
gates.
