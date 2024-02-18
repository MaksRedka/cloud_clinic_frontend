const Mongoose = require("mongoose")
const localDB = `mongodb+srv://tsymbaljuk2001:<password>@cluster0.k870rvy.mongodb.net/?retryWrites=true&w=majority`
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB