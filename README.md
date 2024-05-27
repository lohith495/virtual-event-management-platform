# virtual-event-management-platform
Backend System for a Virtual Event Management Platform

To clone the project, please run below command:
git clone https://github.com/lohith495/virtual-event-management-platform.git

To install required dependencies, please run below command in this project directory in local:
npm install

To run the application, please run below node command:
node app.js

To test the application, below are the api's and respective request body and expected response:

1. POST /register
   example-
   | request body:
{
    "email": "lohith495@gmail.com",
    "fullName": "Lohith Muduthanapelly",
    "password": "<password>",
    "profile": "organizer"
}
   | response status: 201
   | response body:
{
    "email": "lohith495@gmail.com",
    "fullName": "Lohith Muduthanapelly",
    "password": "<hashed password>",
    "profile": "organizer"
}

2. POST /login
   example-
   | request body:
{
    "email": "lohith495@gmail.com",
    "password": "<password>"
}
   | response status: 201
   | response body:
{
    "user": {
        "email": "lohith495@gmail.com"
    },
    "message": "Login Successful",
    "accessToken": "<accesstoken>"
}

3. GET /events with "authorization" header that has a valid access token and user is an organizer(not attendee) --> fetches all the events 

4. POST /events with "authorization" header that has a valid access token and user is an organizer(not attendee)
   example-
   | request body:
{
    "date" : "30-05-2024",
    "time" : "1:45 PM IST",
    "description" : "Data Structures and Algorithms"
}
   | response status: 201
   | response body:
{
    "id": 1,
    "date": "30-05-2024",
    "time": {
        "time": "1:45 PM IST"
    },
    "description": "Data Structures and Algorithms",
    "participants": [lohith.mudu@gmail.com, lohith495@gmail.com]
}

5. PUT /events/id with "authorization" header that has a valid access token and user is an organizer(not attendee)
   example -
   | resourec/uri: /events/1
   | request body:
{
    "date" : "28-05-2024",
    "time" : "1:45 PM IST",
    "description" : "Backend Engineering I"
}
   | response status: 200
   | response body:
{
    "id": 1,
    "date": "28-05-2024",
    "time": {
        "time": "1:45 PM IST"
    },
    "description": "Backend Engineering I",
    "participants": [lohith.mudu@gmail.com, lohith495@gmail.com]
}

6. DELETE /events/id with "authorization" header that has a valid access token and user is an organizer(not attendee)
   example -
   | resource/uri: /events/id
   | request body: not required
   | response status: 200
   | response body: Event 1 Deleted successfully

7. POST /events/id/register with "authorization" header that has a valid access token. Triggers an email to the registered 
   example-
   | resource/uri: /events/id/register
   | request body: not required
   | response status: 200
   | response body: lohith495@gmail.com successfully registered to the event - 1
