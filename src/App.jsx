import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BmiCalculator from "./components/BmiCalculator";
import SearchExercises from "./components/SearchExercises";
import ExerciseDetail from "./components/ExerciseDetail";
import About from "./components/About";
import { BodyPartProvider } from "./contexts/BodyPartContext";
import { ExerciseProvider } from "./contexts/ExerciseContext";

const App = () => {
  return (
    
      <BodyPartProvider>
        <ExerciseProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmicalculator" element={<BmiCalculator />} />
              <Route path="/searchexercises" element={<SearchExercises />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </ExerciseProvider>
      </BodyPartProvider>
  );
};

export default App;
