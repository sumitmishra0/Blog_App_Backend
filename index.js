const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

// middleware 
app.use(express.json());

const blog = require('./routes/blog');

// mount
app.use('/api/v1', blog);

const connectWithDb = require('./config/databse');
connectWithDb();

// start the server
app.listen(PORT,() => {
 console.log(`App is ruuning at ${PORT}`);
})

// default 
app.get('/', (req,res) => {
    res.send("<h1>This is my Home Page</h1>");
})