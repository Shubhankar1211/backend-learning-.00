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

app.get('/ride1',function(req,res){
    if(agecal(req.query.age)){
        res.json({
            msg : "you have succesfully riden a ride 1"
           })
    }else{
        res.status(411).json({
            msg : " sorry you are not of age yet"
        })
    }
})


app.get('/ride2',function(req,res){
    if(agecal(req.query.age)){
        res.json({
            msg : "you have succesfully riden a ride 2"
           })
    }else{
        res.status(411).json({
            msg : " sorry you are not of age yet"
        })
    }
})


app.get('/ride3',function(req,res){
    if(agecal(req.query.age)){
        res.json({
            msg : "you have succesfully riden a ride 3"
           })
    }else{
        res.status(411).json({
            msg : " sorry you are not of age yet"
        })
    }
})


app.listen(3001);