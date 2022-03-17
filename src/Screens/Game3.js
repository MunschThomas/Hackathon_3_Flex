import React, { useState, useEffect } from "react";
import "./Game2.css";
import rocks from "../assets/obstacle1.png";
import tree from "../assets/obstacle2.png";
import cat from "../assets/obstacle3.png";
import persos from "../assets/persos.png";

export default function Game2() {
  const decal = window.innerWidth / 4.5;

  const [inGame, setIngame] = useState(true);

  // *********** RAJOUTS LETTERS THOM YAN UP*****************

  const [letters, setLetters] = useState([]);
  const [idNum, setIdNum] = useState(0);
  const [winLetters, setWinLetters] = useState(false);
  const [pause, setPause] = useState(false);

  const newTableauNumber = [];

  useEffect(() => {
    let tableauNumber = [persos, persos, persos, persos, persos, persos];
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * tableauNumber.length);
      const aEnlever = tableauNumber[random];
      newTableauNumber.push(aEnlever);
      tableauNumber = tableauNumber.filter((el) => el !== aEnlever);
    }
    setLetters(newTableauNumber);
  }, []);

  useEffect(() => {
    if (idNum === 6) {
      setWinLetters(true);
    }
  }, [idNum]);

  const newLetter = () => {
    setIdNum((idNum) => idNum + 1);
  };

  // *********** RAJOUTS OBSTACLES ALEATOIRES THOM YAN UP*****************

  // USE EFFECT WITH OBSTACLES
  useEffect(() => {
    let idObs = 0;
    let randomPos = Math.floor(Math.random() * place.length);
    let randomObs = Math.floor(Math.random() * obstacle.length);
    if (!winLetters && !pause) {
      const interval = setInterval(() => {
        console.log("letters", letters);
        const obs = document.getElementById("obstacle");
        const object = document.createElement("img");
        object.setAttribute("src", obstacle[randomObs]);
        object.setAttribute("alt", "rocks paper cisor");
        object.setAttribute(
          "class",
          `obstacle ${place[randomPos]} obstacleDOM`
        );
        object.setAttribute("id", `obs${idObs}`);
        obs.appendChild(object);
        idObs += 1;
        randomPos = Math.floor(Math.random() * place.length);
        randomObs = Math.floor(Math.random() * obstacle.length);
        // console.log("add", document.getElementById(`obs${idObs}`));
        // console.log("delete", document.getElementById(`obs${idObs - 1}`));
        const deletel = document.getElementById(`obs${idObs - 2}`);
        if (idObs !== 0 && idObs !== 1) {
          obs.removeChild(deletel);
        }
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [winLetters, pause]);

  // USE EFFECT WITH LETTERS !!!!
  useEffect(() => {
    let idObs = 0;
    let randomPos = Math.floor(Math.random() * place.length);
    let randomLetter = Math.floor(Math.random() * letters.length);
    if (letters.length !== 0 && !winLetters && !pause) {
      const interval = setInterval(() => {
        const obs = document.getElementById("obstacle");
        const object = document.createElement("img");
        object.setAttribute("src", letters[randomLetter]);
        object.setAttribute("alt", "letter");
        object.setAttribute(
          "class",
          `obstacle ${place[randomPos]} obstacleDOM`
        );
        object.setAttribute("id", `obs${idObs}`);
        obs.appendChild(object);
        idObs += 1;
        randomPos = Math.floor(Math.random() * place.length);
        randomLetter = Math.floor(Math.random() * letters.length);
        // console.log("add", document.getElementById(`obs${idObs}`));
        // console.log("delete", document.getElementById(`obs${idObs - 1}`));
        const deletel = document.getElementById(`obs${idObs - 2}`);
        if (idObs !== 0 && idObs !== 1) {
          obs.removeChild(deletel);
        }
      }, 3500);
      return () => clearInterval(interval);
    }
  }, [winLetters, pause, letters]);

  // *********** RAJOUTS THOM YAN DOWN*****************

  const place = ["left", "middle", "right"];
  const obstacle = [rocks, cat, tree];
  const obstacle2 = ["lettre"];

  const [carPos, setCarPos] = useState(0);

  const setMove = (e) => {
    console.log("keyboardEvent", e);
    let car = document.getElementById("car");
    if (e.key === "ArrowLeft" && carPos >= 0) {
      // car.style.transform = `translateX(${carPos - 150}px)`;
      car.style.transform = `translateX(calc(${carPos - decal}px - 50%))`;
      // setCarPos((carPos) => carPos - decal);
      setCarPos((carPos) => carPos - decal);
    }
    if (e.key === "ArrowRight" && carPos <= 0) {
      // car.style.transform = `translateX(${carPos + 150}px)`;
      car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
      setCarPos((carPos) => carPos + decal);
    }
  };

  // useEffect(() => {
  //   console.log(document.getElementById("car").getBoundingClientRect());
  // }, []);

  let road = () =>
    document.getElementById("road").animate(
      [
        {
          backgroundPositionY: 0,
        },
        {
          backgroundPositionY: "1445px",
        },
      ],
      {
        duration: 3000,
        ease: "linear",
        iterations: Infinity,
        forwards: true,
      }
    );
  useEffect(() => {
    if (!pause && !winLetters) {
      road();
    } else {
      road().pause();
    }
  }, [pause, winLetters]);

  return (
    <>
      <div className="containerGrille">
        <div
          className="grille"
          id="road"
          tabIndex="0"
          onKeyDown={(e) => setMove(e)}
        >
          {/* // *********** RAJOUTS THOM YAN UP******************/}
          {/* {letters && letters[idNum]} */}
          {!winLetters ? (
            <>
              <div onClick={() => newLetter()}>CLIQUE ICI</div>
              <div onClick={() => setPause(!pause)}>PAUSE</div>
            </>
          ) : (
            <div>Victoire</div>
          )}

          {/* // *********** RAJOUTS THOM YAN DOWN******************/}
          <img src={persos} id="car" alt="perso" className="perso" />
          {inGame && <div id="obstacle"></div>}
        </div>
      </div>
    </>
  );
}
