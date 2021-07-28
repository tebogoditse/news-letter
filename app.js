const express = require('express');
const axios = require('axios');
//const { request } = require('express');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){

    res.sendFile(__dirname + '/signup.html');
});

app.post('/', function(req, res){

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;

    axios({
        method: 'POST',
        url: "https://us19.api.mailchimp.com/3.0/lists/6fefb8552e",
        auth: {
            username: "tditse",
            password: "34b4d5eb34571d417b49925b0aced287-us1"
        },
        data: JSON.stringify({
            members: [
                {
                    email_address: email,
                    status: "subscribed",
                    merge_fields: {
                        FNAME: name,
                        LNAME: surname
                    }
                }
            ]
            
        })
    })
    .then((response) => {
        console.log(response.status);

        if (response.status === 200){
            res.sendFile(__dirname + '/success.html');
        }
    }, (error) => {
        console.log(error);

        res.sendFile(__dirname + '/failure.html');
    });

    
})

app.post('/failure', function(req, res){
    res.redirect('/signup.html');
})


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});