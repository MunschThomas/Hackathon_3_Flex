import './App.css'

import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Home from './screens/Home'
import Profil from './screens/Profil'
import Game from './screens/Game'
import Revisions from './screens/Revisions'
import Loading from './assets/loading.gif'
import routeFina from './assets/routeFina.png'
import routeOffice from './assets/routeOffice.png'

function App() {
  const [loading, setLoading] = useState(true)
  const { user, isLoading, isAuthenticated } = useAuth0()
  const [score, setScore] = useState(0)
  const [chooseGame, setChooseGame] = useState()

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      console.log('test')
      let users = localStorage.getItem(user.name)
      if (!users) {
        localStorage.setItem(user.name, score)
      } else {
        setScore(users)
      }
    }
  }, [chooseGame, score, loading])

  if (loading) {
    return (
      <div className='loadingContainer'>
        <img src={Loading} alt='loading' className='loading'></img>
      </div>
    )
  }
  return isAuthenticated ? (
    <div className='App'>
      <Routes>
        <Route
          path='/'
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
          path='/Profil'
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
          path='Profil/game'
          element={
            <Game
              score={score}
              setScore={setScore}
              chooseGame={chooseGame}
              routeOffice={routeOffice}
              routeFina={routeFina}
            />
          }
        ></Route>
        <Route
          path='game'
          element={
            <Game
              score={score}
              setScore={setScore}
              chooseGame={chooseGame}
              routeOffice={routeOffice}
              routeFina={routeFina}
            />
          }
        ></Route>
        <Route path='Profil/revisions' element={<Revisions />}></Route>
        <Route path='revisions' element={<Revisions />}></Route>
      </Routes>
    </div>
  ) : (
    <>
      <Routes>
        <Route path='/' element={<Home />}></Route>
      </Routes>
    </>
  )
}

export default App
