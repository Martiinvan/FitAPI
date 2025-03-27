import Routine from "../models/Routine.js";

export const createRoutine = async (req, res) => {
    try {
        const { user, days } = req.body;

        const newRoutine = new Routine({
            user,
            days
        });

        const savedRoutine = await newRoutine.save();

        res.status(201).json({
            message: 'Routine created successfully',
            routine: savedRoutine
        });
    } catch (error) {
        console.error('Error creating routine:', error);
        res.status(500).json({ message: error.message });
    }
};

// actualizar una rutina
export const updateRoutine = async (req, res) => {
    try {
        const { id } = req.params;
        const { days } = req.body;

        const updatedRoutine = await Routine.findByIdAndUpdate(id, { days, updatedAt: Date.now() }, { new: true });

        if (!updatedRoutine) {
            return res.status(404).json({ message: 'Routine not found' });
        }

        res.status(200).json({
            message: 'Routine updated successfully',
            routine: updatedRoutine
        });
    } catch (error) {
        console.error('Error updating routine:', error);
        res.status(500).json({ message: error.message });
    }
};

//obtener una rutina de un usuario
export const getRoutinesByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        if (req.user && req.user.role === 'admin') {
            // Los administradores pueden acceder a las rutinas de cualquier usuario
            const routines = await Routine.find({ user: userId });
            res.status(200).json(routines);
        } else if (req.user && req.user._id.toString() === userId) {
            // Los usuarios normales solo pueden acceder a sus propias rutinas
            const routines = await Routine.find({ user: req.user._id });
            res.status(200).json(routines);
        } else {
            res.status(403).json({ message: 'No tienes permisos para ver las rutinas de este usuario.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// obetener rutina por ID
export const getRoutineById = async (req, res) => {
    try {
        const { id } = req.params;

        const routine = await Routine.findById(id);

        if (!routine) {
            return res.status(404).json({ message: 'Routine not found' });
        }

        res.json({
            message: 'Routine found successfully',
            routine: routine
        });
    } catch (error) {
        console.error('Error getting routine:', error);
        res.status(500).json({ message: error.message });
    }
}

//eliminar rutina
export const deleteRoutine = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedRoutine = await Routine.findByIdAndDelete(id);

        if (!deletedRoutine) {
            return res.status(404).json({ message: 'Routine not found' });
        }

        res.json({
            message: 'Routine deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting routine:', error);
        res.status(500).json({ message: error.message });
    }
}