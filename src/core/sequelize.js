const uri = "mongodb+srv://tsymbaljuk2001:messi10ronaldo7@cluster0.k870rvy.mongodb.net/?retryWrites=true&w=majority";
const Sequelize = require('sequelize')
const sequelize = new Sequelize(uri)

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfully established connection to database')
  })
  .catch((err) => {
    console.log('Unable to connect to database ', err)
  })

module.exports = sequelize