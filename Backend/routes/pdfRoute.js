import express from 'express'
import convertPdf from '../controllers/pdfConvert';
import upload from '../middleware/multer';


const pdfRouter = express.Router()

pdfRouter.post('/convert/pdf', upload.single('document'), convertPdf);

export default pdfRouter;