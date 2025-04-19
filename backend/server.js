import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js'; 
import uploadRoutes from './routes/upload.routes.js'; // Assuming you have upload routes in the same file
import {connectDB} from './lib/db.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/upload", uploadRoutes) // Assuming you have user routes in the same file

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});