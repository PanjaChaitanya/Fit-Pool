import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import BmiCalculator from "./pages/BmiCalculator";
import SearchExercises from "./pages/SearchExercises";
import ExerciseDetail from "./pages/ExerciseDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { BodyPartProvider } from "./contexts/BodyPartContext";
import { ExerciseProvider } from "./contexts/ExerciseContext";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
const App = () => {
  return (
    
      <BodyPartProvider>
        <ExerciseProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/bmicalculator" element={<BmiCalculator />} />
              <Route path="/searchexercises" element={<SearchExercises />} />
              <Route path="/exercise/:id" element={<ExerciseDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Router>
        </ExerciseProvider>
      </BodyPartProvider>
  );
};

export default App;
