import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import moongoose from 'mongoose';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const start = async () => {
    const connectDB = await moongoose.connect("mongodb+srv://jhaprabhakar_db_user:TxTnLKF3N8D0ayUF@connectcluster.tvtssij.mongodb.net/?appName=ConnectCluster");
    app.listen(9080, () => {
        console.log("Server is running on port 9080");
    });
};
   

start();
