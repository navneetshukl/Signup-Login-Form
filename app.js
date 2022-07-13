const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const { response } = require("express");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/formDB");

const schema=mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const user=mongoose.model("user",schema);

/////////////////////////////////////////SIGNUP/////////////////////////////////////////////

app.route("/signup")

.get(function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

.post(function(req,res){
    const username1=req.body.username;
    const email1=req.body.email;
    const password1=req.body.password;
   /* console.log(username1);
    console.log(email1);
    console.log(password1);*/
    user.findOne({username: username1},function(error,foundUser){
        if(error){
            res.send("Sorry there was some error");
        }
        else {
            if(foundUser!=null)
            {
                res.send("Username already existed");
            }
            else {
                user.findOne({email: email1},function(err,newUser){
                    if(err){
                        console.log("Sorry there is some error");
                    }
                    else{
                        if(newUser!=null){
                            res.send("Email already existed");
                        }
                        else {
                            const user1 =new user({
                                username: username1,
                                email: email1,
                                password: password1
                            });
                            user1.save();
                            res.send("User registered successfully");
                        }
                    }
                });
            }
    }


            
    });



});

//////////////////////////////////////////SIGNIN////////////////////////////////////////////

app.route("/signin")

.get(function(req,res){
    res.sendFile()
})

app.listen(3000,function(){
    console.log("The Server started at port 3000");
});
