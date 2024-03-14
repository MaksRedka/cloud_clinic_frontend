const connectDB = require("../cloud_clinic_frontend/src/scripts/db");
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
const cookieSession = require('cookie-session')
const bodyParser = require('body-parser')
const passport = require('passport')

// getting the local authentication type
const LocalStrategy = require('passport-local').Strategy

app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log(`Server listens http://cloud-clinic-123-7f92486a9893.herokuapp.com:${port}`);
});