const express = require('express');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');

app.use(express.json());
app.use(cors())

const database = {
    users: [
        {
            id: '1',
            name: 'HANA',
            password: 'hana1234',
            email: 'hana1@gmail.com',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '2',
            name: 'user1',
            password: 'password1',
            email: 'user1@example.com',
            entries: 0,
            joined: new Date(),
        }
    ]
};



    login:[
        {
            id: '6',
            hash: ' ',
            email: 'hana1@gmail.com',
           
        }
    ]
app.get('/', (req, res) => {
    res.send(database.users);
});


app.post('/signing', (req, res) => {
    bcrypt.compare("hana1234", '$2a$08$aFDXmTKPDzozlNkpxd3sA.qVpk8IpNeqNLpuiECZ6gKgmaqsudv06', function(err, res) {
        // res === true
        console.log('first guess',res)
    });
    bcrypt.compare("veggies", '$2a$08$aFDXmTKPDzozlNkpxd3sA.qVpk8IpNeqNLpuiECZ6gKgmaqsudv06', function(err, res) {
        // res === false
        console.log('second guess',res)
    });
    
    const { email, password } = req.body;
    const user = database.users.find(user => user.email === email && user.password === password);

    if (user) {
        res.json("success");
    } else {
        res.status(400).json("error logging in");
    }
});


app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, 8, function(err, hash) {
        console.log(hash)
    });
    const newUser = {
        id: String(database.users.length + 1),
        name,
        password,
        email,
        entries: 0,
        joined: new Date(),
    };
    database.users.push(newUser);
    res.json(newUser);
});


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    const user = database.users.find(user => user.id === id);

    if (user) {
        res.json(user);
    } else {
        res.status(400).json("User not found");
    }
});


app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = database.users.find(user => user.id === id);


    if (user) {
        user.entries++;
        res.json(user.entries);
    } else {
        res.status(400).json("User not found");
    }
});


app.listen(3000, () => {
    console.log('App is running on port 3000');
});
