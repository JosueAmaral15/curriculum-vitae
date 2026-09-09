# Physical Device Release Check

## Purpose

Browser emulation has validated layout, touch targets and the reduced-motion
fallback. This short check records the hardware behaviour that an emulator
cannot prove: frame pacing, battery/thermal impact and touch scrolling on a
real Android phone and tablet.

## Before testing

1. Open the current production deployment in Chrome or another current mobile
   browser. Record the deployment URL, browser version and device model.
2. Use a normal connection, then repeat the hero's first load on a slower
   connection if possible. The video must start without making the hero text
   jump or delaying primary contact links.
3. Confirm that the device's accessibility setting for reduced motion is off
   for the first pass.

## Standard-motion pass

1. Start at the hero and wait through at least two video loops. The backdrop
   should remain smooth enough that text and navigation stay stable.
2. Scroll through the camera section slowly in both directions. Its supplied
   camera parts must assemble and reverse as a background behind the copy. The
   copy must remain readable on its higher layer, and the camera must not cover
   the floating WhatsApp control.
3. Continue through experience, resources and projects, then reverse-scroll.
   Content blocks should fade in on entry and return to their resting state
   when they leave the viewport, ready to play again on re-entry.
4. Tap every header link, both curriculum links, Lattes, YouTube, LinkedIn,
   email and WhatsApp. Each target must be comfortably tappable and open the
   expected destination.
5. Leave the page open for three minutes, then repeat the camera sequence.
   Record any heat, sustained stutter, browser warning or unusual battery
   drain. A few short frames while the GLB first loads are not a pass/fail
   verdict; sustained jank is.

## Reduced-motion pass

1. Enable the operating system or browser reduced-motion preference and
   reload the page.
2. Confirm that the hero video is absent and the camera uses its static visual
   fallback, while all copy, navigation and contact paths remain available.
3. Restore the setting after the check so it does not affect the next test.

## Record

Add one dated entry to `docs/TESTING-STATUS.md` containing:

| Device | Browser | Deployment URL | Standard motion | Reduced motion | Notes |
| --- | --- | --- | --- | --- | --- |
| Example Android phone | Chrome version | URL tested | Pass / issue | Pass / issue | Heat, frame pacing or link issue |

If the camera causes sustained frame drops on either device, keep the content
and links but use the existing static fallback for that device class. Do not
reduce text contrast, hit areas or accessibility behaviour to preserve the 3D
effect.
