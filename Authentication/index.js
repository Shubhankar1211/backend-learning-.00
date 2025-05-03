//  we have created here a very baisc exprss application simple signin and signup page.
const express  =require("express");
const app =  express();

app.use(express.json());




const users =[] // this how we create the inmemory becuse we dont have database
function randomToken(){
    let options = [
        'a','b','c','d','e','f','g','h','i','j','k','l','m',
        'n','o','p','q','r','s','t','u','v','w','x','y','z',
        'A','B','C','D','E','F','G','H','I','J','K','L','M',
        'N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
        '0','1','2','3','4','5','6','7','8','9'
      ];

    let token = "";
    for(let i = 0; i <32 ; i++){
        token += options[Math.floor(Math.random() * options.length)]
    }
    return token;  
}


app.post('/signup',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username : username,
        password : password,
    })

    res.json({
        msg : "you are signed up"
    })
    console.log(users)
})


app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const foundUser = users.find(function(u){
        if(u.username === username && u.password === password){
            return true;
        }else{
            return false;
        }
    })

    if(foundUser){
        const token = randomToken();
        foundUser.token = token;
        res.json({
            token : token,
        })
        console.log(users);
    }
    else{
        res.status(403).send({
            msg : "Invalid username or password"
        })
    }
})


// this is the real  me endpoint where we  get the username and password from the token
app.get("/me", function(req,res){
    const token = req.headers.token
    console.log("Token received:", token);
    let foundUser = null;
    //const user = users.find(user => user.token === token); // this same line will work same as the for loop for finsing the users


    
    for(let i = 0 ; i<users.length; i++){
        if(users[i].token == token){
            foundUser = users[i];
        }
    }

    if(foundUser){
        res.json({
            username : foundUser.username,
            password : foundUser.password
        })
    }else{
        res.json({
            msg: "token is invalid "
        })
    }
})

 


app.listen(3000, () => {
    console.log("Server started on port 3000");
});
