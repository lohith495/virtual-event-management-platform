const register = require("express").Router();
const Validator = require('../helpers/userRegistrationValidator');
const User = require('../model/user');
const usersArray = require('../model/userArray');
const bcrypt = require('bcrypt');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const purify = DOMPurify(window);

register.post("/", (req, res) => {
    console.log('User Array before registration: '+JSON. stringify(usersArray, undefined, 4));
    const validator = Validator.validateUserRegistrationInfo(req.body, usersArray);
    if(validator.validationStatus == true){
        const user = new User(purify.sanitize(req.body.email), purify.sanitize(req.body.fullName), purify.sanitize(bcrypt.hashSync(req.body.password,8)), purify.sanitize(req.body.profile));
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