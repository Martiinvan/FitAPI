
import User from '../models/User.js';

export const verifyRole = (roles) => {
    return async (req, res, next) => {
        try {
            const user = await User.findById(req.userId);

            if (!user || !roles.includes(user.role)) {
                return res.status(403).json({ message: 'No tienes permisos para esta acción' });
            }

            next();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
};