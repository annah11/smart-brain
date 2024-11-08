const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(express.json()); 

const database = {
    users: [
        {
            id: 1,
            username: 'HANA',
            password: 'hana1234',
            email: 'hana1@gmail.com',
            entries: 0,
            joined: new Date(),
        },
        {
            id: 2,
            username: 'user1',
            password: 'password1',
            email: 'user1@example.com',
            entries: 0,
            joined: new Date(),
        }
    ]
};


app.get('/', (req, res) => {
    res.send('This is working');
});


app.post('/signing', (req, res) => {
   
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password
    ) {

   
        res.json("success");
    } else {
        res.status(400).json("error logging in" );
    }
});


app.listen(3000, () => {
    console.log('App is running on port 3000');
});
