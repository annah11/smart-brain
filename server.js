const express = require('express');
const app = express();

app.use(express.json());

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

app.get('/', (req, res) => {
    res.send(database.users);
});

app.post('/signing', (req, res) => {
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

app.put('/image' ,(req,res) => {
    const { id } = req.body;
    const user = database.users.find(user => {
        if (user.id === id){
            found= true;
            user.entries++;
            return res.json(user.entries);

        }
    });

  
        if(!found){
        res.status(400).json("User not found");
    } 
})

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
