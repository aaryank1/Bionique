import express from 'express';
import cors from 'cors';
import fs from 'fs'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

import pdf2html from 'pdf2html';
import puppeteer from 'puppeteer';

import mammoth from 'mammoth';
import HTMLtoDOCX from 'html-to-docx/dist/html-to-docx.umd.js';

import bodyParser from 'body-parser';

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
    const filePath = path.join(__dirname, 'uploads', file.filename);
    const html = await pdf2html.html(filePath);
    
    // console.log(html);
    
    res.send(html);
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

  if(fileType==='application/msword' || fileType=== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ){
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
      try{
        const fileBuffer = await HTMLtoDOCX(htmlString, null, {
          table: { row: { cantSplit: true } },
          font: 'Verdana',
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
    else if(fileType==='application/pdf'){
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setContent(docText);

        res.setHeader('Content-Disposition', 'attachment; filename=document.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        const fileBuffer = await page.pdf({format: 'A4'});

        await browser.close();

        res.send(fileBuffer);

      } catch (error) {
        console.log(error);
      }
    }
})

app.listen(port, () => {
    console.log(`Server is Live on Port ${port}`);
})