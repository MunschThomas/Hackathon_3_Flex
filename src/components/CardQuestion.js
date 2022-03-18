import React from 'react'

function CardQuestion(props) {
  return (
    <>
      <div className='imgContainer'>
        <img src={props.image} alt={props.question}></img>
      </div>
      <div className='detailContainer'>
        <p>{props.question}</p>
      </div>
    </>
  )
}

export default CardQuestion
