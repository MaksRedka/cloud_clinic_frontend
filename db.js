const Mongoose = require("mongoose")
const localDB = `mongodb+srv://username:<password>@<cluster>/<database>?retryWrites=true&w=majority`
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB