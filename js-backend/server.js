const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3010;
app.use(cors({
    origin: 'http://localhost:8080', // Replace with your Vue.js client's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies to be sent with requests
}));

mongoose.connect('mongodb+srv://tsymbaljuk2001:messi10ronaldo7@cluster0.k870rvy.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


const productRoutes = require('./routes/productRoutes'); // Adjust the path as needed

app.use(bodyParser.json());
app.use(productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;