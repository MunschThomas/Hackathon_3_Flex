import React from 'react'
import Login from '../components/Login'
import './styles/Home.css'
import background from '../assets/HomeBG.jpeg'
import Logo from '../assets/logo_white.png'

export default function Home() {
  return (
    <div className='Home' style={{ backgroundImage: `url(${background})` }}>
      <div className='imgContainerHome'>
        <img src={Logo} alt='logo Enedis'></img>
      </div>
      <Login />
    </div>
  )
}
