import { test, expect } from "@playwright/test";
import { Buffer } from "node:buffer";
import recipes from "../src/data/recipes.json" with { type: "json" };
import exerciseFixture from "./fixtures/exercises.json" with { type: "json" };
test.beforeEach(async ({ page }) => {
  // Image transport is deterministic here; real provider motion is checked separately.
  await page.route("https://static.exercisedb.dev/media/**", (route) =>
    route.fulfill({
      contentType: "image/gif",
      body: Buffer.from(
        "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        "base64",
      ),
    }),
  );
  await page.route("https://exercisedb.p.rapidapi.com/exercises**", (route) =>
    route.fulfill({ json: exerciseFixture }),
  );
});

test("animated guides respect reduced motion and recover after a provider failure", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://exercisedb.p.rapidapi.com/exercises**", (route) =>
    route.fulfill({ status: 429, body: "{}" }),
  );
  await page.goto("/exercise/0662");
  await expect(page.getByRole("alert")).toContainText("request limit");
  await expect(
    page.locator(".movement-image .animation-placeholder"),
  ).toContainText("Animation unavailable");
  await page.route("https://exercisedb.p.rapidapi.com/exercises**", (route) =>
    route.fulfill({ json: exerciseFixture }),
  );
  await page
    .getByRole("button", { name: "Retry animated exercise library" })
    .click();
  const media = page.locator(".movement-image .exercise-media");
  await expect(
    media.getByRole("button", { name: "Play Push-up animation", exact: true }),
  ).toBeVisible();
  await expect(media.locator("canvas")).toBeVisible();
  await media
    .getByRole("button", { name: "Play Push-up animation", exact: true })
    .click();
  await expect(media.locator("img")).toBeVisible();
  await page.reload();
  await expect(
    page
      .locator(".movement-image .exercise-media")
      .getByRole("button", { name: "Play Push-up animation", exact: true }),
  ).toBeVisible();
});

