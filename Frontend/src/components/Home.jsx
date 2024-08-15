import React from 'react'
import '../styles/home.css'
import { useNavigate } from 'react-router-dom'
import { convert } from '../utils/bionicTextConversion'

const Home = () => {

  const desc_text = 'Bionic Reading is a new method facilitating the reading process by guiding the eyes through text with artificial fixation points As a result, the reader is only focusing on the highlighted initial letters and lets the brain center complete the word. In a digital world dominated by shallow forms of reading, Bionic Reading aims to encourage a more in-depth reading and understanding of written content.'
  const desc = convert(desc_text);

  const navigate = useNavigate();
  return (
    <div className='homepage'>
        <div className="homepage_container">
          <h1 className='homepage_title'>Welcome to Bionique</h1>
          <p className='bionic_reading' dangerouslySetInnerHTML={{__html: desc}}></p>
          <button onClick={()=>navigate('/bionique')} className='start_app'>Get Started</button>
        </div>
    </div>
  )
}

export default Home