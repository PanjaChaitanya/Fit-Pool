import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { exerciseOptions } from "../utilities/fetchData";
import { starterExercises } from "../data/starter";

const Context = createContext(null);
const CACHE_KEY = "fitpool:exercisedb-cache";
let pending;
function normalizeExercise(item) {
  return {
    ...item,
    name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
    primaryMuscles: [item.target],
    secondaryMuscles: item.secondaryMuscles || [],
    equipment: item.equipment === "body weight" ? "body only" : item.equipment,
    instructions: item.instructions || [],
    category: item.category || "movement",
    level: item.difficulty || "",
  };
}
async function loadExercises(refresh = false) {
  if (!refresh) {
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY));
      if (
        cached?.at > Date.now() - 10 * 60 * 1000 &&
        Array.isArray(cached.data) &&
        cached.data.length
      )
        return cached.data;
    } catch {
      /* Continue with live data. */
    }
    if (pending) return pending;
  }
  pending = (async () => {
    const response = await fetch(
      "https://exercisedb.p.rapidapi.com/exercises?limit=0&offset=0",
      { ...exerciseOptions, signal: AbortSignal.timeout(20000) },
    );
    if (!response.ok)
      throw new Error(
        response.status === 429
          ? "ExerciseDB’s request limit has been reached. Please try again later."
          : "ExerciseDB is unavailable right now. Please retry to load the animated guides.",
      );
    const raw = await response.json();
    if (!Array.isArray(raw) || !raw.length)
      throw new Error("ExerciseDB returned no exercises. Please try again.");
    const data = raw.map(normalizeExercise);
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data }));
    } catch {
      /* In-memory use still works. */
    }
    return data;
  })();
  try {
    return await pending;
  } finally {
    pending = null;
  }
}
export function ExerciseDataProvider({ children }) {
  const { pathname } = useLocation();
  const [exercises, setExercises] = useState(starterExercises);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(0);
  const enabled =
    pathname === "/" ||
    pathname === "/workout" ||
    pathname === "/searchexercises" ||
    pathname.startsWith("/exercise/");
  useEffect(() => {
    if (!enabled) return;
    let active = true;
    setStatus("loading");
    setError("");
    loadExercises(refresh > 0)
      .then((data) => {
        if (active) {
          setExercises(data);
          setStatus("ready");
        }
      })
      .catch((reason) => {
        if (active) {
          setError(reason.message);
          setStatus("error");
        }
      });
    return () => {
      active = false;
    };
  }, [enabled, refresh]);
  return (
    <Context.Provider
      value={{
        exercises,
        status,
        error,
        reload: () => setRefresh((value) => value + 1),
      }}
    >
      {children}
    </Context.Provider>
  );
}
// eslint-disable-next-line react-refresh/only-export-components
export function useExercises() {
  return useContext(Context);
}
