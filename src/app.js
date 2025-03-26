import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import helmet from 'helmet';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import routineRoutes from './routes/routineRoutes.js'; 

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/routines', routineRoutes); // Monta el enrutador de rutinas

app.get('/', (req, res) => {
    res.send('🏋️‍♂️ FitAPI');
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});