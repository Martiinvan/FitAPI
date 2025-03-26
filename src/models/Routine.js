import mongoose from "mongoose";

//definimos la estrucutra de un ejercicio individual
const excerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    sets: {
        type: Number,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    rest: {
        type: Number,
        required: true,
    },
});

//definimos la estructura de un dia de la rutina
const daySchema = new mongoose.Schema({
    day: { type: String, required: true },
    focus: { type: String, required: true },
    exercises: [excerciseSchema]
});


//estructura de la rutina principal
const routineSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    days: [daySchema],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Routine = mongoose.model('Routine', routineSchema);

export default Routine;