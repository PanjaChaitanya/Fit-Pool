import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BmiCalculator from "./components/BmiCalculator";
import SearchExercises from "./components/SearchExercises";
import ExerciseDetail from "./components/ExerciseDetail";
import StopWatch from "./components/StopWatch";
import { BodyPartProvider } from "./contexts/BodyPartContext";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import { AuthProvider } from "./contexts/AuthenticationContext"; // Import AuthProvider

const App = () => {
  return (
    <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <BodyPartProvider>
        <ExerciseProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmicalculator" element={<BmiCalculator />} />
              <Route path="/searchexercises" element={<SearchExercises />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/stopwatch" element={<StopWatch />} />
            </Routes>
          </Router>
        </ExerciseProvider>
      </BodyPartProvider>
    </AuthProvider>
  );
};

export default App;
