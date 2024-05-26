const login = require("express").Router();
const usersArray = require('../model/userArray');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

login.post("/", (req, res) => {
    let emailPassed = req.body.email;
    let passwordPassed = req.body.password;
    let findUser = usersArray.filter(val => val.email == emailPassed);
    if(findUser.length == 0){
        return res.status(404).json("User not found/Invalid user");
    }
    else if(passwordPassed == null || passwordPassed.trim() == ''){
        return res.status(400).json("Please enter password");
    }
    else{
        let isPasswordValid = bcrypt.compareSync(passwordPassed, findUser[0].password);
        if(!isPasswordValid){
            return res.status(401).json("Password Incorrect");
        }
        var token = jwt.sign({
            email: emailPassed
        }, process.env.API_SECRET, {
            expiresIn: 86400
        });
        return res.status(200).send({
            user:{
                email: findUser[0].email
            },
            message: "Login Successful",
            accessToken: token
        });
    }
});

module.exports = login;