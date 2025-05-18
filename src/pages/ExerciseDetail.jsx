import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AppShell from "../components/layout/AppShell";
import { ExerciseContext } from "../contexts/ExerciseContext";
import { exerciseOptions, fetchData } from "../utilities/fetchData";
import StopWatch from "../components/StopWatch";
import Button from "../components/ui/Button";
import { BodyText, SectionTitle } from "../components/system/Typography";

const ExerciseDetail = () => {
  const { id } = useParams();
  const { cachedExercises, setCachedExercises } = useContext(ExerciseContext);
  const [exerciseDetail, setExerciseDetail] = useState(cachedExercises[id] || null);
  const stopWatchRef = useRef(null);

  useEffect(() => {
    if (cachedExercises[id]) {
      setExerciseDetail(cachedExercises[id]);
      return;
    }

    const fetchExerciseDetail = async () => {
      try {
        const data = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          exerciseOptions,
        );
        setExerciseDetail(data);
        setCachedExercises((prev) => ({ ...prev, [id]: data }));
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    fetchExerciseDetail();
  }, [cachedExercises, id, setCachedExercises]);

  return (
    <AppShell
      title={exerciseDetail?.name ? `${exerciseDetail.name}` : "Exercise details"}
      subtitle="Movement breakdown"
      headerActions={
        <Button
          variant="secondary"
          onClick={() => stopWatchRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
        >
          Jump to timer
        </Button>
      }
    >
      <section className="surface section-space grid gap-8 xl:grid-cols-[360px_minmax(0,1fr)]">
        <img
          src={exerciseDetail?.gifUrl || "/images/assets/loader.gif"}
          alt={exerciseDetail?.name || "Loading exercise"}
          className="aspect-square w-full max-w-[360px] rounded-2xl border border-[var(--line-color)] object-cover"
        />

        <div>
          <SectionTitle className="capitalize">{exerciseDetail?.name || "Loading..."}</SectionTitle>
          <BodyText className="mt-3">
            Use the movement details below to stay precise with form and target the right muscle groups.
          </BodyText>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-[var(--line-color)] bg-[var(--bg-soft)] p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Target</p>
              <p className="mt-1 text-sm capitalize">{exerciseDetail?.target || "Loading..."}</p>
            </div>
            <div className="rounded-xl border border-[var(--line-color)] bg-[var(--bg-soft)] p-3">
              <p className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Equipment</p>
              <p className="mt-1 text-sm capitalize">{exerciseDetail?.equipment || "Loading..."}</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold">Instructions</p>
            {exerciseDetail?.instructions?.length ? (
              <ol className="list-decimal space-y-2 pl-5 text-sm text-[var(--text-muted)]">
                {exerciseDetail.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ol>
            ) : (
              <p className="text-sm text-[var(--text-muted)]">Instruction data is not available for this exercise.</p>
            )}
          </div>
        </div>
      </section>

      <section ref={stopWatchRef} className="mt-4 surface section-space">
        <SectionTitle>Workout timer</SectionTitle>
        <BodyText className="mt-2">Set a duration for this movement and keep each set controlled.</BodyText>
        <div className="mt-6">
          <StopWatch />
        </div>
      </section>
    </AppShell>
  );
};

export default ExerciseDetail;
