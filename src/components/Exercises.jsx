import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { exerciseOptions, fetchData } from "../utilities/fetchData";
import { useBodyPart } from "../contexts/BodyPartContext";
import Button from "./ui/Button";

const Exercises = () => {
  const { bodyPart, exercises, setExercises } = useBodyPart();
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const exercisesPerPage = 8;
  const pageCount = Math.max(1, Math.ceil(exercises.length / exercisesPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [bodyPart]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      setLoading(true);
      try {
        const endpoint =
          bodyPart === "all"
            ? "https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0"
            : `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`;

        const exercisesData = await fetchData(endpoint, exerciseOptions);
        setExercises(exercisesData);
      } catch (error) {
        console.error("Unable to fetch exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises]);

  const currentExercises = useMemo(() => {
    const start = (currentPage - 1) * exercisesPerPage;
    return exercises.slice(start, start + exercisesPerPage);
  }, [currentPage, exercises]);

  if (loading) {
    return <p className="muted-line mt-6 text-sm">Loading exercises...</p>;
  }

  if (!currentExercises.length) {
    return <p className="muted-line mt-6 text-sm">No exercises found for this filter.</p>;
  }

  return (
    <div className="mt-6">
      <div className="exercise-grid">
        {currentExercises.map((exercise) => (
          <Link key={exercise.id} to={`/exercise/${exercise.id}`} className="exercise-item">
            <img
              src={exercise.gifUrl || "/images/assets/small_Loader.gif"}
              alt={exercise.name}
              loading="lazy"
            />
            <div>
              <p className="text-sm font-semibold capitalize">{exercise.name}</p>
              <p className="exercise-meta mt-1 capitalize">{exercise.bodyPart}</p>
              <p className="exercise-meta capitalize">Target: {exercise.target}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((value) => Math.max(1, value - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-[var(--text-muted)]">
          Page {currentPage} of {pageCount}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage === pageCount}
          onClick={() => setCurrentPage((value) => Math.min(pageCount, value + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Exercises;
