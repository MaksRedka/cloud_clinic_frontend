const connectDB = require("./db");
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const app = express();

app.use(serveStatic(path.join(__dirname, "dist")));

function checkAuth() {
    return app.use((req, res, next) => {
        if (req.user) next();
        else res.redirect('/login');
    });
}

const port = process.env.PORT || 5000;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'you secret key' }));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new localStrategy((user, password, done) => {
        if (user !== 'test_user')
            return done(null, false, {
                message: 'User not found',
            });
        else if (password !== 'test_password')
            return done(null, false, {
                message: 'Wrong password',
            });

        return done(null, { id: 1, name: 'Test', age: 21 });
    })
);

app.get('/login', (req, res) => {
    res.send('Login page. Please, authorize.');
});

app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect('/login');
});

app.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/card',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

app.get('/', checkAuth(), (req, res) => {
    res.send("Home page. You're authorized.");
    console.log(`calling checkAuth`);
});

app.listen(port, function () {
    console.log(`Server listens http://cloud-clinic-123-7f92486a9893.herokuapp.com:${port}`);
});