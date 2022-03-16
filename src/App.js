import "./App.css";
import Loader from "./Components/Loader.js";
import { Routes } from "react-router-dom";
import { useState, useEffect } from "react";

import Game3 from "./Screens/Game3";

function App() {
  let [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false);
    }, 0);
  }, []);

  return (
    <>
      {isLoaded === false ? (
        <div className="App">
          <header className="App-header"></header>

          <Game3 />

          <Routes></Routes>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default App;
