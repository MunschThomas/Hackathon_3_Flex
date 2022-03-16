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
  const [nbLetters, setNbLetters] = useState([]);
  const [idNum, setIdNum] = useState(0);
  const [winLetters, setWinLetters] = useState(false);

  let tableauNumber = ["B", "n", "e", "d", "i", "s"];
  const newTableauNumber = [];

  useEffect(() => {
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
    console.log("coucou");
    setIdNum((idNum) => idNum + 1);
  };

  // *********** RAJOUTS THOM YAN DOWN*****************

  const place = ["left", "middle", "right"];
  const obstacle = [rocks, cat, tree];

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

  //  useEffect(()=> {

  //    let road = document.getElementById('road').animate(
  //      [{
  //        backgroundPositionY: 0
  //      },{
  //        backgroundPositionY:100
  //      }],
  //      {duration: 3000,
  //    ease: "linear",
  //    iterations: Infinity
  //    }

  //    )
  //  }
  //  , [])

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
          {letters && letters[idNum]}
          {!winLetters ? (
            <div onClick={() => newLetter()}>CLIQUE ICI</div>
          ) : (
            <div>Victoire</div>
          )}

          {/* // *********** RAJOUTS THOM YAN DOWN******************/}
          <img src={persos} id="car" alt="perso" className="perso" />
          {inGame && (
            <div>
              <img
                src={obstacle[0]}
                alt="rocks"
                className={`obstacle ${place[0]}`}
              />
              <img
                src={obstacle[1]}
                alt="cat"
                className={`obstacle ${place[1]}`}
              />
              <img
                src={obstacle[2]}
                alt="tree"
                className={`obstacle ${place[2]}`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
