// import dataQuestions from '../assets/fondamentaux.json'
import { useEffect, useState } from 'react'
import './ModalQ.css'

const ModalQ = ({ dataQuestion, setDataQuestion }) => {
  const [isAsked, setIsAsked] = useState([])
  const [clk, setClk] = useState(false)

  const [answerCorrect, setAnswerCorrect] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const handleListItemClick = (event) => {
    console.log('CONTENT', event.target.textContent)
    setSelectedAnswer(event.target.textContent)
    if (event.target.textContent === isAsked.reponse) {
      const showTrue = document.getElementById('correctAnswerReavel')
      showTrue.style.visibility = 'visible'
    } else {
      const showTrue = document.getElementById('wrongAnswerReavel')
      showTrue.style.visibility = 'visible'
    }
  }
  useEffect(() => {
    const quest = Math.floor(Math.random() * dataQuestion.length)

    console.log(dataQuestion)

    const chosenQuest = dataQuestion.filter(
      (dataQuestion) => dataQuestion.id === quest
    )
    const newTab = dataQuestion.filter((el) => el.id !== chosenQuest[0].id)
    console.log('newTab', newTab)
    setDataQuestion(newTab)
    setIsAsked(...chosenQuest)
  }, [clk])

  useEffect(() => {
    console.log('in use effext', dataQuestion)
  }, [dataQuestion])

  return (
    <div className='wrapper'>
      <div className='wrapQuest'>
        <h1>{isAsked.question}</h1>
        <div className='AnswerButton'>
          <button onClick={handleListItemClick}>Vrai</button>
          <button onClick={handleListItemClick}>Faux</button>
        </div>
        <div className='ReavelCorrect'>
          <div id='correctAnswerReavel' className='AnswerReavel'>
            <h2>Bravo</h2>
          </div>
          <div id='wrongAnswerReavel' className='AnswerReavel'>
            <h2>Oh oh, {isAsked.correction}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalQ
