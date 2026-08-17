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
   content that blocks reading.
3. **Tune the 3D scene for touch hardware.** Cap device pixel ratio at 1.25 on
   phones and 1.5 on tablets; pause rendering outside the viewport; use a
   shorter scroll range on narrow screens; and verify that the camera never
   overlays the title, curriculum links, or floating WhatsApp control.
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
