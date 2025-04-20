// an express app is essential a series of middleware calls
// it is a simple question write the backend code for the the amusemnet park where there is middleware like ticket buyer ,ticket cheker then final route is amusement park

const express = require("express");
const app = express();

// funtcion that returns a boolean if the age of the person is more than 14.

function agecal(age){
    if(age<=14){
        return false;
    }
    else{
        return true;
    }
}

function middleware1(req,res,next){
    const age = req.query.age;
    if(age >=14){
       next();
    }
    else{
        res.json({
            msg : "sorry you are not of age yet",
         })
    }
}

app.get('/ride1',middleware1,function(req,res){
    res.json({
        msg : "you have successfully riden the ride 1"
    })
})


app.get('/ride2',middleware1,function(req,res){
    res.json({
         msg : "you have successfully riden the ride 2"
    })  
})


app.get('/ride3',middleware1,function(req,res){
    res.json({
       msg : "you have successfully riden the ride 3"
    }) 
})
