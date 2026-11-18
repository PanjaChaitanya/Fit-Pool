import ExerciseStatus from "../components/ExerciseStatus";
import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useExercises } from "../contexts/ExerciseDataContext";
import { featuredIds, groupFor, muscleGroups } from "../data/training";
import { useFitness } from "../contexts/FitnessContext";
import AppShell from "../components/layout/AppShell";
import ExerciseCard from "../components/ExerciseCard";
import Icon from "../components/ui/Icon";
export default function SearchExercises() {
  const { exercises } = useExercises();
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All muscles");
  const [equipment, setEquipment] = useState("all");
  const [saved, setSaved] = useState(params.get("saved") === "true");
  const [page, setPage] = useState(1);
  const { favorites } = useFitness();
  const filtered = useMemo(() => {
    const list = exercises.filter(
      (exercise) =>
        `${exercise.name} ${exercise.primaryMuscles.join(" ")} ${exercise.equipment}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()) &&
        (group === "All muscles" || groupFor(exercise) === group) &&
        (equipment === "all" || exercise.equipment === equipment) &&
        (!saved || favorites.includes(exercise.id)),
    );
    return list.sort((a, b) => {
      const ai = featuredIds.indexOf(a.id);
      const bi = featuredIds.indexOf(b.id);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
  }, [query, group, equipment, saved, favorites, exercises]);
  const pages = Math.max(1, Math.ceil(filtered.length / 12));
  const current = Math.min(page, pages);
  const reset = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };
  return (
    <AppShell
      title="Find your next movement."
      subtitle="A library for every body. Find what feels right for yours."
      headerActions={
        <Link to="/workout" className="button secondary">
          My workout <Icon name="arrowUpRight" size={16} />
        </Link>
      }
    >
      <ExerciseStatus />
      <div className="library-toolbar">
        <label className="search-field">
          <Icon name="search" />
          <input
            aria-label="Search exercises"
            placeholder="Search movements, muscles, equipment..."
            value={query}
            onChange={reset(setQuery)}
          />
        </label>
        <label className="select-field">
          <span className="sr-only">Equipment</span>
          <select value={equipment} onChange={reset(setEquipment)}>
            <option value="all">All equipment</option>
            {[...new Set(exercises.map((exercise) => exercise.equipment))]
              .sort()
              .map((value) => (
                <option key={value} value={value}>
                  {value === "body only"
                    ? "Bodyweight"
                    : value.charAt(0).toUpperCase() + value.slice(1)}
                </option>
              ))}
          </select>
        </label>
        <button
          className={`button secondary ${saved ? "selected" : ""}`}
          onClick={() => {
            setSaved(!saved);
            setPage(1);
          }}
          aria-pressed={saved}
        >
          <Icon name="heart" size={16} />
          Saved{favorites.length ? ` (${favorites.length})` : ""}
        </button>
      </div>
      <div className="filter-tabs" aria-label="Filter by muscle group">
        {muscleGroups.map((value) => (
          <button
            key={value}
            onClick={() => {
              setGroup(value);
              setPage(1);
            }}
            className={group === value ? "active" : ""}
            aria-pressed={group === value}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="results-heading">
        <span>
          <strong>{filtered.length}</strong> movements to explore
        </span>
        <span className="muted">A good session starts with good form.</span>
      </div>
      <div className="exercise-grid">
        {filtered.slice((current - 1) * 12, current * 12).map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="empty-state">
          <Icon name="search" size={28} />
          <h2>
            {saved ? "Your favorites start here." : "No movements found."}
          </h2>
          <p>
            {saved
              ? "Save a movement using the heart on its card."
              : "Try another name or a different equipment filter."}
          </p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setGroup("All muscles");
              setEquipment("all");
              setSaved(false);
            }}
          >
            Explore all movements
          </button>
        </div>
      )}
      {filtered.length > 0 && (
        <div className="pagination">
          <span className="muted">
            {(current - 1) * 12 + 1}–{Math.min(current * 12, filtered.length)}{" "}
            of {filtered.length}
          </span>
          <div>
            <button
              className="icon-button"
              aria-label="Previous page"
              disabled={current === 1}
              onClick={() => setPage(current - 1)}
            >
              <Icon name="chevronLeft" />
            </button>
            <span>
              Page {current} of {pages}
            </span>
            <button
              className="icon-button"
              aria-label="Next page"
              disabled={current === pages}
              onClick={() => {
                setPage(current + 1);
                window.scrollTo({ top: 0, behavior: "instant" });
              }}
            >
              <Icon name="chevronRight" />
            </button>
          </div>
        </div>
      )}
      <p className="source-credit">
        Animated demonstrations, muscle targets, and instructions from{" "}
        <a
          href="https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
          target="_blank"
          rel="noreferrer"
        >
          ExerciseDB
        </a>
        . Target muscles are highlighted in red.
      </p>
    </AppShell>
  );
}
