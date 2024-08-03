import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import '../styles/mainpage.css'
import Navbar from './Navbar'
import { convert } from '../utils/bionicTextConversion'
import { assets } from '../assets/assets'
import { toast } from 'react-toastify'

const url = 'http://localhost:3000'
const MainPage = () => {
  const [docText, setDocText] = useState('');
  const textareaRef = useRef(null);
  const resultRef = useRef(null)
  const [val, setVal] = useState("");
  const [highlited, setHighlighted] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setVal(e.target.value);
  }
  
  useEffect(() => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = textareaRef.current.scrollHeight+'px';
  },[val]);

  function updateHtmlWithBionicText(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    doc.body.querySelectorAll('*').forEach(el => {
      el.childNodes.forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
          const originalText = child.nodeValue;
          const bionicText = convert(originalText);
          const span = document.createElement('span');
          span.innerHTML = bionicText;
          el.replaceChild(span, child);
        }
      });
    });
  
    return doc.body.innerHTML;
  }

  const handleSubmit = ()=> {
    if(val===''){
      setHighlighted('');
      return;
    }
    const bionic_text = convert(val);
    setHighlighted(bionic_text);
    // console.log(highlited);
    
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const formData = new FormData();
      formData.append('file', file)
      // formData.append('filetype', fileType)

      if(fileType=== 'application/pdf'){
        // setFileType('pdf')
        setLoading(true);
        const response = await axios.post(`${url}/upload/pdf`, formData, {
          headers: {
            'Content-Type' : 'multipart/form/data',
          }
        });
        
        let finalpdf = updateHtmlWithBionicText(response.data);
        setDocText(finalpdf);
        setLoading(false);

      }
      else if(fileType=== 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
        // setFileType('word');
        setLoading(true);
        const response = await axios.post(`${url}/upload/word`, formData, {
          headers:{
            "Content-Type": "multipart/form/data",
          }
        })
        // console.log(response);
        let finalDoc = updateHtmlWithBionicText(response.data);
        // console.log(finalDoc);
        
        
        setDocText(finalDoc);
        setLoading(false);
      }
       
    }
    catch(error){
      console.log(error);
    }
  }

  const handleDownload = async () => {
    // console.log(docText);
    
    if(fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      try{
        setLoading(true);
        const response = await axios.post(`${url}/download`, {docText, fileType}, {
          headers: {
            'Content-Type' : 'application/json'
          },
          responseType: 'blob'
        });
        setLoading(false);
  
        const docUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = docUrl;
        link.setAttribute('download', 'document.docx');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      catch(error){
        console.log("Error Downloading File", error);
      }
    }
    else{
      try{
        setLoading(true);
        const response = await axios.post(`${url}/download`, {docText, fileType}, {
          headers: {
            'Content-Type' : 'application/json'
          },
          responseType: 'blob'
        });
        setLoading(false);
  
        const docUrl = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = docUrl;
        link.setAttribute('download', 'document.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
      catch(error){
        console.log("Error Downloading File", error);
      }
    }
  }

  return (
    <div className='mainpage'>
        <Navbar />
        <div className="mainpage_container">

          <div className="convertor bionic">
            
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
              <form onSubmit={handleFormSubmit} className='doc_conv_form' action="" method="post" encType='multipart/form-data'>
                <label htmlFor="doc">Upload a PDF or Word File</label>

                <div className="inp_dwn_container">
                  <input onChange={(e) => {setFile(e.target.files[0]); setFileType(e.target.files[0].type)}} type='file' id='doc' name='document' accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'/>
                  {docText && <img onClick={handleDownload} className='download_icon' src={assets.download} alt="dwnld" />}
                </div>

                {file && renderImage()}

                {loading ?
                 (<div className='loading'>
                  <div className="load"></div>
                 </div>)
                 : 
                 (docText && <div ref={resultRef} className="result" dangerouslySetInnerHTML={{__html: docText}}></div>)
                } 

                <button className='doc_submit' type="submit">Submit</button>
              </form>
            </div>
          </div>
          
        </div>
    </div>
  )
}

export default MainPage