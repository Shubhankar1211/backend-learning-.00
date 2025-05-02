// create a middleware called auth that verifies if a user is logged in and ends the request early if the user isn't logged in

const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
app.use(express.json());
const JWT_SECRET = "shubhankar"

const users =[]
app.post('/signup',function(req,res){
       const username = req.body.username
       const password = req.body.password

       users.push({
        username  : username,
        password : password
       })

       res.json({
        msg: "you are signed in"
       })

       console.log(users)
})


app.post('/signin',function(req,res){
      const username = req.body.username
      const password = req.body.password

      let foundUser = null;
      for(let i = 0 ; i< users.length ; i++){
        if(users[i].username === username && users[i].password === password){
            foundUser = users[i];
        }
      }
      

      if(!foundUser){
         res.json({
            mes : " credentials incorrect"
         })
         return
      }
      else{
          const token = jwt.sign({
            username
          },JWT_SECRET)

          res.json({
            token : token
          })
      }
})

app.get('/me',function(req,res){
    let foundUser = null;

    for(let i= 0; i <users.length; i++){
        if(users[i].username === username){
            foundUser = users[i];
        }
    }
    res.json({
        username : foundUser.username,
        password : foundUser.password
    })
})

app.listen(3000);
