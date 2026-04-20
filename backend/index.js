import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/users.js';
import { connectDB } from './database/db.js';

const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
};

dotenv.config();

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

const startServer = async () => {
  const db = await connectDB();

  // Middleware para pasar db a las rutas
  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  // Rutas
  app.use('/users', userRoutes);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  });
};

startServer();