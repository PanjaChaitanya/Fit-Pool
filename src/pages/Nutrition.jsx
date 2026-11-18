import { useState } from "react";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import { requestJson } from "../utilities/storage";
import { todayKey } from "../data/training";
import { useFitness } from "../contexts/FitnessContext";
export default function Nutrition() {
  const { meals, setMeals, notify } = useFitness();
  const [mode, setMode] = useState("search");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [grams, setGrams] = useState(100);
  const [mealType, setMealType] = useState("Breakfast");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const search = async (event) => {
    event.preventDefault();
    setError("");
    setSelected(null);
    if (mode === "barcode" && !/^\d{8,14}$/.test(query.trim())) {
      setError("Enter an 8–14 digit barcode from the package.");
      return;
    }
    if (!query.trim()) return;
    setStatus("loading");
    try {
      const fields =
        "code,product_name,brands,image_front_small_url,nutriments,serving_size";
      const data = await requestJson(
        mode === "barcode"
          ? `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(query.trim())}?fields=${fields}`
          : `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query.trim())}&search_simple=1&action=process&json=1&page_size=12&fields=${fields}`,
      );
      const list =
        mode === "barcode"
          ? data.status === 1
            ? [data.product]
            : []
          : data.products || [];
      setProducts(list.filter((product) => product.product_name));
      setStatus("ready");
    } catch {
      setStatus("error");
      setError(
        "Food search is unavailable right now. Please try again shortly. Your food log is still available below.",
      );
    }
  };
  const day = meals.filter((meal) => meal.date === todayKey());
  const totals = day.reduce(
    (sum, meal) => ({
      calories: sum.calories + meal.calories,
      protein: sum.protein + (meal.protein || 0),
      carbs: sum.carbs + (meal.carbs || 0),
      fat: sum.fat + (meal.fat || 0),
    }),
    { calories: 0, protein: 0, carbs: 0, fat: 0 },
  );
  const nutrients = selected?.nutriments || {};
  const energy =
    nutrients["energy-kcal_100g"] ??
    (nutrients.energy_100g != null ? nutrients.energy_100g / 4.184 : null);
  const amount = Math.max(1, Number(grams) || 100) / 100;
  const add = () => {
    if (!selected || energy == null) return;
    setMeals((previous) => [
      ...previous,
      {
        id: crypto.randomUUID(),
        date: todayKey(),
        name: selected.product_name,
        grams: Number(grams),
        type: mealType,
        calories: energy * amount,
        protein:
          nutrients.proteins_100g != null
            ? nutrients.proteins_100g * amount
            : null,
        carbs:
          nutrients.carbohydrates_100g != null
            ? nutrients.carbohydrates_100g * amount
            : null,
        fat: nutrients.fat_100g != null ? nutrients.fat_100g * amount : null,
      },
    ]);
    notify("Added to today’s food log.");
  };
  return (
    <AppShell
      title="Know what fuels you."
      subtitle="A little curiosity about what goes on your plate."
    >
      <div className="nutrition-stats overview-stats">
        {[
          ["Energy logged", totals.calories, "kcal"],
          ["Protein logged", totals.protein, "g"],
          ["Carbs logged", totals.carbs, "g"],
          ["Fat logged", totals.fat, "g"],
        ].map(([label, value, unit]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>
              {Math.round(value).toLocaleString()}
              <small> {unit}</small>
            </strong>
          </div>
        ))}
      </div>
      <div className="nutrition-grid">
        <section className="panel food-search-panel">
          <div className="section-heading">
            <h2>Find a food</h2>
            <span className="small-label">Open Food Facts</span>
          </div>
          <div className="segmented-control">
            <button
              className={mode === "search" ? "active" : ""}
              onClick={() => {
                setMode("search");
                setQuery("");
                setError("");
              }}
              aria-pressed={mode === "search"}
            >
              Search by name
            </button>
            <button
              className={mode === "barcode" ? "active" : ""}
              onClick={() => {
                setMode("barcode");
                setQuery("");
                setError("");
              }}
              aria-pressed={mode === "barcode"}
            >
              Enter barcode
            </button>
          </div>
          <form className="search-form" onSubmit={search}>
            <label className="search-field">
              <Icon name="search" />
              <input
                aria-label={
                  mode === "barcode" ? "Food barcode" : "Search packaged food"
                }
                inputMode={mode === "barcode" ? "numeric" : "search"}
                placeholder={
                  mode === "barcode"
                    ? "e.g. 3017620422003"
                    : "Try oats, yogurt, peanut butter..."
                }
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                required
                maxLength={100}
                aria-describedby={error ? "food-error" : undefined}
              />
            </label>
            <button className="button primary" disabled={status === "loading"}>
              {status === "loading" ? "Searching…" : "Find food"}
            </button>
          </form>
          <p className="small-label">
            Search packaged foods, or enter the digits beneath a product’s
            barcode.
          </p>
          {error && (
            <p id="food-error" className="error-message" role="alert">
              {error}
            </p>
          )}
          <div aria-live="polite" aria-busy={status === "loading"}>
            {status === "loading" && (
              <div className="loading-state">
                <span className="spinner" />
                Finding your food…
              </div>
            )}
            {status === "ready" && !products.length && (
              <div className="empty-state">
                <h3>We couldn’t find that food.</h3>
                <p>Try a brand name or check the barcode digits.</p>
              </div>
            )}
            {products.map((product, index) => (
              <button
                className={`product-row ${selected === product ? "selected" : ""}`}
                key={product.code || index}
                onClick={() => {
                  setSelected(product);
                  setGrams(100);
                }}
              >
                <div className="food-thumbnail">
                  {product.image_front_small_url ? (
                    <img
                      src={product.image_front_small_url}
                      alt=""
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <Icon name="coffee" />
                  )}
                </div>
                <div>
                  <strong>{product.product_name}</strong>
                  <span>{product.brands || "Brand not listed"}</span>
                </div>
                <Icon name="chevronRight" size={17} />
              </button>
            ))}
            {status === "idle" && (
              <div className="food-intro">
                <Icon name="coffee" size={36} />
                <h3>Small choices. A clearer picture.</h3>
                <p>
                  Find the nutrition on your favorite packaged foods and keep a
                  simple record of what you eat.
                </p>
                <div className="food-examples">
                  {["Oats", "Greek yogurt", "Peanut butter"].map((value) => (
                    <button key={value} onClick={() => setQuery(value)}>
                      {value}
                      <Icon name="plus" size={13} />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
        <section className="panel food-detail-panel">
          {selected ? (
            <>
              <span className="small-label">Your serving</span>
              <h2>{selected.product_name}</h2>
              <p className="muted">
                {selected.brands || "Nutrition from the product label"}
              </p>
              <div className="serving-inputs">
                <label>
                  Amount · grams
                  <input
                    type="number"
                    min="1"
                    max="5000"
                    value={grams}
                    onChange={(event) => setGrams(event.target.value)}
                  />
                </label>
                <label>
                  Meal
                  <select
                    value={mealType}
                    onChange={(event) => setMealType(event.target.value)}
                  >
                    {["Breakfast", "Lunch", "Dinner", "Snack"].map((value) => (
                      <option key={value}>{value}</option>
                    ))}
                  </select>
                </label>
              </div>
              <dl className="nutrition-values">
                {[
                  [
                    "Energy",
                    energy != null ? Math.round(energy * amount) : null,
                    "kcal",
                  ],
                  [
                    "Protein",
                    nutrients.proteins_100g != null
                      ? (nutrients.proteins_100g * amount).toFixed(1)
                      : null,
                    "g",
                  ],
                  [
                    "Carbohydrates",
                    nutrients.carbohydrates_100g != null
                      ? (nutrients.carbohydrates_100g * amount).toFixed(1)
                      : null,
                    "g",
                  ],
                  [
                    "Fat",
                    nutrients.fat_100g != null
                      ? (nutrients.fat_100g * amount).toFixed(1)
                      : null,
                    "g",
                  ],
                ].map(([label, value, unit]) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>
                      {value ?? "—"}{" "}
                      <span>{value != null ? unit : "not listed"}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <button
                className="button primary full-width"
                onClick={add}
                disabled={
                  energy == null ||
                  !Number(grams) ||
                  Number(grams) < 1 ||
                  Number(grams) > 5000
                }
              >
                <Icon name="plus" size={16} />
                Add to today’s log
              </button>
              <p className="small-label">
                {energy == null
                  ? "This product is missing energy information and cannot be logged."
                  : "Community-contributed data. Check the package label; missing nutrients remain unknown."}
              </p>
            </>
          ) : (
            <div className="food-detail-empty">
              <Icon name="arrowLeft" size={24} />
              <h2>Get to know your serving.</h2>
              <p>
                Choose a food to see its nutrition, adjust the amount, and add
                it to your day.
              </p>
            </div>
          )}
        </section>
      </div>
      <section className="panel food-log">
        <div className="section-heading">
          <h2>On your plate today</h2>
          <span className="muted">{day.length} entries · This device</span>
        </div>
        {day.length ? (
          day.map((meal) => (
            <div className="food-log-row" key={meal.id}>
              <div>
                <strong>{meal.name}</strong>
                <span>
                  {meal.type} · {meal.grams} g
                </span>
              </div>
              <span>{Math.round(meal.calories)} kcal</span>
              <button
                className="icon-button"
                aria-label={`Remove ${meal.name} from food log`}
                onClick={() =>
                  setMeals((previous) =>
                    previous.filter((item) => item.id !== meal.id),
                  )
                }
              >
                <Icon name="trash" size={16} />
              </button>
            </div>
          ))
        ) : (
          <p className="muted empty-log">
            A fresh day. Your logged foods will appear here.
          </p>
        )}
        <p className="small-label">
          Totals include listed nutrients only. Your entries are saved in this
          browser.
        </p>
      </section>
      <p className="source-credit">
        Food data:{" "}
        <a
          href="https://world.openfoodfacts.org"
          target="_blank"
          rel="noreferrer"
        >
          Open Food Facts
        </a>
        , under the Open Database License. Product imagery: CC BY-SA.
      </p>
    </AppShell>
  );
}
