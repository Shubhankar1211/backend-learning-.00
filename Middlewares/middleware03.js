// some commonly used middlewares or  predefiend middleware which we can reuire from outside instead of writing them

// 1 express.json ->it is used to parse incoming request bodies that are formatted as json //this middleware is essential for handling josn payloads sent by clients in post or put requests

const express = require("express");
const cors = require("cors");
const app = express()



////  this error comes -:  it directly shows error Cannot read properties of undefined (reading 'a') 
// the sol for it is in express , if you want to send hson data // you need to first parse the json data naswer given bellow
app.use(express.json());
app.use(cors())
app.post('/mul',function(req,res){
    console.log(req.body) // ye nahi karnege ot dikhega hi nahi kuch 
    const a = parseInt(req.body.a); 
    const b=  parseInt(req.body.b);
    res.json({
        answer : a*b
    })
})

// 2 cors miidleware cors - Cross origin resource sharing
// cors iss a security feature implemented by web browser that controls how resourses on a web server can be requested from another domain.
// its a crucial mechanism for managing cross-origin requests and ensuring secure interactions between diffrernt origins on the web

// by default in nodesjs cors origin request are blocked
// if you want to make cors request you can use cors middleware


app.listen(3000)
