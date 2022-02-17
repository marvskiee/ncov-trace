import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import TopNav from "./components/TopNav";
function App() {
  const [toggleMenu, setToggleMenu] = useState("");
  return (
    <Router>
      <TopNav setToggle={setToggleMenu} toggle={toggleMenu} />
      <Routes>
        <Route path="/tracker" element={<Home />}></Route>
        <Route path="/about-covid19" element={<About />}></Route>
        <Route path="/" element={<Navigate replace to="/tracker" />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
