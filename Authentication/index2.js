// create an endpoint /me that returns the user their information 'only if they send their data
// jwts are a compact and self-contained way to represent information between two parties . they are commonly used
// for authentication and information exchanges in web applications 

// jwts are stateless . jet contains all the information needed to atuhentication a request , so the server doesn't need
// to  store session data . all the data is stored in the token itself

// why do we need jwts // there is a problem with using stateful tokens
// stateful means that we need to store thse toens ein a variable right now and eventually in a dta base 
// the problem is that we need to sne d a req to the databaeas every time the ser wants to hit an auth endpoint
// so jwt essentially  prevents 1 round trip from thebackedn server and db fo any user req
// jwt is not encription but it is encoding

// now we have to create same signin signup logic without tokens and the uses is jwts

const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json());
const JWT_SECRET = "shubhankar"

const users =[]

app.get("/",function(req,res){
    res.sendFile(__dirname + "/Authentication/public/index.html")
  })


app.post("/signup",function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password
    })

    res.json({
        msg : "you are signed in"
    })
    console.log(users)
})

app.post("/signin",function(req,res){
    const username = req.body.username;
    const password = req.body.password;
    let foundUser = null;

    for(let i = 0 ; i < users.length; i++){
        if(users[i].username==username && users[i].password==password){
            foundUser = users[i];
        }
    }

    if(foundUser){
        const token  = jwt.sign({  /// this will generate the token
            username : username,
           // password : password,
            //firstname,
            //lastname,
           // courses: []
        },JWT_SECRET);


        //foundUser.token = token; 
        res.json({
            token : token
        })
    }
    else{
       res.status(403).send({
           mes: " invalid username or password"
       })
    }
    console.log(users)
})


app.get("/me", function (req, res) {
    const token = req.headers.token;
    
    try {
        const decodedInformation = jwt.verify(token, JWT_SECRET);
        //const anAuthDecodedInfo = jwt.decode(token,) // can throw error
        const username = decodedInformation.username;

        let foundUser = null;

        for (let i = 0; i < users.length; i++) {
            if (users[i].username == username) {
                foundUser = users[i];
            }
        }

        if (foundUser) {
            res.json({
                username: foundUser.username,
                password: foundUser.password
            });
        } else {
            res.json({
                msg: "token invalid"
            });
        }
    } catch (err) {
        res.status(403).json({
            msg: "token invalid"
        });
    }
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

