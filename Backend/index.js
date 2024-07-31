import express from 'express';
import env from 'dotenv';
import connectDB from './config/mongodb.js';
import cors from 'cors'

const app = express();
const port = process.env.PORT;
env.config();
connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello")
});

app.listen(port, ()=> {
    console.log(`Server is live on port ${port}`);
})