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
  
      console.log('req.user:', req.user); // Log del objeto req.user
      console.log('req.params:', req.params); // Log de los parámetros de la ruta
  
      if (!req.user) { // Verificación adicional para asegurar que req.user esté definido
        return res.status(401).json({ message: 'Unauthorized' });
      }
      if (req.user.role === 'admin') {
        const routines = await Routine.find({ user: userId });
        console.log('Routines (admin):', routines);
        res.status(200).json(routines);
      } else if (req.user.userId.toString() === userId) {
        const routines = await Routine.find({ user: req.user._id });
        console.log('Routines (user):', routines);
        res.status(200).json(routines);
      } else {
        res.status(403).json({ message: 'No tienes permisos para ver las rutinas de este usuario.' });
      }
    } catch (error) {
      console.error('Error getting routines:', error);
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