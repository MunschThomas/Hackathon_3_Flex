import React, { useState, useEffect } from "react";
import "./Game.css";
import boomImg from "../assets/boom.png";
import rocks from "../assets/obstacle1.png";
import tree from "../assets/obstacle2.png";
import cat from "../assets/obstacle3.png";
import prise from "../assets/obstacle1_office.png";
import computer from "../assets/obstacle2_office.png";
import extincteur from "../assets/obstacle3_office.png";
import persos from "../assets/persos.png";
import perso_office from "../assets/persos_office.png";
import buttonProfil from "../assets/buttonHomme.png";
import e from "../assets/e.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";

import ModalQ from "../components/ModalQ";
import dataQuestions from "../assets/fondamentaux.json";

export default function Game(props) {
  const decal = window.innerWidth / 4.5;
  // Import données USER
  const { user } = useAuth0();

  const [inGame, setIngame] = useState(true);

  const [gameOver, setGameOver] = useState(false); // State Colision
  const [pause, setPause] = useState(false); // State Pause ou lettre
  const [letter, setLetter] = useState(false); //check si tombe sur lettre

  const [dataQuestion, setDataQuestion] = useState(dataQuestions);

  const [isLoading, setIsLoading] = useState(false);

  /// **************
  /// SELECTION DES OBSTACLES ET PERSO SELON LE CHOIX PRECEDENT
  /// **************

  const place = ["left", "middle", "right"]; // Emplacement obstacles ou lettres
  const [obstacle, setObstacle] = useState(null);
  const obstacleRoute = [rocks, cat, tree, e];
  // const obstacleRoute = [e];
  const obstacleBureau = [prise, computer, extincteur, e];
  // const obstacleBureau = [e];

  useEffect(() => {
    if (props.chooseGame === 0) {
      setObstacle(obstacleRoute);
    } else if (props.chooseGame === 1) {
      setObstacle(obstacleBureau);
    }
  }, []);
  // const [vitesse, setVitesse] = useState(null)

  //Attend chargement de la page
  useEffect(() => {
    setIsLoading(true);
    // setVitesse(1000)
    console.log("setvitesse");
  }, []);

  // State Victoire
  const [isWin, setIsWin] = useState(false); // State victoire !!!
  const [rightAnswer, setRightAnswer] = useState(0); // Nombre de réponses justes

  //Gagner LA Partie !!!!!!!
  const [handleFinalPopup, setHandleFinalPopup] = useState(false);

  useEffect(() => {
    if (rightAnswer === 6 && handleFinalPopup) {
      setPause(true);
      document.getElementById("revealBlockDown");
      setIsWin(true);
      let oldScore = localStorage.getItem(user.name);
      let newScore = oldScore * 1 + 1;
      localStorage.setItem(user.name, newScore);
    }
    console.log(rightAnswer);
  }, [handleFinalPopup, rightAnswer]);

  // Lancement Nouvelle Partie
  const launchNewGame = (final) => {
    final === 6 && setHandleFinalPopup(true);
    gameOver &&
      rightAnswer > 0 &&
      setRightAnswer((rightAnswer) => rightAnswer - 1);
    !isWin && setPause(false);
    setGameOver(false);
    setobstY(-100);
    setLetter(false);
    setIsBoom(false);
  };

  const launchNewNew = () => {
    isWin && setRightAnswer(0);
    setPause(false);
    setIsWin(false);
    setGameOver(false);
    setobstY(-100);
    setLetter(false);
    setIsBoom(false);
  };

  // State coordonnées
  const [carPos, setCarPos] = useState(0);
  const [obstY, setobstY] = useState(-100);

  const [carX, setCarX] = useState(0);
  const [carY, setcarY] = useState(0);

  const [isBoom, setIsBoom] = useState(false);
  const [placeBoom, setPlaceBoom] = useState("");

  // Rècupe coordonées voiture
  useEffect(() => {
    isLoading &&
      setcarY(document.getElementById("car").getBoundingClientRect().bottom);
  }, [isLoading]);

  // Déplacement voiture
  const setMove = (e) => {
    let car = document.getElementById("car");

    if (e.key === "ArrowLeft" && carPos >= 0) {
      car.style.transform = `translateX(calc(${carPos - 230}px - 50%))`;
      setCarPos((carPos) => carPos - 230);
      setCarX((carX) => carX - 1);
    }
    if (e.key === "ArrowRight" && carPos <= 0) {
      car.style.transform = `translateX(calc(${carPos + 230}px - 50%))`;
      setCarPos((carPos) => carPos + 230);
      setCarX((carX) => carX + 1);
    }
    if (e.key === "ArrowDown") {
      car.style.transform = `translateX(calc(${carPos}px - 50%)) rotate(360deg)`;
    }
    if (e.key === "ArrowUp") {
      car.style.transform = `translateX(calc(${carPos}px - 50%)) rotate(-360deg)`;
    }
    if (e.key === " ") {
      launchNewGame();
      isWin && launchNewNew();
    }
  };

  //Conditions collisions
  useEffect(() => {
    if (!gameOver && !pause) {
      const int = setInterval(() => {
        let place = document
          .getElementsByClassName("obstacle")[0]
          .className.split(" ")[1];
        console.log(place);
        setobstY(
          document.getElementsByClassName("obstacle")[0].getBoundingClientRect()
        );
        if (obstY.bottom > carY - 170 && obstY.bottom < carY + 20) {
          //Check lettre
          if (
            document
              .getElementsByClassName("obstacle")[0]
              .getAttribute("alt") === "letter"
          ) {
            if (
              (carX === -1 && place === "left") ||
              (carX === 0 && place === "middle") ||
              (carX === 1 && place === "right")
            ) {
              setLetter(true);
              setPause(true);
            }
          } else if (
            (carX === -1 && place === "left") ||
            (carX === 0 && place === "middle") ||
            (carX === 1 && place === "right")
          ) {
            setGameOver(true);
            setPlaceBoom(
              document
                .getElementsByClassName("obstacle")[0]
                .className.split(" ")[1]
            );
            setIsBoom(true);
            animBoom();
            console.log(animBoom());
          }
        }
      }, 10);

      return () => {
        clearInterval(int);
      };
    }
  }, [obstY, pause]);

  // USE EFFECT RAJOUT OBSTACLES
  useEffect(() => {
    if (obstacle) {
      let idObs = 0;
      let randomPos = Math.floor(Math.random() * place.length);
      let randomObs = Math.floor(Math.random() * obstacle.length);
      if (!gameOver && !pause) {
        const interval = setInterval(() => {
          const obs = document.getElementById("obstacle");
          const object = document.createElement("img");
          object.setAttribute("src", obstacle[randomObs]);
          randomObs === obstacle.length - 1
            ? object.setAttribute("alt", "letter")
            : object.setAttribute("alt", "rocks paper cisor");
          object.setAttribute(
            "class",
            `obstacle ${place[randomPos]} obstacleDOM`
          );
          object.setAttribute("id", `obs${idObs}`);
          obs.appendChild(object);
          idObs += 1;

          randomPos = Math.floor(Math.random() * place.length);
          randomObs = Math.floor(Math.random() * obstacle.length);
          const deletel = document.getElementById(`obs${idObs - 2}`);

          if (idObs !== 0 && idObs !== 1) {
            obs.removeChild(deletel);
          }
        }, 2500);
        return () => clearInterval(interval);
      }
    }
  }, [obstacle, gameOver, pause]);
  // ANIMATION DU BACKGROUND et OBSTACLE

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

  let animBoom = () => {
    document.getElementById("explose").animate(
      [
        {
          opacity: 1,
        },
        {
          opacity: 0,
        },
      ],
      {
        delay: 0,
        duration: 800,
        ease: "linear",
        iterations: 3,
        forwards: true,
      }
    );
  };

  //Stopper animation Background
  useEffect(() => {
    if (!pause && !gameOver) {
      road();
    } else {
      road().pause();
      setPause(true);
    }
  }, [pause, gameOver]);

  return (
    <>
      <div
        id="test"
        className="containerGrille"
        style={{
          backgroundColor: props.chooseGame === 0 ? "#91c574" : "#D8C4B6",
        }}
      >
        <div
          className="grille"
          id="road"
          tabIndex="0"
          onKeyDown={(e) => setMove(e)}
          style={{
            backgroundImage: `url(${
              props.chooseGame === 0 ? props.routeFina : props.routeOffice
            })`,
          }}
        >
          <div className="obstacleBox">
            {!pause && <div id="obstacle"></div>}
            {/* <img id="explose" src={boomImg} alt="explose" className={isBoom ? `explose boom ${placeBomm}` : "explose"}/>  */}
            {isBoom && (
              <img
                id="explose"
                src={boomImg}
                alt="explose"
                className={isBoom ? `explose ${placeBoom}` : "explose"}
              />
            )}

            <div className="holderButtonTop">
              <Link to="../Profil">
                <div className="returnBtn">
                  <img
                    className="iconeMenu"
                    src={buttonProfil}
                    alt="retourProfil"
                  />
                </div>
              </Link>
              {/* <div className='pauseBtn' onClick={() => setPause(!pause)}>
                <img
                  className='iconeMenu'
                  src={buttonEnergie}
                  alt='retourProfil'
                />
              </div> */}
            </div>
          </div>
          {/* // *********** CLARA LETTERS ******************/}
          <div className="enedisContainer">
            <div className="letterDetails">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 161.23 194.1"
              >
                <path
                  className={rightAnswer < 1 ? "cls-2" : "cls-3"}
                  d="M100.11,0h50.37c1.44,0,2.89,0,4.32.09,4.33.43,6.31,2.47,6.37,6.81q.12,10.79,0,21.58c0,4.28-2,6.37-6.35,6.88a40.22,40.22,0,0,1-4.79.13H56c-1.76,0-3.52.06-5.27.18-5.24.38-11.87,5.47-11.74,13,.18,10.39,0,20.78,0,31.17,0,3.86.07,3.91,4,3.91q26.64,0,53.26,0a31.75,31.75,0,0,1,4.78.17c3.16.49,5.28,2.63,5.34,5.82q.21,11.5,0,23c-.07,3.15-2.26,5.24-5.46,5.7a30.8,30.8,0,0,1-4.3.14H43.88c-5,0-4.86-.6-4.85,5,0,7,.26,14.08-.07,21.1-.36,7.57,6.08,13.67,13.51,13.85,3.36.09,6.72,0,10.07,0h87.8c1.43,0,2.88-.05,4.31.06,4.25.33,6.45,2.5,6.51,6.7.1,7.19.08,14.38,0,21.58,0,4.37-2.3,6.69-6.7,7.12-.95.09-1.92,0-2.88,0-32.94,0-65.88.06-98.82,0C37.39,194,23.91,189,13.1,177.78a44.59,44.59,0,0,1-13-32c0-31.82.38-63.63-.12-95.44-.4-25,17-42.5,36-48A62.65,62.65,0,0,1,53.58,0Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 161.4 194.22"
              >
                <path
                  className={rightAnswer < 2 ? "cls-2" : "cls-3"}
                  d="M161.33,83.72c-.25,11.79-.38,23.58.07,35.37-.09,2.07-.24,4.14-.24,6.21q0,29.73,0,59.47c0,7.27-2.07,9.32-9.45,9.35q-10.06,0-20.15,0c-7,0-9.14-2.11-9.14-9.13,0-37.73-.26-75.46.09-113.19.2-20.27-14.07-32.3-27.85-35.32a44.15,44.15,0,0,0-9.52-.91q-20.87,0-41.74,0c-4.69,0-4.72,0-4.72,4.72,0,47.64-.08,95.29.07,142.93,0,8.47-1.52,11.4-11.19,11-6.39-.28-12.8,0-19.19-.06-6-.05-8.33-2.35-8.33-8.5q0-88.49,0-177C0,2.19,2.16.08,8.68.07,34.43,0,60.17-.09,85.92.1,110.66.29,131.38,9.46,147,29c9.41,11.73,14,25.33,14.15,40.39C161.2,74.14,161.27,78.93,161.33,83.72Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 208.89 194.28"
              >
                <path
                  className={rightAnswer < 3 ? "cls-1" : "cls-4"}
                  d="M208.85,194.06c-1.59.07-3.18.2-4.77.2q-52.94,0-105.86,0a79,79,0,0,1-28.17-4.72c-23.55-8.93-39.84-24.76-46.41-49.61-1.48-5.61-1.64-11.34-1.61-17.1,0-3.36-.09-3.43-3.53-3.47-6.07-.08-12.14-.06-18.2-.08C-.15,107.48,0,95.69.23,83.9l129.55,0c5,0,9.49-1.28,13.21-4.73a14.37,14.37,0,0,0,5-11c0-5.6.06-11.2,0-16.79a15.83,15.83,0,0,0-12.31-15.19,30.37,30.37,0,0,0-7.13-.77q-24.24.06-48.46,0a28.52,28.52,0,0,0-6.19.62c-8,1.75-13,7.85-13.16,16,0,3,.06,6.08,0,9.12-.16,5.38-2.33,7.59-7.61,7.63q-12,.1-24,0c-4.15,0-6.8-2-6.85-5.82-.14-9.25-1.06-18.55.95-27.72,4-18,21.72-33.39,40.12-34.83Q69.79,0,76.26,0c19.83,0,39.66,0,59.5,0,7.22,0,14.37.81,21.13,3.6,14.8,6.12,24.84,16.51,28.83,32.3a41,41,0,0,1,.94,10c0,9-.23,17.91.06,26.86.71,21.71-15.25,39.78-36.08,44.89a64.41,64.41,0,0,1-15.22,1.64q-34.06,0-68.13,0c-1.12,0-2.25.08-3.36,0-2.49-.21-3.28.86-3.32,3.33-.25,13.72,5.54,24,17.27,31a38.72,38.72,0,0,0,20.19,5.12H203.16c1.91,0,3.82.18,5.73.27Q208.88,176.57,208.85,194.06Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 161.13 194.14"
              >
                <path
                  className={rightAnswer < 4 ? "cls-2" : "cls-3"}
                  d="M0,193.83l0-35c1.75-.08,3.5-.23,5.26-.23q39.33,0,78.68,0c6.75,0,13.43-.61,19.84-2.83,10.5-3.62,18.81-11.28,18.63-25.93q-.39-29.73,0-59.47c.26-18.7-14.78-32.76-31.49-34.54-5.59-.6-11.19-.27-16.78-.3-10.4-.05-20.79,0-31.19,0-4.13,0-4.17,0-4.17,4.2q0,38.85,0,77.7c0,1.28.08,2.56,0,3.83-.42,4.28-2.86,6.64-7.22,6.69q-12.24.15-24.47,0c-4.27-.06-6.46-2.2-6.93-6.39A32.55,32.55,0,0,1,0,117.72V10.28A31,31,0,0,1,.19,6C.7,2.28,2.78.38,6.55.05,7.5,0,8.47,0,9.43,0Q49.48,0,89.55,0c18.52,0,34.9,5.78,48.63,18.27C152.7,31.49,160.75,47.93,161,67.72q.34,32.37,0,64.75c-.19,19.8-8.93,35.3-24.89,46.76-11.56,8.31-24.7,12.53-38.75,14.07-12.44,1.36-24.93.57-37.39.72-18.71.23-37.42.06-56.13,0C2.54,194.07,1.27,193.91,0,193.83Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 39.01 194.05"
              >
                <path
                  className={rightAnswer < 5 ? "cls-2" : "cls-3"}
                  d="M0,122.07Q0,91.38,0,60.68a24.53,24.53,0,0,1,.21-4.29c.7-3.9,2.93-5.88,6.91-5.93q12.23-.12,24.46,0c4.25,0,6.53,2.07,7.17,6.18a24.32,24.32,0,0,1,.14,3.82V184.19a24.41,24.41,0,0,1-.12,3.83c-.57,3.61-2.8,5.86-6.43,5.92q-12.71.23-25.42,0C3,193.88.83,191.68.27,187.76a31,31,0,0,1-.12-4.31V122.07Z"
                />
                <path
                  className={rightAnswer < 5 ? "cls-2" : "cls-3"}
                  d="M19.75,0c4,0,8-.1,12,0,4.45.15,7,2.29,7.11,6.71.27,7.32.25,14.66,0,22-.13,4.36-2.6,6.62-7.11,6.71q-12.19.22-24.39,0C2.74,35.38.35,33,.2,28.25Q-.12,18,.08,7.7C.19,2.43,2.6.18,7.79.05,11.77,0,15.76,0,19.75,0Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 162.83 194.08"
              >
                <path
                  className={rightAnswer < 6 ? "cls-2" : "cls-3"}
                  d="M62.55,194.07q-26.14,0-52.29,0a23.67,23.67,0,0,1-4.77-.27C2,193.07.19,191,.13,187.44c-.11-7.51-.12-15,0-22.54.07-3.67,2.32-5.85,6-6.24a38.66,38.66,0,0,1,4.31-.08q46.29,0,92.59,0a30.46,30.46,0,0,0,7.61-.72c8.22-2.08,13.38-8.54,13.43-17a31.14,31.14,0,0,0-.54-8.1c-2.25-8.69-8.3-13.62-17.24-13.64-19.67,0-39.34-.34-59,.07C17,119.83.44,94.87.16,73.82,0,63.27-.13,52.71.18,42.17.73,24.29,13.62,8.43,32,2.47A56.29,56.29,0,0,1,49.45,0h85.87a23.66,23.66,0,0,1,4.3.26C143,.89,145,3,145.07,6.52q.19,11,0,22.06c-.07,4-2.16,6.2-6.07,6.75a34.71,34.71,0,0,1-4.79.16H59.39c-3.87,0-7.67.22-11.17,2.15-5.93,3.26-9.3,8.12-9.39,15,0,4.32-.1,8.63-.07,13a18.1,18.1,0,0,0,18.7,18.22c18.87-.33,37.74,0,56.61-.1,12.61,0,24,3.58,33.74,11.56s15.33,18.18,14.94,31.21c-.22,7.18-.38,14.4,0,21.57,1.11,19.75-12.93,38.45-34.18,44.16a58,58,0,0,1-15.19,1.85Q88,194.05,62.55,194.07Z"
                />
              </svg>
            </div>
          </div>

          {/* // *********** RAJOUTS THOM YAN DOWN******************/}
          <img
            src={props.chooseGame === 0 ? persos : perso_office}
            id="car"
            alt="perso"
            className="perso"
          />
          {pause && letter && (
            <div className="overlay">
              <ModalQ
                pause={pause}
                dataQuestion={dataQuestion}
                setDataQuestion={setDataQuestion}
                launchNewGame={launchNewGame}
                rightAnswer={rightAnswer}
                setRightAnswer={setRightAnswer}
              />
            </div>
          )}
        </div>
        {gameOver && (
          <div className="overlay">
            <div className="gameWin">
              <FontAwesomeIcon
                icon={faTrophy}
                size="3x"
                color="var(--green-500)"
                className={"looseTrophy"}
              />
              <h2>
                C'est perdu :( <br />
                Essayez d'éviter les obstacles la prochaines fois !
              </h2>
              <button onClick={() => launchNewGame()}>Relance la partie</button>
            </div>
            {/* <div className="overlay"></div> */}
          </div>
        )}
        {isWin && (
          <div className="overlay">
            <div className="gameWin">
              <FontAwesomeIcon
                icon={faTrophy}
                size="3x"
                color="var(--green-500)"
                className={"winTrophy"}
              />
              <h2>
                C'est Gagné !!! <br /> Bravo vous avez réunis les 6 lettres
                d'Enedis et maitrisez désormais un fondamental !
              </h2>
              <div className="gameWinButton">
                <Link to="../Profil">
                  <button>Retour</button>
                </Link>
                <button onClick={() => launchNewNew()}>Nouvelle partie</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
