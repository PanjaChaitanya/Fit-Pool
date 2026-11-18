# Fitpool design

Fitpool is an everyday personal workspace. The interface gives movement demonstrations, a plan, and the next useful action priority over decorative statistics.

## Visual system

- Light ground `#fbfcf9`, ink `#242822`, quiet surface `#f0f2ec`, teal `#1b6e66`. Dark appearance uses neutral green-grey surfaces with light ink.
- Instrument Sans for controls, navigation, body text, and numbers; Instrument Serif for the overview greeting and selected editorial headings. Fonts are served locally.
- Near-black primary actions, restrained teal state feedback, soft surface changes, and faint structural rules. No gradients or resting shadows.
- A persistent desktop sidebar becomes a native modal navigation panel on phones. Main content uses a stable frame and content-driven grids; forms and workout controls stack at smaller widths.
- Initial totals reflect actual browser data. No fabricated progress, placeholder people, or invented trends.

## Exercise media is part of the product

Retain the original ExerciseDB animated demonstrations and their red muscle highlights. Render GIFs with `object-fit: contain`, normal colors, and a white background so anatomy and full movement remain visible. Do not replace a missing guide with an exercise photograph. Show an unavailable state and retry instead.

The exercise library and movement detail offer named play/pause controls. Pausing draws the displayed GIF frame into a canvas; resuming reveals the GIF again. The animation may resume at the provider GIF's current frame. Reduced-motion preferences start guides paused and allow deliberate playback.

## Motion and interaction

Motion explains state changes. Buttons use brief press/hover feedback; dialogs enter with a short fade/translation; navigation uses a short entrance. The interface avoids ambient parallax or repeated decorative reveals. CSS reduced-motion rules remove travel and spinner motion. Native dialogs provide modal focus behavior and Escape dismissal; recipe dialogs restore trigger focus.

Forms have visible labels, contextual errors, focus outlines, and touch-friendly inputs. Unknown food nutrients display as missing, and weather or exercise failures offer useful retry or fallback states. Location is opt-in.

## Validation

Inspect both light and dark views, desktop and phone widths, fresh and populated storage, animation playback and pause, offline/error states, and long movement names. Keep a real live-provider animation check separate from deterministic browser tests. See QA.md for the latest recorded checks.
