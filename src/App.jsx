import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BmiCalculator from "./pages/BmiCalculator";
import SearchExercises from "./pages/SearchExercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BodyPartProvider } from "./contexts/BodyPartContext";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  
  return (
    
      <BodyPartProvider>
        <ExerciseProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bmicalculator" element={<BmiCalculator />} />
              <Route path="/searchexercises" 
                element={
                  <ProtectedRoute>
                    <SearchExercises/>
                  </ProtectedRoute>
                }
              />
              <Route path="/exercise/:id"
                element={
                  <ProtectedRoute>
                    <ExerciseDetail/>
                  </ProtectedRoute>
                } 
             />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />}/>
            </Routes>
          </Router>
        </ExerciseProvider>
      </BodyPartProvider>
  );
};

export default App;