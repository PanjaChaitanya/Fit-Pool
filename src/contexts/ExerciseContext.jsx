import { createContext, useState } from "react";

export const ExerciseContext = createContext();

export const ExerciseProvider = ({ children }) => {
  const [cachedExercises, setCachedExercises] = useState({}); // Store exercise details
  const [selectedBodyPart, setSelectedBodyPart] = useState("all"); // Store selected category

  return (
    <ExerciseContext.Provider value={{ cachedExercises, setCachedExercises, selectedBodyPart, setSelectedBodyPart }}>
      {children}
    </ExerciseContext.Provider>
  );
};
