import express from 'express';
import cors from 'cors';
import fs from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf.mjs'
import multer from 'multer';
import bionicConvertor from './utils/bionic_convert.js'

import mammoth from 'mammoth';
import HTMLtoDOCX from 'html-to-docx/dist/html-to-docx.umd.js';

import bodyParser from 'body-parser';

// import Docxtemplater from 'docxtemplater';
// import PizZip from 'pizzip';


const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json({limit:'50mb'}))
app.use(cors());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${Date.now()}-${file.originalname}`
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

app.get('/', (req, res) => {
    res.send("Server Working");
})

app.post('/upload/pdf', upload.single('file'), async (req, res) => {
    const file = req.file;
    const fileName = file.filename;
    console.log(fileName);
    const filePath = path.join(__dirname, 'uploads', fileName);
    const fileDataBuffer = fs.readFileSync(filePath);
    const fileData = new Uint8Array(fileDataBuffer);
    // console.log(file);
    
    const pdfDoc = PDFDocument.load(fileData);

    // Extracting Text from the Input Pdf file
    const pdf = await pdfjsLib.getDocument({data: fileData}).promise;
    let textContent = '';

    for(let i=1; i<=pdf.numPages; i++){
        const page = await pdf.getPage(i);
        const text = await page.getTextContent();
        console.log("Text", text);
        textContent += text.items.map(item => item.str).join(' ') + ' ';
    }
    // console.log(textContent);

    const bionicText = bionicConvertor(textContent);

    res.send(bionicText);

    fs.unlinkSync(filePath);
})

app.post('/upload/word', upload.single('file'), async (req, res) => {
  const file = req.file;
  const filePath = path.join(__dirname, 'uploads', file.filename);

  const result = await mammoth.convertToHtml({path: filePath});
  const html = result.value;

  res.send(html);

  fs.unlinkSync(filePath);
})

app.post('/download', async (req, res) => {
  const {docText, fileType} = req.body;

  const htmlString = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bionique</title>
  </head>
  <body>
  ${docText}
    </body>
</html>
`
    if(fileType==='word'){
      try{    
        const fileBuffer = await HTMLtoDOCX(htmlString, null, {
          table: { row: { cantSplit: true } },
          footer: true,
          pageNumber: true,
        });
        
        res.setHeader('Content-Dispositon', 'attachment; filename=document.docx');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
        res.send(fileBuffer);
      }
      catch(err){
        console.log(err);
      }
    }
    else if(fileType==='pdf'){

    }
})

app.listen(port, () => {
    console.log(`Server is Live on Port ${port}`);
})