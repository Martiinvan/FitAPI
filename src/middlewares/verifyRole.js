export const verifyRole = (roles) => {
    return (req, res, next) => {
        try {
            if (!roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'No tienes permisos para esta acción' });
            }

            next();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };
};