const mongoose = require('mongoose')
require('dotenv').config()

const {MONGO_DB_URI} = process.env

mongoose.connect(MONGO_DB_URI, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true})

const personSchema = new mongoose.Schema(
  {
    name: String,
    number: String
  }
)

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject._v
  }
})

module.exports = mongoose.model('Person', personSchema)
