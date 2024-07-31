import React, { useEffect, useRef, useState } from 'react'
import '../styles/mainpage.css'
import Navbar from './Navbar'

const MainPage = () => {

  const textareaRef = useRef(null);
  const [value, setValue] = useState('');

  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  useEffect(() => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight+'px';
  },[value]);

  const convert = (e) => {
    let input = e.target.value;
    return input.split(' ').map(word => {
      const midPoint = Math.ceil(word.length/2);
      const firstHalf = word.substring(0, midPoint);
      const secondHalf = word.substring(midPoint);

      return `<b>${firstHalf}</b>${secondHalf}`;
    }).join(' ');
  }

  return (
    <div className='mainpage'>
        <Navbar />
        <div className="mainpage_container">

          <div className="convertor">
            
            <h1 className='convertor_title'>Bionic Reading</h1>
            <div className="bionic_convertor">
              <label className='label' htmlFor="textarea">Paste Your Text</label>
              <textarea onChange={handleChange} ref={textareaRef} name="textarea" id="textarea" placeholder='Enter Your text here'></textarea>
              <button onClick={convert} className='submit' >Convert</button>
              <div className="result">
                <p className='resultant'></p>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default MainPage