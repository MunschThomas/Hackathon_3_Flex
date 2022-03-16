import "./App.css";
import Loader from './Components/Loader.js';
import { Routes } from "react-router-dom";
import { useState, useEffect } from 'react'


import Game2 from "./Screens/Game2/Game2";

function App() {

  let [isLoaded, setIsLoaded] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(false)
    }, 0)
  }, [])

  return (
    <>
      {isLoaded === false ? (

    <div className="App">
      <header className="App-header"></header>
  
      <Game2/>

      <Routes></Routes>
    </div>) : (
    <Loader />
    )}
  </>
  )
}

export default App;
