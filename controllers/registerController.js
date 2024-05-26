const register = require("express").Router();
const Validator = require('../helpers/userRegistrationValidator');
const User = require('../model/user');
const usersArray = require('../model/userArray');
const bcrypt = require('bcrypt');

register.post("/", (req, res) => {
    console.log('User Array before registration: '+JSON. stringify(usersArray, undefined, 4));
    const validator = Validator.validateUserRegistrationInfo(req.body, usersArray);
    if(validator.validationStatus == true){
        const user = new User(req.body.email, req.body.fullName, bcrypt.hashSync(req.body.password,8), req.body.profile);
        usersArray.push(user);
        console.log('User Array after inserting new registration: '+JSON. stringify(usersArray, undefined, 4));
        console.log('New registered user: '+JSON. stringify(usersArray[usersArray.length-1], undefined, 4));
        return res.status(validator.responseStatus).json(usersArray[usersArray.length-1]);
    }
    else{
        return res.status(validator.responseStatus).json(validator.message);
    }
});

module.exports = register;