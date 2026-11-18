import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FitnessProvider } from "./contexts/FitnessContext";
import { ExerciseDataProvider } from "./contexts/ExerciseDataContext";
import Home from "./pages/Home";
import AppShell from "./components/layout/AppShell";
const SearchExercises = lazy(() => import("./pages/SearchExercises"));
const ExerciseDetail = lazy(() => import("./pages/ExerciseDetail"));
const Workout = lazy(() => import("./pages/Workout"));
const Nutrition = lazy(() => import("./pages/Nutrition"));
const Recipes = lazy(() => import("./pages/Recipes"));
const Outdoors = lazy(() => import("./pages/Outdoors"));
const BmiCalculator = lazy(() => import("./pages/BmiCalculator"));
const About = lazy(() => import("./pages/About"));
import NotFound from "./pages/NotFound";
export default function App() {
  return (
    <FitnessProvider>
      <BrowserRouter>
        <ExerciseDataProvider>
          <Suspense
            fallback={
              <AppShell title="A moment for you.">
                <p className="loading-state" role="status">
                  Opening your space…
                </p>
              </AppShell>
            }
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/searchexercises" element={<SearchExercises />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/nutrition" element={<Nutrition />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/outdoors" element={<Outdoors />} />
              <Route path="/bmicalculator" element={<BmiCalculator />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<About contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ExerciseDataProvider>
      </BrowserRouter>
    </FitnessProvider>
  );
}
