import React, { useEffect, useRef, useState } from 'react'
import '../styles/mainpage.css'
import Navbar from './Navbar'

const MainPage = () => {

  const textareaRef = useRef(null);
  const [value, setValue] = useState('');
  
  useEffect(() => {
    if(textareaRef.current){
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  },[value]);

  return (
    <div className='mainpage'>
        <Navbar />
        <div className="container">

          <div className="converter">
            
            <h1 className='convertor_title'>Bionic Reading</h1>
            <label htmlFor="textarea">Paste Your Text</label>
            <textarea ref={textareaRef} name="textarea" id="textarea" placeholder='Enter Your text here'></textarea>
            <div className="result">
              <p className='resultant'></p>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default MainPage