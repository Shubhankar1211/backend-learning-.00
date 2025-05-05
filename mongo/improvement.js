const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, TodoModel } = require("./impmongoose");

const app = express();
const JWT_SECRET = "shubhankar";

app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/todo-app-database");




//  Signup
app.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            email,
            password: hashedPassword,
            name
        });

        res.json({ message: "You are signed up" });
    } catch (e) {
        if (e.code === 11000) {
            return res.status(400).json({ message: "Email already in use" });
        }
        res.status(500).json({ message: "Signup failed", error: e.message });
    }
});








//  Signin
app.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password || !email.includes("@")) {
        return res.status(400).json({ message: "Invalid email or password format" });
    }

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(403).json({ message: "Incorrect credentials" });
        }

        const token = jwt.sign({ id: user._id.toString() }, JWT_SECRET);
        res.json({ token });
    } catch (e) {
        res.status(500).json({ message: "Something went wrong during signin", error: e.message });
    }
});





//  Auth middleware
function auth(req, res, next) {
    const token = req.headers.token;

    try {
        const decodedData = jwt.verify(token, JWT_SECRET);
        req.userId = decodedData.id;
        next();
    } catch (e) {
        res.status(403).json({ message: "Token verification failed", error: e.message });
    }
}





//  Create a todo
app.post("/todo", auth, async (req, res) => {
    const { title, done, dueDate } = req.body;

    try {
        await TodoModel.create({
            userId: req.userId,
            title,
            done: done || false,
            dueDate: dueDate ? new Date(dueDate) : undefined
        });

        res.json({ message: "Todo created" });
    } catch (e) {
        res.status(500).json({ message: "Failed to create todo", error: e.message });
    }
});







//  Get all todos
app.get("/todos", auth, async (req, res) => {
    try {
        const todos = await TodoModel.find({ userId: req.userId });
        res.json({ todos });
    } catch (e) {
        res.status(500).json({ message: "Failed to fetch todos", error: e.message });
    }
});





//  Mark todo as done
app.patch("/todo/:id/done", auth, async (req, res) => {
    const todoId = req.params.id;

    try {
        const todo = await TodoModel.findOneAndUpdate(
            { _id: todoId, userId: req.userId },
            { done: true },
            { new: true }
        );

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        res.json({ message: "Todo marked as done", todo });
    } catch (e) {
        res.status(500).json({ message: "Failed to update todo", error: e.message });
    }
});

app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
});
