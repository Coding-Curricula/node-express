const express = require('express');

const app = express();

// MIDDLEWARE
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.ENV_PORT || 8080;

// ENDPOINT
app.get('/', (req, res) => {
    res.send('Hello TEAM UN!');
});

// ENDPOINT with query params
app.get('/api', (req, res) => {
    const { name, title } = req.query;
    res.send(`Hello ${title} ${name}!`);
});

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'johnd@email.com',
        phone: '1234567890',
        address: '123 Main St, New York, NY 10030'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jd@email.com',
        phone: '0987654321',
        address: '456 Main St, New York, NY 10030'
    },
    {
        id: 3,
        name: 'John Smith',
        email: 'jsmith@email.com',
        phone: '1230984567',
        address: '789 Main St, New York, NY 10030'
    }
];

// GET - api/users - get all users - PUBLIC
app.get('/api/users', (req, res) => {
    res.json(users);
});

// GET - api/users/:id - get user by id - PUBLIC
app.get('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        const user = users.find(user => user.id === parseInt(id));

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.log(error);
    }
});

// POST - api/users - add new user - PUBLIC
app.post('/api/users', (req, res) => {
    try {
        const { name, email, phone, address } = req.body;

        const newUser = {
            id: users.length + 1,
            name,
            email,
            phone,
            address
        };

        users.push(newUser);

        res.json(newUser);
    } catch (error) {
        console.log(error);
    }
});

// PUT - api/users/:id - update user by id - PUBLIC
app.put('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        const user = users.find(user => user.id === parseInt(id));

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const { name, email, phone, address } = req.body;

        const updatedUser = {
            id: user.id,
            name: name ? name : user.name,
            email: email ? email : user.email,
            phone: phone ? phone : user.phone,
            address: address ? address : user.address
        };

        const index = users.findIndex(user => user.id === parseInt(id));

        users[index] = updatedUser;

        res.json(updatedUser);
    } catch (error) {
        console.log(error);
    }
});

// DELETE - api/users/:id - delete user by id - PUBLIC
app.delete('/api/users/:id', (req, res) => {
    try {
        const { id } = req.params;

        const user = users.find(user => user.id === parseInt(id));

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const index = users.findIndex(user => user.id === parseInt(id));

        users.splice(index, 1);

        res.json({ msg: 'User deleted' });
    } catch (error) {
        console.log(error);
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});