import { Link } from "react-router-dom";
import { useFitness } from "../contexts/FitnessContext";
import { equipmentName, groupFor } from "../data/training";
import Icon from "./ui/Icon";
import ExerciseMedia from "./ExerciseMedia";
export default function ExerciseCard({ exercise }) {
  const { favorites, toggleFavorite, addExercise, workout } = useFitness();
  const saved = favorites.includes(exercise.id);
  const added = workout.exercises.some((item) => item.id === exercise.id);
  return (
    <article className="exercise-card">
      <div className="exercise-image">
        <ExerciseMedia exercise={exercise} />
        <button
          className={`icon-button favorite-button ${saved ? "is-saved" : ""}`}
          onClick={() => toggleFavorite(exercise.id)}
          aria-label={`${saved ? "Unsave" : "Save"} ${exercise.name}`}
          aria-pressed={saved}
        >
          <Icon name="heart" />
        </button>
        <span className="image-caption">Animated guide</span>
      </div>
      <div className="exercise-card-body">
        <p className="small-label capitalize">
          {groupFor(exercise)} <span>·</span>{" "}
          {equipmentName(exercise.equipment)}
        </p>
        <p className="target-muscle">
          Target:{" "}
          <span className="capitalize">
            {exercise.primaryMuscles.join(", ")}
          </span>
        </p>
        <h2>
          <Link to={`/exercise/${exercise.id}`}>{exercise.name}</Link>
        </h2>
        <div className="exercise-card-bottom">
          <span className="muted capitalize">{exercise.category}</span>
          <button
            className="text-button"
            onClick={() => addExercise(exercise.id)}
            disabled={added}
            aria-label={`${added ? "Added" : "Add"} ${exercise.name} ${added ? "to workout" : "to workout"}`}
          >
            <Icon name={added ? "check" : "plus"} size={16} />
            {added ? "Added" : "Add to workout"}
          </button>
        </div>
      </div>
    </article>
  );
}
