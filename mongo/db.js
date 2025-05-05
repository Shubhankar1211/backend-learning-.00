const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.ObjectId

const User = new Schema({
    email: { type: String, unique: true },
    password: String,
    name: String
})

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId
})


const UserModel = mongoose.model('users', User)
const TodoModel = mongoose.model('todos', Todo)

module.exports = {
    UserModel: UserModel,
    TodoModel: TodoModel
}


/*
const mongoose = require("mongoose");
const { Schema } = mongoose;

// User Schema
const UserSchema = new Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true }
}, { timestamps: true });

// Todo Schema
const TodoSchema = new Schema({
    title: { type: String, required: true },
    done: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

// Models
const UserModel = mongoose.model('User', UserSchema);
const TodoModel = mongoose.model('Todo', TodoSchema);

module.exports = {
    UserModel,
    TodoModel
};
*/