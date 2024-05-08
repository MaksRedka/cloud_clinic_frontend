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

db = mongoose.connect(uri, { useNewUrlParser: true }).catch(err => console.error(err));

myDB = db.db("myDB");
const myColl = myDB.collection("patient_data");
const doc = { name: "Ivan", surname: "Ivanov", aftersurname: "Ivanovich", gener: "male", birth: "15.04.1992", age: "32" };
const result = myColl.insertOne(doc);
console.log(
   `A document was inserted with the _id: ${result.insertedId}`,
);


app.listen(port, function () {
    console.log(`Server listens http://cloud-clinic-123-7f92486a9893.herokuapp.com:${port}`);
});