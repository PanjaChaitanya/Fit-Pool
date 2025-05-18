import { useEffect, useState } from "react";
import AppShell from "../components/layout/AppShell";
import HorizontalScrollbar from "../components/HorizontalScrollbar";
import Exercises from "../components/Exercises";
import Button from "../components/ui/Button";
import { exerciseOptions, fetchData } from "../utilities/fetchData";
import { useBodyPart } from "../contexts/BodyPartContext";
import { BodyText, SectionTitle } from "../components/system/Typography";

const SearchExercises = () => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const { setExercises } = useBodyPart();

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions,
        );
        setBodyParts(["all", ...bodyPartsData]);
      } catch (error) {
        console.error("Unable to fetch body parts:", error);
      }
    };

    fetchExerciseData();
  }, []);

  const searchExerciseData = async () => {
    if (!search.trim()) {
      return;
    }

    const normalized = search.trim().toLowerCase();

    try {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=500&offset=0",
        exerciseOptions,
      );

      const filtered = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(normalized) ||
          exercise.bodyPart.toLowerCase().includes(normalized) ||
          exercise.equipment.toLowerCase().includes(normalized) ||
          exercise.target.toLowerCase().includes(normalized),
      );

      setExercises(filtered);
      setSearch("");
    } catch (error) {
      console.error("Unable to search exercises:", error);
    }
  };

  return (
    <AppShell title="Exercise Library" subtitle="Find by body part or keyword">
      <section className="surface section-space">
        <SectionTitle>Search and filter workouts</SectionTitle>
        <BodyText className="mt-2">
          Use targeted filters for quick browsing, or run a keyword search by movement name, equipment, or muscle.
        </BodyText>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <input
            type="text"
            className="field min-w-[240px] max-w-[460px] flex-1"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search exercises"
          />
          <Button onClick={searchExerciseData}>Search</Button>
        </div>

        <div className="mt-5">
          <HorizontalScrollbar data={bodyParts} />
        </div>
      </section>

      <section className="mt-4 surface section-space">
        <SectionTitle>Results</SectionTitle>
        <Exercises />
      </section>
    </AppShell>
  );
};

export default SearchExercises;
