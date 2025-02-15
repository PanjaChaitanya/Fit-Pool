import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utilities/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Exercises from "./Exercises"; // Import Exercises component
import { useBodyPart } from "../contexts/BodyPartContext";

import NavSideBar from "./NavSideBar";

const SearchExercises = () => {
  const [search, setSearch] = useState("");
  const [bodyParts, setBodyParts] = useState([]);
  const { bodyPart, exercises, setExercises } = useBodyPart();

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );
      setBodyParts(["all", ...bodyPartsData]);
    };
    fetchExercisesData();
  }, []);

  const SearchExerciseData = async () => {
    if (search) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=500&offset=0",
        exerciseOptions
      );

      const SearchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(search) ||
          exercise.bodyPart.toLowerCase().includes(search) ||
          exercise.equipment.toLowerCase().includes(search) ||
          exercise.target.toLowerCase().includes(search)
      );

      setSearch("");
      setExercises(SearchedExercises);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1 max-h-screen overflow-y-auto p-4 searchExercises">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="font-bold text-center text-[30px] lg:text-[44px] mb-12">
            Workouts to Keep You Fit
          </h2>
          <h3>Pick - Perform - Progress</h3>

          {/* Search Bar */}
          <div className="relative mb-[50px] mt-[50px] flex">
            <input
              className="w-[350px] lg:w-[600px] h-[48px] font-bold border-none rounded-l-[10px] bg-white px-4"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search Exercises for More"
              type="text"
            />
            <button
              className="h-[50px] w-[50px] lg:w-[150px] bg-red-700 text-white text-sm lg:text-lg rounded-r-[20px]"
              onClick={SearchExerciseData}
            >
              Search
            </button>
          </div>

          {/* Horizontal Scroll for Body Parts */}
          <div className="relative w-full p-5">
            <HorizontalScrollbar data={bodyParts} />
          </div>

          {/* Exercises List */}
          <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
        </div>
      </div>

      {/* SideNavbar*/}
      <div className="">
        <NavSideBar />
      </div>
    </div>
  );
};

export default SearchExercises;

