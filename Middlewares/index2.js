const express = require("express");
const app = express();

// these are 2 are with the function method 
function subtrat(a,b){
    const subtraction = a-b;
    return subtraction
}
function divide(a,b){
    const division = a/b;
    return division
}

// these are with the direct method
app.get('/mul',function(req,res){
    const a = req.query.a;
    const b=  req.query.b;
    res.json({
        answer : a*b
    })
})

// this is the way we can create dynamic parameters
app.get('/add/:first/:second',function(req,res){
    const a = parseInt(req.params.first);
    const b=  parseInt(req.params.second);
    res.json({
        answer : a+b
    })
})


// in these  two we accesssing the parameters from the  fucntion 
app.get('/sub',function(req,res){
    const a = req.query.a;
    const b=  req.query.b;
    const subtraction = subtrat(a,b)
    res.send("your answer is" + subtraction)
})


app.get('/div',function(req,res){
    const a = req.query.a;
    const b=  req.query.b;
    const division = divide(a,b)
    res.send("your answer is" + division)
})


app.listen(3001);