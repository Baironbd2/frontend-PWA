import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import Home from "./routes/Home";
import Predict from "./routes/Predict";
import DatosRemotos from "./routes/DatosRemotos";
import History from "./routes/History";


import "./index.css";

function App() {
  return (
    <Router>
      <div>
        <Navigation/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predecir" element={<Predict />} />
          <Route path="/datosremotos" element={<DatosRemotos />} />
          <Route path="/historial" element={<History />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;
