// things we have to improve after assignement
// password is not hashed 
// a single crash(dublicate email) crashes the whole app
// add more endpoint ( mark todo as done)
// add timestamp at which todo was created/the time it needs to be done bhy
// realtionships in mongo
// add validatons to ensure emails and password are corect format 


// so this is the brute or raw  auth + todo 
const express = require("express");

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/todo-app-database")
const { UserModel, TodoModel } = require("./db");


const jwt = require("jsonwebtoken");
const JWT_SECRET = "shubhankar";


const app = express();
app.use(express.json());




app.post("/signup", async function (req, res) {  // ti is returnign promise that is why we we are you using await ans async 
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
            id: user._id.toString()
        }, JWT_SECRET);
        res.json({
            token: token
        })
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
})



function auth(req, res, next) {
    const token = req.headers.token // this is the which we take out the token form the signin
    const decodedData = jwt.verify(token, JWT_SECRET); // here we verify that we are the one who create this token

    if (decodedData) {
        ;
        // req.userId = decodedData.userId // ki jo request me user id ayi h or jo hamen bayi thi vo same h then we get the correct credentialas 
        req.userId = decodedData.id// agar upper wale me hamne decodeddata.id nahi likhi ye empty object return kar dega isliye hame jo id database bna rha h vo hi id deni h
        next();
    }
    else {
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
}




app.post("/todo", auth, async function (req, res) {
    const userId = req.userId
    const title = req.body.title
    const done = req.body.done


    await TodoModel.create({
        userId,
        title,
        done,
    })

    res.json({
        message : "todo created"
    })
})



app.get("/todos", auth, async function (req, res) {
    const userId = req.userId// thorugh this we get the id and thorugh all the auth
    const todos = await TodoModel.find({
        userId
    })

    res.json({
        todos
    })
})


app.listen(3000);



