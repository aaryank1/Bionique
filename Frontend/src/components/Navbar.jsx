import React from 'react'
import '../styles/navbar.css'
import {assets} from '../assets/assets'

const Navbar = () => {

  return (
    <div className='navbar'>
        <img className='logo' src={assets.bionique_transparent} alt="logo" />
        <div className="user_opts">
            <button className='signin' >SignIn</button>
        </div>
    </div>
  )
}

export default Navbar