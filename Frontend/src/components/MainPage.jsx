import React, { useEffect, useRef, useState } from 'react'
import '../styles/mainpage.css'
import Navbar from './Navbar'
import { convert } from '../utils/bionicTextConversion'
import { assets } from '../assets/assets'

const MainPage = () => {

  const textareaRef = useRef(null);
  const resultRef = useRef(null)
  const [val, setVal] = useState('');
  const [highlited, setHighlighted] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');


  const handleChange = (e) => {
    setVal(e.target.value);
  }
  
  useEffect(() => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight+'px';
  },[val]);

  const handleSubmit = ()=> {
    if(val===''){
      setHighlighted('');
      return;
    }
    const bionic_text = convert(val);
    setHighlighted(bionic_text);
  }

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if(uploadedFile){
      setFile(uploadedFile);
      setFileType(uploadedFile.type);
    }
  }

  const renderImage = ()=>{
    switch(fileType){
      case 'application/pdf':
        return <img className='doc_img' src={assets.pdf} alt="pdf" />
      case 'application/msword':
        return <img className='doc_img' src={assets.word} alt="word" />
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <img className='doc_img' src={assets.word} alt="word" />

      default:
        return <p>Unsupported File Format</p>
    }
  }

  const handleFormSubmit = () => {
    
  }

  return (
    <div className='mainpage'>
        <Navbar />
        <div className="mainpage_container">

          <div className="convertor">
            
            <h1 className='convertor_title'>Bionic Reading</h1>
            <div className="bionic_convertor">
              <label className='label' htmlFor="textarea">Paste Your Text</label>
              <textarea onChange={handleChange} ref={textareaRef} value={val} name="textarea" id="textarea" placeholder='Enter Your text here'></textarea>
              <button onClick={handleSubmit} className='submit' >Convert</button>
              {highlited && <div ref={resultRef} className="result" dangerouslySetInnerHTML={{__html: highlited}}>
              </div>} 
            </div>
          </div>

          <div className="convertor">
            <h1>Convert Document</h1>
            <div className="doc_convertor">
              <form onSubmit={handleFormSubmit} className='doc_conv_form' action="" method="post">
                <label htmlFor="doc">Select a Document Format</label>
                <select className='doc_opts' name="doc_format" id="doc" defaultValue={"Select"}>
                  <option value="Select">Select</option>
                  <option value="Word">Word</option>
                  <option value="pdf">pdf</option>
                </select>

                <input onChange={handleFileChange} type='file' name='document' accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'/>

                {file && renderImage()}

                <button className='doc_submit' type="submit">Submit</button>
              </form>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default MainPage