const express = require('express');
const app = express();
const port = 3000;
const router = require('./routes/router');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

const server = app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
    console.log(server.address());
});



module.exports = server;