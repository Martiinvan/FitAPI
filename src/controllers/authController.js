import user from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
}
export const registerUser = async (req, res) => {
    try {
        const { username, email, password,role } = req.body;

        const newUser = new user({
            username,
            email,
            password,
            role
        });

        const savedUser = await newUser.save();

        const token = generateToken(savedUser._id);
        res.status(201).json({ user: savedUser, token});
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.status(401).json({ message: 'credentials invalid' });
        }

        const passwordMatch = await bcrypt.compare(password, foundUser.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'credentials invalid' });
        }

        const token = generateToken(foundUser._id);

        res.json({user: foundUser, token });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: error.message });
    }
}