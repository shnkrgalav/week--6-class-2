const express = require ('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Shnkxr123";

const app = express();
app.use(express.json());

const users = [];

function logger(req, res, next) {
    console.log(req.method + " request came");
    next();
}

// localhost:3000
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html");
})



app.post("/signup",logger, function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    users.push(
        {
            username : username,
            password : password
        }
    )
    res.json({
        message : " you are signed up"
    })

})

app.post("/signin",logger, function (req, res){
    const username = req.body.username;
    const password = req.body.password;

    let founduser = null;
     for(let i=0; i<users.length; i++ ){
        if(users[i].username ==username && users[i].password == password){
            founduser = users[i];
        }
     }
     if(!founduser){ 
      
        res.json({
            message: " Credentials incorrect"
        })
     }
     else{
        const token = jwt.sign({
            username: users[i].username

        },JWT_SECRET);
        res.header("jwt", token);
        res.header("random", "shankar")
        res.json({
            token: token
        })
     }

    
})

function auth(req, res, next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token, JWT_SECRET);

    if (decodedData.username) {
        // req = {status, headers...., username, password, userFirstName, random; ":123123"}
        req.username = decodedData.username
        next()
    } else {
        res.json({
            message: "You are not logged in"
        })
    }
}


app.get("/me",logger, auth, function(req, res){
    const currentUser = req.username;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === currentUser) {
            founduser = users[i]
        }
    }
    // const token = req.headers.token;
    // const DecodedData = jwt.verify(token, JWT_SECRET);
     

    // if(DecodedData.username){
    //     let foundUser = null;

    //    for (let i=0; i<users.length; i++){
    //     if(users[i].username === DecodedData.username){
    //         foundUser=users[i];
    //     }
        res.json({
            username : foundUser.username,
            password : foundUser.password
        }
        
    )
       
    
});

app.listen(3000); 
// http server is listening on port 3000
