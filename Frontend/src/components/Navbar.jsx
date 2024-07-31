import React from 'react'
import '../styles/navbar.css'
import {assets} from '../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {

  return (
    <div className='navbar'>
        <Link to={'/bionique'}>
          <img className='logo' src={assets.bionique_transparent} alt="logo" />
        </Link>
        <div className="user_opts">
            <button className='signin' >SignIn</button>
        </div>
    </div>
  )
}

export default Navbar