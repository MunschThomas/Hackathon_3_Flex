import { useEffect, useState, useRef } from 'react'
import './ModalQ.css'

const ModalQ = ({
  pause,
  dataQuestion,
  setDataQuestion,
  launchNewGame,
  rightAnswer,
  setRightAnswer,
}) => {
  const focus1 = useRef(null)
  const [isAsked, setIsAsked] = useState([])
  const [clk, setClk] = useState(false)

  // const onFoc = () => {
  //   focus.current.focus()

  // }

  const [answerCorrect, setAnswerCorrect] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [clrModal,  setClrModal] = useState(0)

  const checkKey = (choice) => {
    focus1.current.focus()
    setSelectedAnswer(choice)
    if (choice === isAsked.reponse) {
      const showTrue = document.getElementById('correctAnswerReavel')
      showTrue.style.visibility = 'visible'
      setRightAnswer((rightAnswer) => rightAnswer + 1)
      setClrModal(1)
    } else {
      const showTrue = document.getElementById('wrongAnswerReavel')
      showTrue.style.visibility = 'visible'
      setClrModal(2)
    }
  }
  const launch = (e) => {
    console.log('keyboardEvent', e)
    // let wrapper = document.getElementById("wrapper");

    if (e.key === ' ') {
      launchNewGame()
    }
    if (e.key === 'ArrowLeft') {
      checkKey('Vrai')
      console.log('efefef')
    }
    if (e.key === 'ArrowRight') {
      checkKey('Faux')
    }
  }

  useEffect(() => {
    console.log(rightAnswer)
  }, [rightAnswer])

  const handleListItemClick = (event) => {
    console.log('CONTENT', event.target.textContent)
    setSelectedAnswer(event.target.textContent)
    if (event.target.textContent === isAsked.reponse) {
      const showTrue = document.getElementById('correctAnswerReavel')
      showTrue.style.visibility = 'visible'
      setRightAnswer((rightAnswer) => rightAnswer + 1)
      setClrModal(1)
    } else {
      const showTrue = document.getElementById('wrongAnswerReavel')
      showTrue.style.visibility = 'visible'
      setClrModal(2)
    }
  }
  useEffect(() => {
    const quest = Math.floor(Math.random() * dataQuestion.length)

    console.log('dataQuestion', dataQuestion, 'quest', quest)
    const chosenQuest = dataQuestion.filter((dataQuestion, i) => i === quest)

    const newTab = dataQuestion.filter((el) => el.id !== chosenQuest[0].id)
    console.log('newTab', newTab)
    setDataQuestion(newTab)
    setIsAsked(...chosenQuest)
  }, [clk])

  useEffect(() => {
    console.log('in use effext', dataQuestion)
  }, [dataQuestion])

  return (
    <div
      
      className='wrapper2'
      // id='wrapper'
      tabIndex='0'
      onKeyDown={(e) => launch(e)}
    >
      <div className={`wrapQuest ${(clrModal === 1)  ? "modalWin" : ((clrModal === 2) ? "modalLoose" : "")}`} >
        <h1>Question :</h1>
        <h2>{isAsked.question}</h2>
        <div className='AnswerButton'>
          <button className="btnVert" onClick={(e) => handleListItemClick(e)}>Vrai</button>
          <button className="btnRouge" onClick={(e) => handleListItemClick(e)}>Faux</button>
        </div>
        <div className='ReavelCorrect'>
          <div id='correctAnswerReavel' className='AnswerReavel'>
            <h2>Bravo</h2>
          </div>
          <div id='wrongAnswerReavel' className='AnswerReavel'>
            <h2>Oh oh, {isAsked.correction}</h2>
          </div>
          <button
            className={selectedAnswer ? `visible` : `hidden`}
            onClick={() => launchNewGame()}
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalQ
