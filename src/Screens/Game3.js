import React, { useState, useEffect } from 'react'
import './Game2.css'
import rocks from '../assets/obstacle1.png'
import tree from '../assets/obstacle2.png'
import cat from '../assets/obstacle3.png'
import persos from '../assets/persos.png'
import e from '../assets/e.png'

export default function Game2() {
  const decal = window.innerWidth / 4.5

  const [inGame, setIngame] = useState(true)

  // *********** RAJOUTS LETTERS THOM YAN UP*****************

  const [letters, setLetters] = useState([])
  const [idNum, setIdNum] = useState(0)

  const [gameOver, setGameOver] = useState(false) // State Colision
  const [pause, setPause] = useState(false) // State Pause ou lettre
  const [isWin, setIsWin] = useState(false) // State victoire !!!

  const place = ['left', 'middle', 'right'] // Emplacement obstacles ou lettres
  const obstacle = [rocks, cat, tree, rocks, cat, tree, e] // Type obstacles

  const newTableauNumber = []

  useEffect(() => {
    let tableauNumber = [persos, persos, persos, persos, persos, persos]
    for (let i = 0; i < 6; i++) {
      const random = Math.floor(Math.random() * tableauNumber.length)
      const aEnlever = tableauNumber[random]
      newTableauNumber.push(aEnlever)
      tableauNumber = tableauNumber.filter((el) => el !== aEnlever)
    }
    setLetters(newTableauNumber)
  }, [])

  useEffect(() => {
    if (idNum === 6) {
      setGameOver(true)
    }
  }, [idNum])

  const newLetter = () => {
    setIdNum((idNum) => idNum + 1)
  }

  // *********** RAJOUTS OBSTACLES ALEATOIRES THOM YAN UP*****************

  const [newId, setNewId] = useState(0)

  // USE EFFECT WITH OBSTACLES
  useEffect(() => {
    let idObs = 0
    let randomPos = Math.floor(Math.random() * place.length)
    let randomObs = Math.floor(Math.random() * obstacle.length)
    if (!gameOver && !pause) {
      const interval = setInterval(() => {
        // console.log("letters", letters);

        const obs = document.getElementById('obstacle')
        const object = document.createElement('img')
        object.setAttribute('src', obstacle[randomObs])
        randomObs === 6
          ? object.setAttribute('alt', 'letter')
          : object.setAttribute('alt', 'rocks paper cisor')
        object.setAttribute('class', `obstacle ${place[randomPos]} obstacleDOM`)
        object.setAttribute('id', `obs${idObs}`)
        obs.appendChild(object)
        idObs += 1

        randomPos = Math.floor(Math.random() * place.length)
        randomObs = Math.floor(Math.random() * obstacle.length)
        // console.log("add", document.getElementById(`obs${idObs}`));
        // console.log("delete", document.getElementById(`obs${idObs - 1}`));
        const deletel = document.getElementById(`obs${idObs - 2}`)

        if (idObs !== 0 && idObs !== 1) {
          obs.removeChild(deletel)
        }
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [gameOver, pause])

  // USE EFFECT WITH LETTERS !!!!
  // useEffect(() => {
  //   let idObs = 0;
  //   if (!gameOver && !pause) {
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
  // }, [gameOver, pause, letters]);

  // *********** RAJOUTS THOM YAN DOWN*****************
  const [isLoading, setIsLoading] = useState(false)

  const [carPos, setCarPos] = useState(0)

  // const [obstacles, setObstacles] = useState([]); Récup les obstacles
  const [obstY, setobstY] = useState(-100)

  const [carX, setCarX] = useState(0)
  const [carY, setcarY] = useState(0)

  //Attend chargement de la page
  useEffect(() => {
    setIsLoading(true)
  }, [])

  // Rècupe coordonées voiture
  useEffect(() => {
    isLoading &&
      setcarY(document.getElementById('car').getBoundingClientRect().bottom)
  }, [isLoading])

  //Conditions collisions
  useEffect(() => {
    let newId = 0

    if (!gameOver && !pause) {
      const int = setInterval(() => {
        console.log(
          document.getElementsByClassName('obstacle')[0].getAttribute('alt')
        )

        let place = document
          .getElementsByClassName('obstacle')[0]
          .className.split(' ')[1]

        setobstY(
          document.getElementsByClassName('obstacle')[0].getBoundingClientRect()
        )
        console.log(
          document.getElementsByClassName('obstacle')[0].className.split(' ')[1]
        )
        if (obstY.bottom > carY - 150 && obstY.bottom < carY + 20) {
          //Check lettre
          if (
            document
              .getElementsByClassName('obstacle')[0]
              .getAttribute('alt') === 'letter'
          ) {
            if (
              (carX === -1 && place === 'left') ||
              (carX === 0 && place === 'middle') ||
              (carX === 1 && place === 'right')
            ) {
              console.log('lllllllleeeeeeeeeeeeeeeeeeeeeetttttttttttttttttree')
              setPause(true)
            }
          } else if (
            (carX === -1 && place === 'left') ||
            (carX === 0 && place === 'middle') ||
            (carX === 1 && place === 'right')
          ) {
            setGameOver(true)
          }
        }
      }, 10)
      const deux = setInterval(() => {
        newId++
      }, 2500)

      return () => {
        clearInterval(int)
        clearInterval(deux)
      }
    }
  }, [obstY, pause])

  // Déplacement voiture
  const setMove = (e) => {
    console.log('keyboardEvent', e)
    let car = document.getElementById('car')

    if (e.key === 'ArrowLeft' && carPos >= 0) {
      car.style.transform = `translateX(calc(${carPos - 230}px - 40%))`
      // car.style.transform = `translateX(calc(${carPos - decal}px - 50%))`;
      // setCarPos((carPos) => carPos - decal);
      setCarPos((carPos) => carPos - 230)
      setCarX((carX) => carX - 1)
    }
    if (e.key === 'ArrowRight' && carPos <= 0) {
      car.style.transform = `translateX(calc(${carPos + 230}px - 40%))`
      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
      setCarPos((carPos) => carPos + 230)
      setCarX((carX) => carX + 1)
    }
    if (e.key === 'ArrowDown') {
      // car.style.transform = "transform-origin: center";
      // car.style.transform = "rotate(0deg)";
      car.style.transform = `translateX(calc(${carPos}px - 40%)) rotate(360deg)`

      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
    }
    if (e.key === 'ArrowUp') {
      // car.style.transform = "transform-origin: center";
      car.style.transform = `translateX(calc(${carPos}px - 40%)) rotate(-360deg)`

      // car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`;
    }
  }

  useEffect(() => {
    console.log(document.getElementById('car').getBoundingClientRect())
  }, [carPos])

  // ANIMATION DU BACKGROUND et OBSTACLE

  let road = () =>
    document.getElementById('road').animate(
      [
        {
          backgroundPositionY: 0,
        },
        {
          backgroundPositionY: '1445px',
        },
      ],
      {
        duration: 3000,
        ease: 'linear',
        iterations: Infinity,
        forwards: true,
      }
    )
  useEffect(() => {
    if (!pause && !gameOver) {
      road()
    } else {
      road().pause()
      setPause(true)
    }
  }, [pause, gameOver])

  const launchNewGame = () => {
    setPause(false)
    setGameOver(false)
    setobstY(-100)
  }

  return (
    <>
      <div id='test' className='containerGrille'>
        <div
          className='grille'
          id='road'
          tabIndex='0'
          onKeyDown={(e) => setMove(e)}
        >
          {/* // *********** CLARA TOUCH SCREEN******************/}
          <div id='grilleLeft'></div>
          <div id='grilleRight'></div>

          {/* // *********** RAJOUTS THOM YAN UP******************/}
          {/* {letters && letters[idNum]} */}
          {!gameOver ? (
            <>
              <div onClick={() => newLetter()}>CLIQUE ICI</div>
              <div onClick={() => setPause(!pause)}>PAUSE</div>
            </>
          ) : (
            <div>Victoire</div>
          )}

          {/* // *********** RAJOUTS THOM YAN DOWN******************/}
          <img src={persos} id='car' alt='perso' className='perso' />
          {!pause && <div id='obstacle'></div>}
        </div>
        {gameOver && (
          <div className='gameOver'>
            <p>C'est perdu</p>
            <button onClick={() => launchNewGame()}>Relance la partie</button>
          </div>
        )}
      </div>
    </>
  )
}
