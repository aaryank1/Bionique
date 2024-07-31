import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb } from 'pdf-lib';
import upload from '../middleware/multer.js'

const bionic_convert = (input)=>{
    return input.split(' ').map(word => {
        const midPoint = Math.ceil(word.length/2);
        const firstHalf = word.substring(0, midPoint);
        const secondHalf = word.substring(midPoint);

        return `<b>${firstHalf}</b>${secondHalf}`
    }).join(' ');
}

const convertPdf = async (req, res) => {
    const file = req.file;
    const filePath = join(__dirname + file.path);
    const existingPdfbytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(existingPdfbytes)

    const pages = pdfDoc.getPages();
    pages.forEach((page) => {
        
    })
}

export default convertPdf