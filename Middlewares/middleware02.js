// create a middleware function that logs each incoming request's http method ,url ,and timestamp to the console
const express = require("express")

const app = express();

function logged(req,res,next){
    console.log("Method is " + req.method);
    console.log("url is " + req.url);//this is the route we get 
    console.log("route is " + req.hostname); //this will give you the host
    console.log(new Date());
    next();
}

// assignment - : 
// 1 create a backend server in nodejs, that returns the sum endpoint
// 2 create an html file , that hits the backend server using the fetch 'api'



app.use(express.json());
app.post('/mul',function(req,res){
    const a = parseInt(req.body.a); 
    const b=  parseInt(req.body.b);
    res.json({
        answer : a*b
    })
})






// create a middleware that counts total number of reqeust sent to a server. aslo create a endpoint that exposees it