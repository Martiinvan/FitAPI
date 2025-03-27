import express from 'express';
import { 
    createRoutine, 
    getRoutinesByUser, 
    getRoutineById, 
    updateRoutine, 
    deleteRoutine 
} from '../controllers/routineController.js';
import { verifyToken } from '../middlewares/Auth.js';
import { verifyRole } from '../middlewares/verifyRole.js';

const router = express.Router();

router.use(verifyToken); // Middleware para verificar el token de autenticación

// Rutas para administradores
router.post('/', verifyRole(['admin']), createRoutine);
router.put('/:id', verifyRole(['admin']), updateRoutine);
router.delete('/:id', verifyRole(['admin']), deleteRoutine);

// Rutas para usuarios y administradores
router.get('/user/:userId', verifyRole(['admin', 'user']), getRoutinesByUser);
router.get('/:id', verifyRole(['admin', 'user']), getRoutineById);

export default router;
