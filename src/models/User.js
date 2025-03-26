import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
}, {
    timestamps: true, // agrega campos createdAt y updatedAt
});

// middleware para encriptar la contraseña
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { // si no se ha modificado la contraseña no se encripta
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (error) {
        return next(error);
    }
})

const User = mongoose.model('User', userSchema);

export default User;