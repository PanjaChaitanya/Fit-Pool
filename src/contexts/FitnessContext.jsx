import { createContext, useContext, useState, useCallback } from "react";
import { useLocalState } from "../utilities/storage";
const FitnessContext = createContext(null);
export function FitnessProvider({ children }) {
  const [favorites, setFavorites] = useLocalState("favorites", []);
  const [workout, setWorkout] = useLocalState("workout", {
    name: "My workout",
    exercises: [],
  });
  const [history, setHistory] = useLocalState("history", []);
  const [meals, setMeals] = useLocalState("meals", []);
  const [recipeFavorites, setRecipeFavorites] = useLocalState(
    "recipe-favorites",
    [],
  );
  const [notice, setNotice] = useState("");
  const notify = useCallback((message) => setNotice(message), []);
  const toggleFavorite = (id) =>
    setFavorites((previous) =>
      previous.includes(id)
        ? previous.filter((value) => value !== id)
        : [...previous, id],
    );
  const addExercise = (id) => {
    if (workout.exercises.some((item) => item.id === id)) {
      notify("This exercise is already in your workout.");
      return;
    }
    setWorkout((previous) => ({
      ...previous,
      exercises: [...previous.exercises, { id, sets: 3, reps: 10, weight: 0 }],
    }));
    notify("Added to your workout.");
  };
  return (
    <FitnessContext.Provider
      value={{
        favorites,
        toggleFavorite,
        workout,
        setWorkout,
        addExercise,
        history,
        setHistory,
        meals,
        setMeals,
        recipeFavorites,
        setRecipeFavorites,
        notice,
        notify,
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useFitness() {
  return useContext(FitnessContext);
}
