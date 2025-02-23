import { useEffect, useState, useContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchData, exerciseOptions } from "../utilities/fetchData";
import { ExerciseContext } from "../contexts/ExerciseContext";
import NavSideBar from "./NavSideBar";
import StopWatch from "./StopWatch";
import { Button } from "@mui/material";

const ExerciseDetail = () => {
  const { id } = useParams();
  const { cachedExercises, setCachedExercises } = useContext(ExerciseContext);
  const [exerciseDetail, setExerciseDetail] = useState(cachedExercises[id] || null);

  // Create a reference for the stopwatch div
  const stopWatchRef = useRef(null);

  useEffect(() => {
    if (cachedExercises[id]) {
      setExerciseDetail(cachedExercises[id]);
      return; // Avoid unnecessary fetch
    }

    const fetchExerciseDetail = async () => {
      try {
        const data = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          exerciseOptions
        );
        setExerciseDetail(data);
        setCachedExercises((prev) => ({ ...prev, [id]: data }));
      } catch (error) {
        console.error("Error fetching exercise details:", error);
      }
    };

    fetchExerciseDetail();
  }, [id, setCachedExercises]);

  // Function to scroll to stopwatch
  const scrollToStopwatch = () => {
    if (stopWatchRef.current) {
      stopWatchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="searchExercises flex-1 max-h-screen overflow-y-auto flex-col align-middle justify-center p-10">
        <h1 className="text-3xl mt-14 font-bold capitalize montserratFont">
          {exerciseDetail?.name || "Loading..."}
        </h1>
        
        {/* Set Time Button - Scrolls to Stopwatch */}
        <Button color="error" variant="outlined" onClick={scrollToStopwatch}>
          Set Time
        </Button>

        <div className="flex align-middle justify-center items-center flex-col">
          <img 
            src={exerciseDetail?.gifUrl || "/images/assets/loader.gif"} 
            alt={exerciseDetail?.name || "Loading..."} 
            className="w-80 h-80 my-4" 
          />
          <div className="flex gap-3 poppinFont capitalize">
            <p><strong className="text-red-500">Target Muscle:</strong> {exerciseDetail?.target || "Loading..."}</p>
            <p><strong className="text-red-500">Equipment:</strong> {exerciseDetail?.equipment || "Loading..."}</p>
          </div>

          {exerciseDetail?.instructions?.length > 0 && (
            <div className="poppinFont">
              <strong className="text-red-500">Instructions:</strong>
              <ul className="list-none">
                {exerciseDetail.instructions.map((detailList, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>
                      <img src="/icons/listicon.png" alt="listicon" width="20px"/>
                    </span> 
                    {detailList}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Stopwatch Section with Reference */}
        <div id="stopWatch" ref={stopWatchRef} className="mt-16">
          <StopWatch />
        </div>
      </div>

      <div>
        <NavSideBar />
      </div>
    </div>
  );
};

export default ExerciseDetail;
