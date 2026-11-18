import { useExercises } from "../contexts/ExerciseDataContext";
export default function ExerciseStatus() {
  const { status, error, reload } = useExercises();
  if (error)
    return (
      <div className="error-message" role="alert">
        <p>{error}</p>
        <button className="text-button" onClick={reload}>
          Retry animated exercise library
        </button>
      </div>
    );
  if (status === "loading")
    return (
      <p className="small-label exercise-loading" role="status">
        Loading ExerciseDB’s animated muscle guides…
      </p>
    );
  return null;
}
