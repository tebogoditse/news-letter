const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post('/', (req, res) => {
    
    var firstName = req.body.firstname;
    var lastName = req.body.lastname;
    var email = req.body.email;

    console.log(firstName, lastName, email);
    
})

app.listen(3000, () => {
    console.log('now listening to port 3000');
})

//API Key
//007bef24735049fd7e741358bee6df7b-us4

//List ID
//b7e0e14d83