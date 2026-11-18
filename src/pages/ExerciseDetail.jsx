import { Link, useParams } from "react-router-dom";
import { useExercises } from "../contexts/ExerciseDataContext";
import { equipmentName, groupFor } from "../data/training";
import { useFitness } from "../contexts/FitnessContext";
import AppShell from "../components/layout/AppShell";
import Icon from "../components/ui/Icon";
import ExerciseCard from "../components/ExerciseCard";
import NotFound from "./NotFound";
import ExerciseMedia from "../components/ExerciseMedia";
import ExerciseStatus from "../components/ExerciseStatus";
export default function ExerciseDetail() {
  const { exercises, status: exerciseStatus } = useExercises();
  const { id } = useParams();
  const exercise = exercises.find((item) => item.id === id);
  const { addExercise, toggleFavorite, favorites, workout } = useFitness();
  if (!exercise && exerciseStatus !== "ready")
    return (
      <AppShell title="Animated movement guide">
        <ExerciseStatus />
      </AppShell>
    );
  if (!exercise) return <NotFound />;
  const added = workout.exercises.some((item) => item.id === id);
  const saved = favorites.includes(id);
  return (
    <AppShell
      title={exercise.name}
      subtitle={[
        equipmentName(exercise.equipment),
        exercise.level,
        exercise.category,
      ]
        .filter(Boolean)
        .join(" · ")}
      headerActions={
        <Link className="button secondary" to="/searchexercises">
          <Icon name="arrowLeft" size={16} />
          Back to library
        </Link>
      }
    >
      <ExerciseStatus />
      <div className="detail-grid">
        <section className="panel movement-image">
          <ExerciseMedia exercise={exercise} />
          <p className="animation-caption">
            <span className="muscle-mark" />
            Red highlights show the target muscles.
          </p>
        </section>
        <section className="panel movement-guide">
          <div className="section-heading">
            <h2>The movement</h2>
            <button
              className={`icon-button ${saved ? "is-saved" : ""}`}
              onClick={() => toggleFavorite(id)}
              aria-label={saved ? "Unsave exercise" : "Save exercise"}
              aria-pressed={saved}
            >
              <Icon name="heart" />
            </button>
          </div>
          <div className="movement-meta">
            <div>
              <span>Primary muscles</span>
              <strong className="capitalize">
                {exercise.primaryMuscles.join(", ")}
              </strong>
            </div>
            <div>
              <span>Equipment</span>
              <strong className="capitalize">
                {equipmentName(exercise.equipment)}
              </strong>
            </div>
            <div>
              <span>Movement type</span>
              <strong className="capitalize">
                {exercise.mechanic || exercise.category}
              </strong>
            </div>
          </div>
          <h3>Make every rep count.</h3>
          <ol className="instruction-list">
            {exercise.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
          <div className="button-row">
            <button
              className="button primary"
              onClick={() => addExercise(id)}
              disabled={added}
            >
              <Icon name={added ? "check" : "plus"} size={16} />
              {added ? "In your workout" : "Add to workout"}
            </button>
            <a
              className="button secondary"
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " proper form tutorial")}`}
              target="_blank"
              rel="noreferrer"
            >
              Watch form guides <Icon name="external" size={15} />
            </a>
          </div>
          <p className="small-label">
            Start with a comfortable load. Stop if a movement causes pain.
          </p>
        </section>
      </div>
      <section className="related-section">
        <div className="section-heading">
          <h2>Keep exploring</h2>
          <span className="muted capitalize">
            More for {groupFor(exercise)}
          </span>
        </div>
        <div className="exercise-grid related-grid">
          {exercises
            .filter(
              (item) => item.id !== id && groupFor(item) === groupFor(exercise),
            )
            .slice(0, 3)
            .map((item) => (
              <ExerciseCard key={item.id} exercise={item} />
            ))}
        </div>
      </section>
    </AppShell>
  );
}
