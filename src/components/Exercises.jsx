import { Box, Stack, Typography, Pagination } from "@mui/material";
import { useBodyPart } from "../contexts/BodyPartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utilities/fetchData";

const Exercises = () => {
  const { bodyPart, exercises, setExercises } = useBodyPart();
  const [currentPage, setCurrentPage] = useState(1);

  const exercisesPerPage = 6;
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const Paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];
      if (bodyPart === "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=100&offset=0",
          exerciseOptions
        );
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
      }
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  return (
    <Box id="exercises" sx={{ mt: { lg: "80px" } }} mt="40px" p="20px">
      <Typography 
        variant="h4" 
        component="h2" 
        mb="46px" 
        align="center" 
        className="montserratFont uppercase transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:border-b-2  border-red-400 animateClass"
      >
        Showing exercises
      </Typography>

      <Stack direction="row" flexWrap="wrap" justifyContent="center" sx={{ gap: { lg: "70px", xs: "40px" } }}>
        {currentExercises.map((exercise) => (
         <Link key={exercise.id} to={`/exercise/${exercise.id}`}>
         <div className="p-5 w-[250px] h-auto shadow-2xl transition duration-300 rounded-xl ease-in-out hover:-translate-y-1 hover:scale-110 animateClass">
           
           {/* Ensure GIF URL is valid */}
           <img
             src={exercise?.gifUrl ? exercise.gifUrl : "/images/assets/small_Loader.gif"}
             alt={exercise.name}
             className="rounded-b-md w-full h-auto object-cover transition duration-300 ease-in-out"
           />
       
           <div className="flex flex-wrap mt-2 align-middle justify-center gap-2">
             <h5 className="mt-4 font-bold text-gray-700 capitalize hover:underline">
               Name: {exercise.name}
             </h5>
             <div className="btnFonts text-center">Body Part: {exercise.bodyPart}</div>
             <div className="btnFonts text-center">Targets On: {exercise.target}</div>
           </div>
         </div>
       </Link>
       
        ))}
      </Stack>

      <Stack mt="100px" alignItems="center">
        {exercises.length > 4 && (
          <Pagination
            color="error"
            className="btnFonts"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={Paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
