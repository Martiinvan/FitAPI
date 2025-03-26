import express from 'express';
import { registerUser,loginUser } from '../controllers/authController.js';
import { createRoutine, getRoutinesByUser, getRoutineById, updateRoutine, deleteRoutine } from '../controllers/routineController.js';
import { verifyToken } from '../middlewares/Auth.js';
import { verifyRole } from '../middlewares/verifyRole.js';

const router = express.Router();

//rutas publicas
router.post('/register', registerUser);
router.post('/login', loginUser);


router.use(verifyToken); // middleware para verificar el token de autenticacion


// r para administradores
router.post('/', verifyRole(['admin']), createRoutine);
router.put('/:id', verifyRole(['admin']), updateRoutine);
router.delete('/:id', verifyRole(['admin']), deleteRoutine);

// rutas para usuarios y administradores
router.get('/user/:userId', verifyRole(['admin', 'user']), getRoutinesByUser);
router.get('/:id', verifyRole(['admin', 'user']), getRoutineById);


export default router;