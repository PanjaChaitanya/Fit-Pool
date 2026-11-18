export const featuredIds = [
  "0662",
  "0043",
  "0289",
  "0032",
  "0027",
  "3533",
  "0274",
  "0285",
  "0464",
  "0652",
  "0334",
  "0336",
];
export const templates = [
  {
    id: "full-body",
    name: "Full body foundations",
    detail: "A little of everything. A strong place to start.",
    minutes: 35,
    equipment: "Dumbbells",
    exercises: ["3533", "0289", "0293", "0285", "0464"],
  },
  {
    id: "bodyweight",
    name: "Anywhere, anytime",
    detail: "Just you, a little space, and twenty minutes.",
    minutes: 20,
    equipment: "Bodyweight",
    exercises: ["3533", "0662", "0006", "0274", "0464"],
  },
  {
    id: "upper-body",
    name: "Upper body focus",
    detail: "Push, pull, and give your shoulders some attention.",
    minutes: 40,
    equipment: "Gym",
    exercises: ["0289", "0027", "0334", "0285"],
  },
];
export const muscleGroups = [
  "All muscles",
  "chest",
  "back",
  "legs",
  "shoulders",
  "arms",
  "core",
];
export function groupFor(exercise) {
  const muscle = exercise.primaryMuscles[0];
  if (["abs", "serratus anterior"].includes(muscle)) return "core";
  if (["delts", "deltoids"].includes(muscle)) return "shoulders";
  if (["pectorals", "pectoralis major"].includes(muscle)) return "chest";
  if (
    ["upper back", "spine", "levator scapulae", "erector spinae"].includes(
      muscle,
    )
  )
    return "back";
  if (muscle === "quads") return "legs";
  if (["lats", "middle back", "lower back", "traps"].includes(muscle))
    return "back";
  if (
    [
      "quadriceps",
      "hamstrings",
      "glutes",
      "calves",
      "adductors",
      "abductors",
    ].includes(muscle)
  )
    return "legs";
  if (["biceps", "triceps", "forearms"].includes(muscle)) return "arms";
  if (muscle === "abdominals") return "core";
  return muscle;
}
export function equipmentName(value) {
  return value === "body only" || !value ? "Bodyweight" : value;
}
export function todayKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
