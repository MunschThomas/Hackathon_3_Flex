import "./App.css";

import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
// ***ADD TO AUTH0 :***
// import { useAuth0 } from '@auth0/auth0-react'
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import Game from "./screens/Game";
import Revisions from "./screens/Revisions";
import Loading from "./assets/loading.gif";
import routeFina from "./assets/routeFina.png";
import routeOffice from "./assets/routeOffice.png";
import routeOfficeMobile from "./assets/routeOfficeMobile.png";
import routeFinaMobile from "./assets/routeFinaMobile.png";

function App() {
  // ***ADD TO AUTH0 :***
  // const { user, isLoading, isAuthenticated } = useAuth0();

  const [chooseGame, setChooseGame] = useState();
  const [input, setInput] = useState("");
  console.log("input", input);
  return (
    <div className="App">
      {!input ? (
        <Routes>
          <Route
            path="/*"
            element={<Home input={input} setInput={setInput} />}
          ></Route>
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Home input={input} setInput={setInput} />}
          ></Route>
          <Route
            path="/Profil"
            element={
              <Profil
                user={input}
                setInput={setInput}
                setChooseGame={setChooseGame}
              />
            }
          ></Route>
          <Route
            path="/game"
            element={
              <Game
                chooseGame={chooseGame}
                routeOffice={routeOffice}
                routeFina={routeFina}
                routeFinaMobile={routeFinaMobile}
                routeOfficeMobile={routeOfficeMobile}
              />
            }
          ></Route>
          <Route path="/revisions" element={<Revisions />}></Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
