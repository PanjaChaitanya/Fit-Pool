import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utilities/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";
import Exercises from "./Exercises"; // Import Exercises component
import { useBodyPart } from "../contexts/BodyPartContext";

import NavSideBar from "./NavSideBar";

import {motion} from 'framer-motion'

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
      <div className="flex-1 max-h-screen overflow-y-auto p-2 searchExercises">
        <div className="flex flex-col items-center justify-center w-full p-10">
          <motion.h2 
          initial={{ opacity: 0, y:-300}}
          animate={{ opacity: 1, y:0}}
          transition={{ duration: 1, ease:"easeInOut", delay: 0}}
          className="text-center montserratFont">
            Workouts to Keep You Fit
          </motion.h2>
          <motion.h3 
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          transition={{ duration: 1, ease:"easeInOut", delay: 0}}
          className="text-center mt-5 montserratFont">
            Pick - Perform - Progress </motion.h3>

          {/* Search Bar */}
          <div className="relative mb-[20px] mt-[50px] flex">
            
          <div className="flex items-center rounded-md pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-gray-600">
            <input type="text" 
              className="block min-w-4 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"  value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
              placeholder="Search for More Exercises"
            />
            </div>
            <img
              src="/icons/search.png"
              className="
                h-[50px] w-[50px]
                cursor-pointer
                rounded-[25px]
                active:bg-red-600
                active:scale-75
               focus:outline-2 focus:outline-offset-2 focus:outline-red-500
               transition duration-300 ease-in-out hover:scale-110 hover:drop-shadow-sm"
              onClick={SearchExerciseData}
            />
            
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
      <div>
        <NavSideBar />
      </div>
    </div>
  );
};

export default SearchExercises;

