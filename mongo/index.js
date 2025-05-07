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
const jwt = require("jsonwebtoken");
const {z} = require("zod");



mongoose.connect("mongodb+srv://admin:admin05%40@cluster0.ntmjrlu.mongodb.net/todo-app-database")
const { UserModel, TodoModel } = require("./db");



const JWT_SECRET = "shubhankar";


const app = express();
app.use(express.json());


app.post("/signup", async function (req, res) {  // ti is returnign promise that is why we we are you using await ans async 

    const requiredBody = z.object({ // in zod you have to declare the schema the it is very easy for us to  input validattion  and this is the first step 
        email : z.string().min(3).max(100).email(),
        password : z.string().min(3).max(100),
        name : z.string().min(3).max(30)
    })

    const parsedDataWithSuccess = requiredBody.safeParse(req.body); // this is the second step
    if(!parsedDataWithSuccess.success){ // if the fromat is wrong than it will print 
        res.json({
            msg : "incorrect format",
            error : parsedDataWithSuccess.error // it will return the things which we left in the inputs this is prebuilt things in the zod
        })
        return
    }

    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    try {
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
    } catch (e) {
        res.status(500).json({ message: "Signup failed", error: e.message })
    }
})



/* this is to handel error for that we rap them in try and catch
app.post("/signup", async function (req, res) {  // ti is returnign promise that is why we we are you using await ans async 
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name


   try {
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

   } catch (e) {
    if (e.code === 11000) {
        return res.status(400).json({
             message: "Email already in use" });
    }
    res.status(500).json({
         message: "Signup failed", error: e.message });
   }
})
*/




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

// jod  it is a scehma validation library which help us to fixed the input which user want to give us 


// zod assignment -> Check that the password has 1 uppercase char ,1 lower case char , 1 special character


/*
1. Referenced Relationship (Normalization)
One document refers to another using an ObjectId.

Keeps data separate and scalable.

Use when:

Documents grow large.

Relationships are many-to-one or many-to-many.

Access with .populate() in Mongoose.

📦 2. Embedded Relationship (Denormalization)
One document contains another directly.

Faster reads but not scalable if the sub-document list grows large.

Use when:

Data is tightly coupled.

Sub-documents are small and rarely change individually.

This is similar to:

SQL JOINs ⇒ Referenced

JSON nesting ⇒ Embedded

Do you want a quick real-world example comparing both styles?







You said:
ya sute


ChatGPT said:
Great! Here's a simple example to show the difference between referenced and embedded relationships using a User and their Todos.
*/