test("exercise discovery, favorites, details, and workout persist across reloads", async ({
  page,
}) => {
  await page.goto("/searchexercises");
  await page.getByRole("textbox", { name: "Search exercises" }).fill("Push-up");
  const card = page
    .locator(".exercise-card")
    .filter({ has: page.getByRole("link", { name: "Push-up", exact: true }) });
  await card.getByRole("button", { name: "Save Push-up", exact: true }).click();
  await card
    .getByRole("button", { name: "Add Push-up to workout", exact: true })
    .click();
  await expect(
    card.getByRole("button", { name: "Added Push-up to workout", exact: true }),
  ).toBeDisabled();
  await page.reload();
  await page.getByRole("textbox", { name: "Search exercises" }).fill("Push-up");
  await expect(
    card.getByRole("button", { name: "Unsave Push-up", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await card.getByRole("link", { name: "Push-up", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Push-up");
  const media = page.locator(".movement-image .exercise-media");
  await expect(media.locator("img")).toHaveAttribute("src", /\.gif$/);
  await media
    .getByRole("button", { name: "Pause Push-up animation", exact: true })
    .click();
  await expect(media.locator("canvas")).toBeVisible();
  await media
    .getByRole("button", { name: "Play Push-up animation", exact: true })
    .click();
  await expect(media.locator("canvas")).toBeHidden();
  await page.goto("/workout");
  await expect(
    page.getByRole("link", { name: "Push-up", exact: true }),
  ).toBeVisible();
  await page
    .getByRole("textbox", { name: "Workout name" })
    .fill("A small good session");
  await page.getByRole("spinbutton", { name: "Push-up Sets" }).fill("4");
  const download = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download workout" }).click();
  await expect((await download).suggestedFilename()).toBe(
    "fitpool-workout.json",
  );
  await page.getByRole("button", { name: "Start timer" }).click();
  await expect(page.getByRole("timer")).not.toHaveAttribute(
    "aria-label",
    "Elapsed time 00:00",
  );
  await page.getByRole("button", { name: "Pause timer" }).click();
  await page
    .getByRole("button", { name: "Mark Push-up complete", exact: true })
    .click();
  await page.getByRole("button", { name: "Finish & save session" }).click();
  await expect(page.locator(".history-row")).toContainText("4 sets");
  await page.reload();
  await expect(page.locator(".history-row")).toContainText(
    "A small good session",
  );
  await page.goto("/");
  await expect(page.locator(".overview-stats").first()).toContainText(
    "1 workouts",
  );
});

test("food serving calculations, missing values, barcode validation, and request failures", async ({
  page,
}) => {
  await page.route("**/world.openfoodfacts.org/**", async (route) =>
    route.fulfill({
      json: {
        products: [
          {
            code: "1234567890123",
            product_name: "Test oats",
            brands: "Oat maker",
            nutriments: {
              "energy-kcal_100g": 200,
              proteins_100g: 10,
              carbohydrates_100g: 30,
            },
          },
        ],
      },
    }),
  );
  await page.goto("/nutrition");
  await page
    .getByRole("textbox", { name: "Search packaged food" })
    .fill("oats");
  await page.getByRole("button", { name: "Find food", exact: true }).click();
  await page.getByRole("button", { name: /Test oats Oat maker/ }).click();
  await page.getByRole("spinbutton", { name: "Amount · grams" }).fill("150");
  await expect(page.locator(".nutrition-values")).toContainText("300");
  await expect(page.locator(".nutrition-values")).toContainText("not listed");
  await page.getByRole("button", { name: "Add to today’s log" }).click();
  await expect(page.locator(".food-log-row")).toContainText("300 kcal");
  await page.getByRole("button", { name: "Enter barcode" }).click();
  await page.getByRole("textbox", { name: "Food barcode" }).fill("abc");
  await page.getByRole("button", { name: "Find food", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("8–14 digit barcode");
  await page.unroute("**/world.openfoodfacts.org/**");
  await page.route("**/world.openfoodfacts.org/**", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page
    .getByRole("textbox", { name: "Food barcode" })
    .fill("1234567890123");
  await page.getByRole("button", { name: "Find food", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("unavailable");
  await expect(page.locator(".food-log-row")).toContainText("300 kcal");
  await page.reload();
  await expect(page.locator(".food-log-row")).toContainText("300 kcal");
  await page
    .getByRole("button", { name: "Remove Test oats from food log" })
    .click();
  await expect(page.locator(".food-log-row")).toHaveCount(0);
});

test("recipe dialog supports keyboard dismissal, saving, and offline fallback", async ({
  page,
}) => {
  await page.goto("/recipes");
  const first = recipes[0];
  await page
    .getByRole("button", { name: `View ${first.strMeal}`, exact: true })
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "What you’ll need" }),
  ).toBeVisible();
  await dialog
    .getByRole("button", { name: "Save recipe", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await page.reload();
  await page.getByRole("button", { name: "Saved recipes (1)" }).click();
  await expect(page.locator(".recipe-card")).toHaveCount(1);
  await page.route("**/www.themealdb.com/api/**", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.getByRole("textbox", { name: "Search recipes" }).fill("pasta");
  await page.getByRole("button", { name: "Find recipes", exact: true }).click();
  await expect(page.getByRole("alert")).toContainText("built-in collection");
  await expect(page.locator(".recipe-card")).toHaveCount(8);
});

test("weather supports city selection and partial air-quality failure", async ({
  page,
}) => {
  const weather = {
    timezone_abbreviation: "IST",
    current: {
      time: "2026-11-18T10:00",
      temperature_2m: 25,
      apparent_temperature: 26,
      relative_humidity_2m: 55,
      wind_speed_10m: 8,
      weather_code: 1,
    },
    daily: {
      temperature_2m_max: [29],
      temperature_2m_min: [20],
      uv_index_max: [6],
      sunrise: ["2026-11-18T06:10"],
      sunset: ["2026-11-18T17:50"],
    },
    hourly: {
      time: Array.from({ length: 8 }, (_, i) => `2026-11-18T${10 + i}:00`),
      temperature_2m: [25, 26, 27, 28, 27, 26, 25, 24],
      precipitation_probability: [5, 5, 10, 20, 20, 10, 5, 5],
    },
  };
  await page.route("https://api.open-meteo.com/**", (route) =>
    route.fulfill({ json: weather }),
  );
  await page.route("https://air-quality-api.open-meteo.com/**", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.route("https://geocoding-api.open-meteo.com/**", (route) =>
    route.fulfill({
      json: {
        results: [
          {
            id: 1,
            name: "Hyderabad",
            country: "India",
            admin1: "Telangana",
            latitude: 17.4,
            longitude: 78.5,
          },
        ],
      },
    }),
  );
  await page.goto("/outdoors");
  await expect(page.locator(".weather-temperature")).toContainText("25");
  await expect(page.locator(".air-panel")).toContainText(
    "temporarily unavailable",
  );
  await page.getByRole("textbox", { name: "Search city" }).fill("Hyderabad");
  await page.getByRole("button", { name: "Find city", exact: true }).click();
  await page.getByRole("button", { name: /Hyderabad Telangana/ }).click();
  await expect(page.locator(".location-name")).toContainText("Hyderabad");
  await expect(page.locator(".hourly-grid>div")).toHaveCount(6);
});

test("all screens fit the viewport, load fonts, support theme, and show honest empty states", async ({
  page,
}, testInfo) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/searchexercises",
    "/workout",
    "/nutrition",
    "/recipes",
    "/bmicalculator",
    "/about",
    "/missing",
  ]) {
    await page.goto(path);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      {
        "/": "A little stronger, every day.",
        "/searchexercises": "Find your next movement.",
        "/workout": "Make this session yours.",
        "/nutrition": "Know what fuels you.",
        "/recipes": "Something good to cook.",
        "/bmicalculator": "A baseline. A bigger picture.",
        "/about": "Room for a little progress.",
        "/missing": "A little off the path.",
      }[path],
    );
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `${path} has no page overflow`,
    ).toBeTruthy();
    if (
      [
        "/",
        "/searchexercises",
        "/workout",
        "/nutrition",
        "/recipes",
        "/bmicalculator",
      ].includes(path)
    )
      await page.screenshot({
        path: `artifacts/${testInfo.project.name}-${path === "/" ? "overview" : path.slice(1)}.png`,
        fullPage: true,
      });
  }
  await page.goto("/bmicalculator");
  await page
    .getByRole("spinbutton", { name: "Height in centimeters" })
    .fill("170");
  await page
    .getByRole("spinbutton", { name: "Weight in kilograms" })
    .fill("65");
  await page.getByRole("button", { name: "Calculate BMI" }).click();
  await expect(page.locator(".bmi-number")).toContainText("22.5");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(
      page.getByRole("dialog", { name: "Navigation" }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Dark appearance" }).click();
    await page.keyboard.press("Escape");
  } else await page.getByRole("button", { name: "Dark appearance" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.screenshot({
    path: `artifacts/${testInfo.project.name}-dark-metrics.png`,
    fullPage: true,
  });
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  expect(errors).toEqual([]);
});
