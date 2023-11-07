const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movieroutes");

const app = express();
app.use(express.json(), cors());
dotenv.config();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

connectDB();

app.use('/api', movieRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is Up and Running on Port: ${PORT}`));
