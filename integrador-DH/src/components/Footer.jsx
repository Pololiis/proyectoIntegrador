import React from 'react'
import '../styles/footer.css'
import logo from '../assets/logo.png'

export default function Footer() {
  return (
    <footer>
      <div className='flex align-left justify-left'>
      <img src={logo} alt="logo"/>
      </div>
      <div className='flex justify-flex-start'>
      <p>&copy; 2024 gameShare. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
