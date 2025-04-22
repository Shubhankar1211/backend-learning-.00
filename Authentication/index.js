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
    const password = req.body.username;

    users.push({
        username : username,
        password : password,
    })

    res.json({
        msg : "you are signed up"
    })
})


app.post('/signin',function(req,res){
    const username = req.body.username;
    const password = req.body.username;

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
    }
    else{
        res.status(403).end({
            msg : "Invalid uesername or password"
        })
    }
})


app.listen(3000);