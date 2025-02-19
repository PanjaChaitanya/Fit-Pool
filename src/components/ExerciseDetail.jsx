import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { fetchData, exerciseOptions } from "../utilities/fetchData";
import { ExerciseContext } from "../contexts/ExerciseContext";
import NavSideBar from "./NavSideBar"; // Import Sidebar

const ExerciseDetail = () => {
  const { id } = useParams(); 
  const { cachedExercises, setCachedExercises } = useContext(ExerciseContext);
  const [exerciseDetail, setExerciseDetail] = useState(cachedExercises[id] || null);

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      if (cachedExercises[id]) {
        setExerciseDetail(cachedExercises[id]); // Use cached data
      } else {
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
      }
    };

    fetchExerciseDetail();
  }, [id, cachedExercises, setCachedExercises]);

  if (!exerciseDetail) {
    return <div className="h-screen text-gray-500 flex align-middle justify-center" >
      <img src="/images/assets/loader.gif" alt="loadergif" width="100px" height="100px" />
    </div>;
  }

  return (
    <div className="flex"> 

      <div className=" searchExercises flex-1 max-h-screen overflow-y-auto flex-col align-middle justify-center p-10">
        <h1 className="text-3xl mt-14 font-bold capitalize montserratFont">{exerciseDetail.name}</h1>
        <div className="flex align-middle justify-center items-center flex-col">
        <img src={exerciseDetail.gifUrl} alt={exerciseDetail.name} className="w-80 h-80 my-4" />
        <div className="flex gap-3 poppinFont">
          <p><strong>Target Muscle:</strong> {exerciseDetail.target}</p>
          <p><strong>Equipment:</strong> {exerciseDetail.equipment}</p>
          {exerciseDetail.instructions && (
            <div>
              <strong>Instructions:</strong>
              <ul className="list-none">
                {exerciseDetail.instructions.map((detailList, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span><img src="/icons/listicon.png" alt="listicon" width="20px"/></span> {detailList}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Sidebar */}
      <div>
        <NavSideBar />
      </div>
    </div>
  );
};

export default ExerciseDetail;
