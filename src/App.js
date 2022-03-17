import './App.css'
import { Routes } from 'react-router-dom'
import datasFondamentaux from './assets/fondamentaux.json'
import { useState, useEffect } from 'react'
import Revision from './Screens/Revision'
import Game3 from './Screens/Game3'

function App() {
  const [dataQuestion, setDataQuestion] = useState(datasFondamentaux)
  return (
    <>
      <div className='App'>
        <header className='App-header'></header>
        {/* <Game3 /> */}
        <Revision
          dataQuestion={dataQuestion}
          setDataQuestion={setDataQuestion}
        />

        <Routes></Routes>
      </div>
    </>
  )
}

export default App
