import React from 'react'
import Logout from '../components/Logout'
import Logo from '../assets/logo_blue.png'
import dataQuestions from '../assets/fondamentaux.json'
import CardQuestion from '../components/CardQuestion'
import { useAuth0 } from '@auth0/auth0-react'
import { Link } from 'react-router-dom'

function Revisions(props) {
  const { user } = useAuth0()
  return (
    <>
      <div className='holderContainer'>
        <div className='imgContainerProfil'>
          <Link to='../Profil'>
            <img src={Logo} alt='logo Enedis'></img>
          </Link>
          <div className='logOut'>
            <Logout />
          </div>
          <div className='infoContainer'>
            <img src={user.picture} alt={user.name}></img>
            <p className='profilName'>{user.name}</p>
          </div>
        </div>
      </div>
      <div className='questionContainer'>
        {dataQuestions.map((el, id) => (
          <CardQuestion
            key={id}
            id={el.id}
            question={el.question}
            image={el.image}
          />
        ))}
      </div>
    </>
  )
}

export default Revisions
