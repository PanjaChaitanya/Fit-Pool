# Fitpool

A personal fitness workspace built with React and Vite. Discover movements, plan a session, explore food and recipes, and check the weather before heading out.

**The original ExerciseDB integration is retained. Exercise demonstrations are animated GIFs with target muscles highlighted in red.** Still exercise photographs are not used as a replacement or fallback.

## What you can do

- Search the live ExerciseDB library by movement, muscle, or equipment. Filter by muscle group and equipment, save favorites, and open detailed instructions and related movements.
- Play or pause animated guides. Reduced-motion preferences start them paused; you can explicitly play a guide.
- Build a workout with sets, repetitions, and weights, or start from one of three editable templates. Use the session and rest timers, mark movements complete, save session history, and download a workout as JSON.
- Look up packaged foods by name or barcode using Open Food Facts. Adjust serving grams, inspect available macros, and keep a daily food log. Missing nutrients remain unknown; totals include listed nutrients only.
- Search TheMealDB recipes, browse ingredients and instructions, and save recipes. Eight built-in recipes remain available if the recipe service fails.
- Search a city or opt into device location for Open-Meteo weather, hourly conditions, sunrise/sunset, and air quality. A failed air-quality request does not hide a working forecast.
- Calculate BMI locally, switch between light and dark appearances, and use the responsive navigation.

## Run locally

Use Node.js 22 or newer and npm.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm run build
npm run preview
npm test
```

Browser tests use installed Google Chrome via Playwright. They start Vite automatically, or reuse port 5173 when it is already running. To check an existing production preview, set `FITPOOL_TEST_URL` to its URL before `npm test`.

## Frontend architecture and storage

There is no backend, database, account requirement, or Firebase dependency. Routes and providers live in `src/App.jsx`; pages are loaded on demand. Styling is plain CSS with self-hosted Instrument fonts and React Icons.

Favorites, the current workout, completed sessions, food entries, recipes, location, metrics, and appearance are stored in this browser on this device using `localStorage`. Clearing site data removes them. They do not sync between devices. Storage failures leave the tools usable in memory, but those changes may not persist. The current workout can be exported from My workout.

ExerciseDB responses are cached for ten minutes to reduce requests. Media still loads from the provider. A provider error shows a retry action; the app does not substitute still exercise photos. Starter movement metadata helps the layout remain usable while live animations load.

## Data providers

| Provider                                                                       | Where it is used                                    | Configuration and attribution                                                                                                                                                                           |
| ------------------------------------------------------------------------------ | --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [ExerciseDB on RapidAPI](https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb) | Exercise library, movement detail, workout previews | Original API and request options in `src/utilities/fetchData.js` are retained. A valid RapidAPI subscription is required. Provider quotas and media usage terms apply.                                  |
| [Open Food Facts](https://openfoodfacts.github.io/openfoodfacts-server/api/)   | Packaged-food search and barcode lookup             | Public read requests. Database: ODbL; product images: CC BY-SA. Requests run on form submission.                                                                                                        |
| [TheMealDB](https://www.themealdb.com/api.php)                                 | Recipe search, category lookup, recipe details      | Uses the documented development/educational key `1`. Review the provider's terms and production-key requirements for your intended release. Built-in recipe data and imagery are attributed in the app. |
| [Open-Meteo](https://open-meteo.com/en/terms)                                  | Forecasts, geocoding, and CAMS air quality          | Public hosted API for noncommercial use; data attribution under CC BY 4.0. Commercial use requires the appropriate provider plan.                                                                       |

Provider keys used by frontend code are visible to browsers. Extra integrations do not require a server. Searches go directly to the selected provider; location permission is requested only when the user chooses **Use my location**. Check each provider's current usage terms before changing the app's distribution or business model.

Fonts are distributed under the SIL Open Font License; license files are in `public/fonts`. The existing Netlify SPA fallback is retained in `netlify.toml`.

See [DESIGN.md](DESIGN.md) for the UI system and [QA.md](QA.md) for verification and limitations.
