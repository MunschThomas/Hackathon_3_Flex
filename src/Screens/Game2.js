import React, { useState, useEffect } from 'react'
import './Game2.css'
import rocks from '../assets/obstacle1.png'
import tree from '../assets/obstacle2.png'
import cat from '../assets/obstacle3.png'
import persos from '../assets/persos.png'
import { useAuth0 } from '@auth0/auth0-react'

export default function Game2(props) {
  const decal = window.innerWidth / 4.5
  const { user } = useAuth0()

  const [inGame, setIngame] = useState(true)

  const place = ['left', 'middle', 'right']
  const obstacle = [rocks, cat, tree]

  const [carPos, setCarPos] = useState(0)
  const [carX, setCarX] = useState(0)

  const [obstacles, setObstacles] = useState([]) //Récup les obstacles
  const [isLoading, setIsLoading] = useState(false)

  const setMove = (e) => {
    console.log('keyboardEvent', e)
    let car = document.getElementById('car')
    if (e.key === 'ArrowLeft' && carPos >= 0) {
      // car.style.transform = `translateX(${carPos - 150}px)`;
      car.style.transform = `translateX(calc(${carPos - decal}px - 50%))`
      // setCarPos((carPos) => carPos - decal);
      setCarPos((carPos) => carPos - decal)
      setCarX((carX) => carX - 1)
    }
    if (e.key === 'ArrowRight' && carPos <= 0) {
      // car.style.transform = `translateX(${carPos + 150}px)`;
      car.style.transform = `translateX(calc(${carPos + decal}px - 50%))`
      setCarPos((carPos) => carPos + decal)
      setCarX((carX) => carX + 1)
    }
  }

  const [obstY, setobstY] = useState(-100)
  const [carY, setcarY] = useState(0)

  useEffect(() => {
    setIsLoading(true)
  }, [])

  useEffect(() => {
    isLoading &&
      setcarY(document.getElementById('car').getBoundingClientRect().bottom)
  }, [isLoading])

  useEffect(() => {
    const int = setInterval(() => {
      setobstY(document.getElementById('cat').getBoundingClientRect())
      if (obstY.bottom > carY - 150) {
        if (
          carX === -1 &&
          document.getElementById('cat').className.split(' ')[1] === 'left'
        ) {
          setIngame(false)
        }
        if (
          carX === 0 &&
          document.getElementById('cat').className.split(' ')[1] === 'middle'
        ) {
          setIngame(false)
        }
        if (
          carX === 1 &&
          document.getElementById('cat').className.split(' ')[1] === 'right'
        ) {
          setIngame(false)
        }
      }
    }, 10)

    return () => clearInterval(int)
  }, [obstY])

  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */
  // ************A RAJOUTER POUR LE GAIN DE POINT **********

  let gainDePoint = () => {
    let oldScore = localStorage.getItem(user.name)
    let newScore = oldScore * 1 + 1
    localStorage.setItem(user.name, newScore)
  }

  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */
  //********************************* */

  return (
    <>
      <div className='containerGrille'>
        <div
          className='grille'
          id='road'
          tabIndex='0'
          onKeyDown={(e) => setMove(e)}
        >
          <div onClick={() => gainDePoint()}>Clique ici</div>

          <img src={persos} id='car' alt='perso' className='perso' />
          {inGame && (
            <div>
              <img
                src={obstacle[0]}
                alt='rocks'
                className={`obstacle ${place[0]}`}
              />
              <img
                id='cat'
                src={obstacle[1]}
                alt='cat'
                className={`obstacle ${place[1]}`}
              />
              <img
                src={obstacle[2]}
                alt='tree'
                className={`obstacle ${place[2]}`}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
