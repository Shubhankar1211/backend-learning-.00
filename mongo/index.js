// things we have to improve after assignement
// password is not hashed 
// a single crash(dublicate email) crashes the whole app
// add more endpoint ( mark todo as done)
// add timestamp at which todo was created/the time it needs to be done bhy
// realtionships in mongo
// add validatons to ensure emails and password are corect format 


// so this is the brute or raw  auth + todo 
const express = require("express");
const bcrypt  = require("bcrypt")
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


    const hashedpassword = await bcrypt.hash(password,5) // this 5 is how many time you have to interate the hashed password
    console.log(hashedpassword);

    await UserModel.create({
        email: email,
        password:hashedpassword,
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
    })
    console.log(user);

   if(!user){
    res.status(403).json({
        msg :" user is not in our database "
    })
    return
   }


   const passewordMatch = await bcrypt.compare(password, user.password); // this is how we sign in like when we signed up we enter the password and hashed it and directly stored in the database // so now in sign in endpoint when we enter our passord it will compare the hashed password which is stored in the database if they match then we can login 

    if (passewordMatch) {
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


/// hashing is one way converison hashed means converting the plain passworfd into soem unreadful format 
// when the two passeword is same we have to find a way that their hashed password should we diffenet 
// to over come this problem thier is a consepts of salting in this we add some addtional string to the password now we hashed them it so it create a unique hashedpassword


// why shoudld you hash password 
// password hashing is a technique used to securely sotre passwwords in a way that makes them difficylt to reciver or missuse .instead of storing the actual password , oyu store a hashed version of it 

//salt 
// a popular approach to hashing password involves using a hashing algorithm that imcorprates a salt a random value addedd to the password before hashing. this prevents attackers from using precomputes tabels(rainbow tabels)to crack passwords;




