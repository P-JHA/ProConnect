import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
    const connectDB = await moongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    app.listen(9080, () => {
        console.log("Server is running on port 9080");
    });
};


start();
