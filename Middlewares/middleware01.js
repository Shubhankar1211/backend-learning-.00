const express = require("express");
const app = express();

let count =0;

//simple middleware
function countIncreasor(res,req,next){
    count++;
    console.log("total number of requests = " + count )
    req.name = "shubhankar" // change the reqest object
    next();
}

function addition(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req.name)

    res.json({
        ans : a+b
    })
}

app.get('/add',countIncreasor,addition);


//making a middleware which we can use in authentication
//it can also stop the answer beacuse it ddi not call the next fucntion
function authentication1(req,res,next){
    if(req.body.cokkies=== "google"){
        next();
    }
    else{
        res.json({
            message : "I ended the request early"
        })
    }
}

app.get('/auth',authentication1,function(){

})

