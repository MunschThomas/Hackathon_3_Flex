import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import Profil from "./Screens/Profil";
import Loading from "./assets/loading.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Game2 from "./Screens/Game2";
import Game3 from "./Screens/Game3";

function App() {
  const { isAuthenticated } = useAuth0();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  if (loading) {
    return (
      <div className="loadingContainer">
        <img src={Loading} alt="loading" className="loading"></img>
      </div>
    );
  }
  return isAuthenticated ? (
    <div className="App">
      <Routes>
        <Route path="/" element={<Profil />}></Route>
        <Route path="/game" element={<Game2 />}></Route>
        <Route path="/game3" element={<Game3 />}></Route>
      </Routes>
    </div>
  ) : (
    <>
      <Home />
    </>
  );
}

export default App;
