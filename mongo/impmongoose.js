const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^\S+@\S+\.\S+$/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    name: { type: String, required: true }
});

const Todo = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    dueDate: Date,
    userId: { type: ObjectId, ref: "users", required: true }
}, { timestamps: true }); // Adds createdAt and updatedAt

const UserModel = mongoose.model('users', User);
const TodoModel = mongoose.model('todos', Todo);

module.exports = {
    UserModel,
    TodoModel
};
