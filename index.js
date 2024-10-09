const express = require("express");
const app = express();

app.use(express.json());

 const users = [];

 function generateTocken(){
    const option = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let tocken = "";
    for(let i=0; i<32;i++){
        tocken = tocken + option[Math.floor(Math.random()* option.length)]; // Possible bracket error
    }
    return tocken;
 }

app.post("/signup", (req, res) => {
    // User zod to input validation!
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username: username,
        password: password
    })
    
    res.json({
        message: "You're signed up!"
    })
    console.log(users);
})

app.post("/signin", (req , res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const founduser = users.find(function(u){
        if(u.username ==username && u.password == password){
            return true;
        }else{
            return false;
        }
    });
    if(founduser){
        const tocken = generateTocken();
        founduser.tocken = tocken;
        res.json({
            tocken: tocken
        })
    }
    else{
        res.sendStatus(404).send({
            message: "Invalid Username or Password :<"
        })
    }
    console.log(users);
})

app.get("/me", (req, res) =>{
    let input = req.headers.token;

    let founduser = users.find((u)=>{           //using find method
        if(u.tocken == input){
            return true;    
        }else{
            return false;
        }
    })

    // for(let i=0; i<users.length;i++){
    //     if(users[i].tocken == input){
    //         founduser = users[i];      // Other way to solve the problem
    //     }
    // }

    if(founduser){
        res.json({
            message: "User found",
            username: founduser.username,
            password: founduser.password
        })
    }else{
        res.json({
            message: "Token invalid!"
        })
    }

    
})

app.listen(3000);