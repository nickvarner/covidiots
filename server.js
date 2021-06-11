const express = require('express');
const connectDB = require('./config/db');

const app = express();
// connect database
connectDB();

//initialize middleware
app.use(express.json({ extended: true })); // To parse the incoming requests with JSON payloads

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('api running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/submissions', require('./routes/api/submissions'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
