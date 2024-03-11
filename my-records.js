const connectDB = require("./db");
const { env } = require('node:process');

console.log(env.NAME);
console.log('Called my-records.js');
