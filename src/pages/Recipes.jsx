import { useState } from "react";
import collection from "../data/recipes.json";
import { useFitness } from "../contexts/FitnessContext";
import { requestJson } from "../utilities/storage";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import Modal from "../components/ui/Modal";
export default function Recipes() {
  const { recipeFavorites, setRecipeFavorites } = useFitness();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState(collection);
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [onlySaved, setOnlySaved] = useState(false);
  const toggle = (meal) =>
    setRecipeFavorites((previous) =>
      previous.some((item) => item.idMeal === meal.idMeal)
        ? previous.filter((item) => item.idMeal !== meal.idMeal)
        : [...previous, meal],
    );
  const search = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setError("");
    setOnlySaved(false);
    try {
      const data = await requestJson(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`,
      );
      setRecipes(data.meals || []);
      setStatus("ready");
    } catch {
      setError(
        "The recipe kitchen is taking a break. You can still explore our built-in collection below.",
      );
      setRecipes(collection);
      setStatus("error");
    }
  };
  const visible = onlySaved ? recipeFavorites : recipes;
  return (
    <AppShell
      title="Something good to cook."
      subtitle="A little inspiration for your next meal. Find a recipe, make it yours."
    >
      <div className="recipe-toolbar">
        <form className="search-form" onSubmit={search}>
          <label className="search-field">
            <Icon name="search" />
            <input
              aria-label="Search recipes"
              placeholder="Search a dish, like curry or pasta..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              maxLength={100}
            />
          </label>
          <button className="button primary" disabled={status === "loading"}>
            {status === "loading" ? "Searching…" : "Find recipes"}
          </button>
        </form>
        <button
          className={`button secondary ${onlySaved ? "selected" : ""}`}
          aria-pressed={onlySaved}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Icon name="heart" size={16} />
          Saved recipes
          {recipeFavorites.length ? ` (${recipeFavorites.length})` : ""}
        </button>
      </div>
      <div className="recipe-quick-search">
        <span className="muted">In the mood for</span>
        {["Chicken", "Vegetarian", "Pasta", "Curry"].map((value) => (
          <button
            key={value}
            onClick={async () => {
              setOnlySaved(false);
              setStatus("loading");
              setError("");
              try {
                const data = await requestJson(
                  value === "Vegetarian"
                    ? "https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian"
                    : `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`,
                );
                if (value === "Vegetarian") {
                  const details = await Promise.all(
                    (data.meals || [])
                      .slice(0, 12)
                      .map((meal) =>
                        requestJson(
                          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`,
                        ).then((result) => result.meals?.[0]),
                      ),
                  );
                  setRecipes(details.filter(Boolean));
                } else setRecipes(data.meals || []);
                setQuery(value === "Vegetarian" ? "" : value);
                setStatus("ready");
              } catch {
                setRecipes(collection);
                setError(
                  "Recipes are unavailable right now. Showing the built-in collection.",
                );
                setStatus("error");
              }
            }}
          >
            {value}
          </button>
        ))}
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      <div className="results-heading">
        <span>
          {onlySaved
            ? "Your recipe collection"
            : status === "idle"
              ? "A few ideas to get you started"
              : `${visible.length} recipes to explore`}
        </span>
        <span className="muted">Good food, at your own table.</span>
      </div>
      {status === "loading" ? (
        <div className="loading-state">
          <span className="spinner" />
          Finding something good…
        </div>
      ) : (
        <div className="recipe-grid">
          {visible.map((meal) => {
            const saved = recipeFavorites.some(
              (item) => item.idMeal === meal.idMeal,
            );
            return (
              <article className="recipe-card" key={meal.idMeal}>
                <button
                  className="recipe-photo"
                  onClick={() => setSelected(meal)}
                  aria-label={`View ${meal.strMeal}`}
                >
                  <img
                    src={
                      collection.some((item) => item.idMeal === meal.idMeal)
                        ? `/images/recipes/${meal.idMeal}.jpg`
                        : meal.strMealThumb
                    }
                    alt={meal.strMeal}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/images/recipe-fallback.svg";
                    }}
                  />
                  <span className="recipe-view">
                    View recipe <Icon name="arrowUpRight" size={16} />
                  </span>
                </button>
                <div className="recipe-card-content">
                  <p className="small-label">
                    {meal.strArea || "Around the world"} ·{" "}
                    {meal.strCategory || "Recipe"}
                  </p>
                  <h2>
                    <button onClick={() => setSelected(meal)}>
                      {meal.strMeal}
                    </button>
                  </h2>
                  <button
                    className={`icon-button ${saved ? "is-saved" : ""}`}
                    aria-label={`${saved ? "Unsave" : "Save"} recipe ${meal.strMeal}`}
                    aria-pressed={saved}
                    onClick={() => toggle(meal)}
                  >
                    <Icon name="heart" size={17} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
      {status !== "loading" && visible.length === 0 && (
        <div className="empty-state">
          <Icon name="book" size={30} />
          <h2>
            {onlySaved
              ? "A recipe worth keeping?"
              : "Nothing in the kitchen yet."}
          </h2>
          <p>
            {onlySaved
              ? "Tap the heart on a recipe to keep it here."
              : "Try a different dish name."}
          </p>
        </div>
      )}
      <p className="source-credit">
        Recipes and images from{" "}
        <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">
          TheMealDB
        </a>
        . Recipe nutrition is not provided; explore product labels in Food
        explorer.
      </p>
      {selected && (
        <Modal title={selected.strMeal} onClose={() => setSelected(null)}>
          <img
            className="recipe-detail-photo"
            src={
              collection.some((item) => item.idMeal === selected.idMeal)
                ? `/images/recipes/${selected.idMeal}.jpg`
                : selected.strMealThumb
            }
            alt={selected.strMeal}
          />
          <p className="small-label">
            {selected.strArea} · {selected.strCategory}
          </p>
          <h3>What you’ll need</h3>
          <ul className="ingredient-list">
            {Array.from({ length: 20 }, (_, index) => index + 1)
              .filter((index) => selected[`strIngredient${index}`]?.trim())
              .map((index) => (
                <li key={index}>
                  <span>{selected[`strIngredient${index}`]}</span>
                  <span>{selected[`strMeasure${index}`]}</span>
                </li>
              ))}
          </ul>
          <h3>Bring it together</h3>
          <div className="recipe-instructions">
            {selected.strInstructions
              ?.split(/\r?\n/)
              .filter((line) => line.trim())
              .map((line, index) => (
                <p key={index}>{line}</p>
              ))}
          </div>
          <div className="button-row">
            <button
              className="button secondary"
              onClick={() => toggle(selected)}
            >
              <Icon name="heart" size={16} />
              {recipeFavorites.some((item) => item.idMeal === selected.idMeal)
                ? "Saved to recipe book"
                : "Save recipe"}
            </button>
            {selected.strYoutube && (
              <a
                className="text-link"
                href={selected.strYoutube}
                target="_blank"
                rel="noreferrer"
              >
                Watch cooking video <Icon name="external" size={15} />
              </a>
            )}
          </div>
        </Modal>
      )}
    </AppShell>
  );
}
