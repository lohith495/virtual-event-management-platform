const events = require("express").Router();
const verifyToken = require('../middleware/auth');
const eventsArray = require('../model/eventsArray');
const usersArray = require('../model/userArray');
const ATVirtualEvent = require('../model/event');
const nodemailer = require('nodemailer');

events.get("/", verifyToken,  (req, res) => {
    if(req.email){
        console.log(req.email);
        emailRegistered = req.email;
        let findUser = usersArray.filter(val => val.email == emailRegistered);
        if(findUser[0].profile == "organizer"){
            return res.status(200).json(eventsArray);
        }
        else{
            return res.status(401).json(emailRegistered+ " is unauthorized to view events");
        }
    }
    else{
        return res;
    }
});

events.post("/", verifyToken,  (req, res) => {
    if(req.email){
        console.log(req.email);
        emailRegistered = req.email;
        let findUser = usersArray.filter(val => val.email == emailRegistered);
        if(findUser[0].profile == "organizer"){
            let id;
            if(eventsArray.length == 0){
                id = 1;
            }
            else{
                id = eventsArray.length+1;
            }
            const time = {
                time: req.body.time
              };
            const event = new ATVirtualEvent(id, req.body.date, time, req.body.description);
            eventsArray.push(event);
            return res.status(201).json(eventsArray[eventsArray.length-1]);
        }
        else{
            return res.status(401).json(emailRegistered+ " is unauthorized to create events");
        }
    }
    else{
        return res;
    }
});

events.put("/:id", verifyToken,  (req, res) => {
    if(req.email){
        console.log(req.email);
        emailRegistered = req.email;
        let findUser = usersArray.filter(val => val.email == emailRegistered);
        if(findUser[0].profile == "organizer"){
            let filteredEvent = eventsArray.filter(val => val.id == req.params.id);
            if(filteredEvent.length == 0){
                return res.status(404).json("Event id not available");
            }
            let filteredEventIndex = filteredEvent.map(val => eventsArray.indexOf(val));
            const time = {
                time: req.body.time
              };
            const event = new ATVirtualEvent(req.params.id, req.body.date, time, req.body.description);
            eventsArray[filteredEventIndex] = event;
            return res.status(200).json(eventsArray[filteredEventIndex]);
        }
        else{
            return res.status(401).json(emailRegistered+ " is unauthorized to update events");
        }
    }
    else{
        return res;
    }
});

events.delete('/:id', verifyToken, (req, res) => {
    if(req.email){
        console.log(req.email);
        emailRegistered = req.email;
        let findUser = usersArray.filter(val => val.email == emailRegistered);
        if(findUser[0].profile == "organizer"){    
            if(eventsArray.length !== 0){
                let filteredEvent = eventsArray.filter(val => val.id == req.params.id);
                if(filteredEvent.length == 0){
                    return res.status(404).json("Event id not available");
                }
                let filteredEventIndex = filteredEvent.map(val => eventsArray.indexOf(val));
                let deletedEventArray = eventsArray.splice(filteredEventIndex, 1)
                console.log('Event Array after deletion: '+JSON. stringify(eventsArray, undefined, 4));
                return res.status(200).send('Event '+req.params.id+' Deleted successfully');
            }
            else{
                return res.status(404).json('No Event found to delete');
            }
        }
        else{
            return res.status(401).json(emailRegistered+ " is unauthorized to delete events");
        }
    }
    else{
        return res;
    }
});

events.post('/:id/register', verifyToken, (req, res) => {
    if(req.email){
        console.log(req.email);
        emailRegistered = req.email;
        let findUser = usersArray.filter(val => val.email == emailRegistered);
        if(eventsArray.length !== 0){
            let filteredEvent = eventsArray.filter(val => val.id == req.params.id);
            if(filteredEvent.length == 0){
                return res.status(404).json("Event id not available");
            }
            let filteredEventIndex = filteredEvent.map(val => eventsArray.indexOf(val));
            if(eventsArray[filteredEventIndex].participants.includes(emailRegistered)){
                return res.status(409).json(emailRegistered+ " already registered to event - "+req.params.id);
            }
            eventsArray[filteredEventIndex].participants.push(findUser[0].email);
            console.log("Participants list for the event id- "+req.params.id+ " is :"+eventsArray[filteredEventIndex].participants);
            sendEmail();
            return res.status(201).json(emailRegistered+ " successfully registered to the event - "+req.params.id);
        }
        else{
            return res.status(404).json('No Events to register');
        }
    }
    else{
        return res;
    }
});

async function sendEmail() {
    let transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: 'lohith.mudu@gmail.com',
            pass: '' 
        }
    });

    let mailOptions = {
        from: 'lohith.mudu@gmail.com', 
        to: 'lohith495@gmail.com', 
        subject: 'Event Registration Successful!!!', 
        text: 'Event Registration Successful :-)', 
        html: 'Event Registration Successful :-)' 
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = events;    