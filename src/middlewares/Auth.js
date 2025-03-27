import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;

        console.log("Authorization Header:", token); // Log del encabezado Authorization

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Log del token decodificado

        req.user = decoded;
        console.log("req.user:", req.user); // Log del objeto req.user

        next();
    } catch (err) {
        console.error("Token Verification Error:", err); // Log del error de verificación del token
        res.status(500).json({ error: err.message });
    }
};
