import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import CategorySlider from "./components/CategorySlider";
import Navbar from "./components/Navbar";
import SuccessBox from "./components/SuccessBox";
import TaskForm from "./components/TaskForm";
import Home from "./components/Home";
import { useState } from "react";

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <BrowserRouter>
      <div className="w-full min-h-screen bg-white">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
