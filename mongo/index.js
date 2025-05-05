// things we have to improve after assignement
// password is not hashed 
// a single crash(dublicate email) crashes the whole app
// add more endpoint ( mark todo as done)
// add timestamp at which todo was created/the time it needs to be done bhy
// realtionships in mongo
// add validatons to ensure emails and password are corect format 

const express = require("express");

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/todo-app-database")
const { UserModel, TodoModel } = require("./db");


const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhankar";


const app = express();
app.use(express.json());




app.post("/signup", async function (req, res) {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    await UserModel.create({
        email: email,
        password: password,
        name: name
    })

    res.json({
        message: "you are signed up"
    })

})




app.post("/signin", async function (req, res) {
    const email = req.body.email
    const password = req.body.password

    const user = await UserModel.findOne({
        email: email,
        password: password
    })
    console.log(user);

    if (user) {
        const token = jwt.sign({
            id: user._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
    }
    else {
        res.Status(403).json({
            message: "Incorrect credentials"
        })
    }
})






app.post("/todo", function (req, res) {

})



app.get("/todos", function (req, res) {

})


app.listen(3000);



