import "./App.css";

import { Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import Loading from "./assets/loading.gif";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import Game2 from "./screens/Game2";
import Game3 from "./screens/Game3";

function App() {
  const [loading, setLoading] = useState(true);
  const { user, isLoading, isAuthenticated } = useAuth0();
  const [score, setScore] = useState(0);
  const [chooseGame, setChooseGame] = useState();
  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      let users = localStorage.getItem(user.name);
      if (!users) {
        localStorage.setItem(user.name, score);
      } else {
        setScore(users);
      }
    }
  }, [score]);

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
        <Route
          path="/"
          element={
            <Profil
              score={score}
              setScore={setScore}
              isLoading={isLoading}
              user={user}
              setChooseGame={setChooseGame}
            />
          }
        ></Route>
        <Route
          path="/game"
          element={<Game2 score={score} setScore={setScore} />}
        ></Route>
        <Route
          path="/game3"
          element={<Game3 chooseGame={chooseGame} />}
        ></Route>
      </Routes>
    </div>
  ) : (
    <>
      <Home />
    </>
  );
}

export default App;
