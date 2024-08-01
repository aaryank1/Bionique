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

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = process.env.PORT || 3000;
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
    console.log(textContent);

    const bionicText = bionicConvertor(textContent);
    // console.log(bionicText);

    res.send(bionicText);

    // const result = await PDFDocument.create();
    // const page = result.addPage([600,400]);
    // page.drawText(bionicText, {
    //     x: 30,
    //     y: 350,
    //     size: 14
    // });

    // const pdfBytes = await result.save();

    // const newFilePath = path.join(__dirname, 'uploads', `bionic_${req.file.filename}`);
    // fs.writeFileSync(newFilePath, pdfBytes);


    // res.download(newFilePath, `bionic_${req.file.filename}.pdf`, (err) => {
    //     console.error(err);
    //     res.status(500).send('Server Error');
    // })

    fs.unlinkSync(filePath);
    // fs.unlinkSync(newFilePath);

    // console.log(pdf);
    // res.send("All Ok");
})


app.listen(port, () => {
    console.log(`Server is Live on Port ${port}`);
})