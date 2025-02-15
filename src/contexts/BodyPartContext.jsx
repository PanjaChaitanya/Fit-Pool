import { createContext, useContext, useState } from "react";

// Create context
const BodyPartContext = createContext();

// Create provider component
export const BodyPartProvider = ({ children }) => {
  const [bodyPart, setBodyPart] = useState("all");
  const [exercises, setExercises] = useState([]);
  console.log(bodyPart)
  return (
    <BodyPartContext.Provider value={{ bodyPart, setBodyPart, exercises, setExercises }}>
      {children}
    </BodyPartContext.Provider>
  );
};

// Custom hook to use the context
export const useBodyPart = () => useContext(BodyPartContext);
