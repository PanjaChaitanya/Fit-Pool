# Verification record

Recorded on 18 November 2026 against a local Vite production build in Google Chrome.

## Automated browser coverage

`npm run lint`, `npm run build`, and the Playwright suite pass. The suite contains six scenarios run on desktop (1440 x 1000) and an emulated iPhone 13 (390 x 664 CSS viewport):

- ExerciseDB failure and retry, reduced-motion defaults, deliberate playback, and cached reloads.
- Exercise discovery, favorites across reloads, movement details, GIF play/pause, workout edits, JSON download, session timer, and saved history.
- Food serving calculations, unknown nutrients, barcode validation, unavailable service, and local food-log persistence.
- Recipe dialog, Escape dismissal, saved recipes, and built-in collection when requests fail.
- City selection, weather rendering, hourly conditions, and partial air-quality failure.
- Main routes, horizontal overflow, theme persistence, navigation, fonts, and BMI calculation.

Tests mock remote catalog/data responses and GIF transport to avoid depending on provider quotas or download speed. The tiny GIF transport fixture is not product imagery. Production uses each exercise's real ExerciseDB GIF URL.

## Live-provider checks

The original RapidAPI ExerciseDB endpoint returned HTTP 200 and 1,324 movements. The Push-up guide loaded from `v2.exercisedb.io` at 360 x 360 pixels with four instruction steps. Four captures produced three distinct frames, confirming motion. Red target-muscle highlights were visually inspected. Play/pause and mobile layout were checked separately from mocked tests.

Live UI requests returned HTTP 200 for Open Food Facts barcode lookup, TheMealDB recipe search, Open-Meteo forecasts, and air quality. Food lookup rendered serving macros; recipe search rendered results; weather rendered the current temperature. No page exceptions were recorded during the live route pass.

## Responsive and visual checks

Routes were checked at widths 320, 390, 768, and 1440 pixels. The pass covers overview, exercise library, movement detail, workout, food explorer, recipes, body metrics, about, contact, and the missing-page route. No horizontal page overflow was found in those 40 combinations. Four additional populated-workout views are checked at the same widths. Navigation scroll locking and closing on desktop resize are also checked.

Desktop and phone screenshots were inspected with real, fully loaded ExerciseDB guides. They retain their full aspect ratio and original muscle colors. Dark appearance, native dialog navigation, keyboard Escape behavior, and reduced motion were also checked. The taste inspector was run against the production preview. Its final report has no failures and two advisory findings: mixed surface corner radii and a 42-pixel blank band in the weekly panel. The phone greeting was reduced from 30 to 24 pixels; the weekly blank band was reduced from 64 to 42 pixels. Reports and screenshots are local artifacts.

## Practical limits

- Mobile checks use browser emulation. A physical iPhone/Android device and Safari were not available for verification.
- Third-party quotas, CORS policies, and availability remain provider-controlled. Exercise GIFs need a working network; a slow download now has an explicit loading state, and a failed guide can be retried.
- Data stays in this browser and does not sync. Clearing site data removes saved entries. Private browsing or a full storage quota can prevent persistence.
- Recipe test-key and hosted weather API use must follow their providers' terms. These limits are linked in README.md and the app credits.

Local evidence is kept in ignored `artifacts/`: final desktop/mobile screenshots, `final-live-qa.json`, `live-animation-result.json`, GIF frame captures, and the taste inspector report. Playwright traces are retained only on test failure.
