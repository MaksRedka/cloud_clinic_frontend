const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');

app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 5000;
const uri = "mongodb+srv://tsymbaljuk2001:messi10ronaldo7@cluster0.k870rvy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true }).then(db => console.log('[OK] DB is connected')).catch(err => console.error(err));

app.listen(port, function () {
    console.log(`Server listens http://cloud-clinic-123-7f92486a9893.herokuapp.com:${port}`);
});