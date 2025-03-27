import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Rutas públicas de autenticación
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
