import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import generatorRoutes from "./routes/generator.route.js";
import sessionRoutes from './routes/sessions.js';
dotenv.config()


const app=express();
const PORT=process.env.PORT || 5000;


app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173"
}))

app.use("/api/auth",authRouter)
app.use('/api/generate', generatorRoutes);
app.use('/api/sessions', sessionRoutes); 

connectDB()


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

