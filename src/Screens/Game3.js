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

  const [newId, setNewId] = useState(0);

  // USE EFFECT WITH OBSTACLES
  useEffect(() => {
    let idObs = 0;
    let randomPos = Math.floor(Math.random() * place.length);
    let randomObs = Math.floor(Math.random() * obstacle.length);
    if (!winLetters && !pause) {
      const interval = setInterval(() => {
        // console.log("letters", letters);
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
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [winLetters, pause]);

  // USE EFFECT WITH LETTERS !!!!
  // useEffect(() => {
  //   let idObs = 0;
  //   if (!winLetters && !pause) {
  //     let randomPos = Math.floor(Math.random() * place.length);
  //     let randomLetter = Math.floor(Math.random() * letters.length);
  //     const interval = setInterval(() => {
  //       const obs = document.getElementById("obstacle");
  //       const object = document.createElement("img");
  //       object.setAttribute("src", letters[randomLetter]);
  //       object.setAttribute("alt", "letter");
  //       object.setAttribute(
  //         "class",
  //         `obstacle ${place[randomPos]} obstacleDOM`
  //       );
  //       object.setAttribute("id", `obs${idObs}`);
  //       obs.appendChild(object);
  //       idObs += 1;
  //       randomPos = Math.floor(Math.random() * place.length);
  //       randomLetter = Math.floor(Math.random() * letters.length);
  //       // console.log("add", document.getElementById(`obs${idObs}`));
  //       // console.log("delete", document.getElementById(`obs${idObs - 1}`));
  //       const deletel = document.getElementById(`obs${idObs - 4}`);
  //       if (idObs !== 0 && idObs !== 1) {
  //         obs.removeChild(deletel);
  //       }
  //     }, 1700);
  //     return () => clearInterval(interval);
  //   }
  // }, [winLetters, pause, letters]);

  // *********** RAJOUTS THOM YAN DOWN*****************
  const [isLoading, setIsLoading] = useState(false);

  const place = ["left", "middle", "right"];
  const obstacle = [rocks, cat, tree];

  const [carPos, setCarPos] = useState(0);

  // const [obstacles, setObstacles] = useState([]); Récup les obstacles
  const [obstY, setobstY] = useState(-100);

  const [carX, setCarX] = useState(0);
  const [carY, setcarY] = useState(0);

  //Attend chargement de la page
  useEffect(() => {
    setIsLoading(true);
  }, []);

  // Rècupe coordonées voiture
  useEffect(() => {
    isLoading &&
      setcarY(document.getElementById("car").getBoundingClientRect().bottom);
  }, [isLoading]);

  //Conditions collisions
  useEffect(() => {
    let newId = 0;

    if (!winLetters && !pause) {
      const int = setInterval(() => {
        // console.log(
        //   document.getElementById(`obs${newId}`).className.split(" ")[1]
        // );
        // console.log("classname", document.getElementById(`obs${newId}`));
        // console.log("classname", document.getElementsByClassName("obstacle")[0]);
        // console.log(
        //   "eeferfe",
        //   document.getElementById(`obs${newId}`).getBoundingClientRect()[0]
        // );
        // setobstY(document.getElementById(`obs${newId}`).getBoundingClientRect());
        setobstY(
          document.getElementsByClassName("obstacle")[0].getBoundingClientRect()
        );
        console.log(
          document.getElementsByClassName("obstacle")[0].className.split(" ")[1]
        );
        if (obstY.bottom > carY - 150 && obstY.bottom < carY + 20) {
          if (
            carX === -1 &&
            document
              .getElementsByClassName("obstacle")[0]
              .className.split(" ")[1] === "left"
          ) {
            setIngame(false);
          }
          if (
            carX === 0 &&
            document
              .getElementsByClassName("obstacle")[0]
              .className.split(" ")[1] === "middle"
          ) {
            setIngame(false);
          }
          if (
            carX === 1 &&
            document
              .getElementsByClassName("obstacle")[0]
              .className.split(" ")[1] === "right"
          ) {
            setIngame(false);
          }
        }
      }, 10);
      const deux = setInterval(() => {
        newId++;
      }, 2500);

      return () => {
        clearInterval(int);
        clearInterval(deux);
      };
    }
  }, [obstY, pause]);

  // Déplacement voiture
  const setMove = (e) => {
    console.log("keyboardEvent", e);
    let car = document.getElementById("car");

    if (e.key === "ArrowLeft" && carPos >= 0) {
      car.style.transform = `translateX(calc(${carPos - 230}px - 40%))`;
      // car.style.transform = `translateX(calc(${carPos - decal}px - 50%))`;
      // setCarPos((carPos) => carPos - decal);
      setCarPos((carPos) => carPos - 230);
      setCarX((carX) => carX - 1);
    }
    if (e.key === "ArrowRight" && carPos <= 0) {
      car.style.transform = `translateX(calc(${carPos + 230}px - 40%))`;
      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
      setCarPos((carPos) => carPos + 230);
      setCarX((carX) => carX + 1);
    }
    if (e.key === "ArrowDown") {
      // car.style.transform = "transform-origin: center";
      // car.style.transform = "rotate(0deg)";
      car.style.transform = `translateX(calc(${carPos}px - 40%)) rotate(360deg)`;

      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
    }
    if (e.key === "ArrowUp") {
      // car.style.transform = "transform-origin: center";
      car.style.transform = `translateX(calc(${carPos}px - 40%)) rotate(-360deg)`;

      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
    }
  };

  useEffect(() => {
    console.log(document.getElementById("car").getBoundingClientRect());
  }, [carPos]);

  // ANIMATION DU BACKGROUND et OBSTACLE

  // let road = () => {
  //   document.getElementById("road").animate(
  //     [
  //       {
  //         backgroundPositionY: 0,
  //       },
  //       {
  //         backgroundPositionY: "1445px",
  //       },
  //     ],
  //     {
  //       duration: 3000,
  //       ease: "linear",
  //       iterations: Infinity,
  //       forwards: true,
  //     }
  //   );
  // };

  // useEffect(() => {
  //   if (isLoading) {
  //     if (!pause && inGame) {
  //       console.log(road());
  //       road();
  //     } else {
  //       road().pause();

  //       console.log("road", road);
  //     }
  //   }
  // }, [pause, winLetters, inGame, isLoading]);

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
    if (!winLetters && inGame) {
      road();
    } else {
      road().pause();
    }
  }, [pause, winLetters, inGame]);

  return (
    <>
      <div id="test" className="containerGrille">
        <div
          className={inGame ? "grille" : "arret"}
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
