/* this is the file 1
simple understanding of express 

const express = require("express");
const app = express();

function sum(n){
    let ans =0;
    for(let i=1;i<=n;i++){
        ans = ans +i;
    }
    return ans;
}

// this is the route
app.get("/",function(req,res){
    const n = req.query.n;
    const ans  = sum(n);
    res.send("your answer is" + ans);
})

app.listen(3000);
*/

const express = require("express");
const app = express();

let users = [{
    name: "jhon",
    kidneys : [{ healthy : false}]
}]

app.use(express.json());

// query parameters ismost used in get request
app.get('/',function(req,res){
   const usersKidneys = users[0].kidneys;
   const numberOfKidneys = usersKidneys.length;
   const numberOfHealthyKidneys = usersKidneys.filter(kidney => kidney.healthy).length;
   const numberOfUnhealthyKidneys = usersKidneys.filter(kidney => !kidney.healthy).length;
   res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
   })
})


// in post request we generally use pbody
app.post('/',function(req,res){
   const isHealthy = req.body.isHealthy;  // right now this is showing error the error is //  Cannot read properties of undefined (reading 'isHealthy') 
   users[0].kidneys.push({healthy : isHealthy});
   res.json({
    msg : "Done!"
   })
})




app.put('/',function(req,res){
   // replace all kidneys and make them healthy;
   for(let i=0; i<users[0].kidneys.length; i++){
    users[0].kidneys[i].healthy =true ;
   }
   res.json({})
})



//removing all the unhealthy kidney.
app.delete('/',function(req,res){
    // you should return a 411
    // only if atelast one helathy kidney is there do this ,else return 411;
    
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys =[];
        for(let i =0; i<users[0].kidneys.length; i++){
             if(users[0].kidneys[i].healthy){
                newKidneys.push({
                    healthy : true
                })
             }
        }
        users[0].kidneys = newKidneys;
        res.json({
            msg : "doen"
        })
    }else{
        res.sendStatus(441).json({
            msg : "You have no bad kidneys"
        });
    }

   
})

function isThereAtleastOneUnhealthyKidney(){
    let isAtleastOneUnhealthyKidney = false;
    for(let i = 0; i<users[0].kidneys.length; i++){
        if(!users[0].kidneys[i].healthy){
            isAtleastOneUnhealthyKidney =true;
        }
    }
    return isAtleastOneUnhealthyKidney
}

app.listen(3000);

/*
key hieghtlights
The filter() method in JavaScript is used to create a new array containing only the elements that pass a certain condition (i.e., return true from a function).

const isHealthy = req.body.isHealthy;  // right now this is showing error the error is //  Cannot read properties of undefined (reading 'isHealthy') 
Why do we need to parse JSON in Express?
When a client sends data (like from Postman or a frontend app), it's usually sent as raw JSON in the body of the HTTP request.
But by default, Express does not automatically parse that JSON for you.
ou'll get undefined unless you tell Express:
"Hey, I want you to read and parse incoming JSON data."

That’s what this line does:app.use(express.json());
It’s a built-in middleware that reads the raw request body, parses the JSON, and attaches it to req.body.



5.1 ->>>>>>>>>>>>>>
headers soem extra meta data which we send to the server along with the body and server also response back with it
headers arer kety key value [airs sent between a client(like a web browser) and a server in an http request and response .they convey metadaata about the request or response ,suh as content type ,auth infirmation etc.
commom headers 
authorixation(send the user auth information)
content type - type of infirmation cleint is sending (json,binary etc)
referre - which url is this request coming from 

response headers

request headers it contains someimportant data wich might leaks like user password or many thingns and also some atuhenticaton data




fetch api

there is two ways to send request









*/