const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
// connect database
connectDB();

// var corsOptions = {
// 	origin : 'http://localhost:8081'
// };

// app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // To parse the incoming requests with JSON payloads

app.get('/', (req, res) => res.send('api running'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
