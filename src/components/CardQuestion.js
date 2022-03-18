import React from 'react'
import { useState } from 'react'
function CardQuestion({
  id,
  question,
  image,
  reponse,
  correction,
  setisVisible,
  isVisible,
}) {
  return (
    <>
      <div className='imgContainer'>
        <img src={image} alt={question}></img>
      </div>
      <div className='detailContainer'>
        <h3>{question}</h3>
        <button onClick={() => setisVisible(true)} className='buttonNextA'>
          Réponse
        </button>
        <h3 className={`reponseRivision ${isVisible ? `visible` : `hidden`}`}>
          {correction}
        </h3>
      </div>
    </>
  )
}

export default CardQuestion
