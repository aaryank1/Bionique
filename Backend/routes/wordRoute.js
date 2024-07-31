import express from 'express';
import convertWord from '../controllers/wordConvert';

const wordRouter = express.Router();

wordRouter.post('/convert/word', convertWord)

export default wordRouter;