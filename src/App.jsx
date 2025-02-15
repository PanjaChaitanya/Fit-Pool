import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import BmiCalculator from "./components/BmiCalculator";
import SearchExercises from "./components/SearchExercises";
import { BodyPartProvider } from "./contexts/BodyPartContext"; // Import the provider



const  App = () => {
  return (
    <BodyPartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bmicalculator" element={<BmiCalculator />} />
          <Route path="/searchexercises" element={<SearchExercises />} />
        </Routes>
      </Router>
    </BodyPartProvider>
  );
}

export default App;
