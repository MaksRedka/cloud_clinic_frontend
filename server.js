const connectDB = require("./db");
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');

const app = express();
app.use(serveStatic(path.join(__dirname, "dist")));

const port = process.env.PORT || 5000;
connectDB();
app.listen(port);

console.log(`Server is running on port ${port}`);