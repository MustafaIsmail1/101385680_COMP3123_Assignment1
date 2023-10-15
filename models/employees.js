const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  salary: Number

})

module.exports = mongoose.model("Employee",employeeSchema) 