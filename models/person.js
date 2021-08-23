const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
require('dotenv').config()

const { MONGO_DB_URI } = process.env

mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true })

const personSchema = new mongoose.Schema(
  {
    name:{
      type: String,
      required: true,
      unique: true,
      minlength: 3
    },
    number: {
      type: String,
      minlength: 8
    }
  }
)

personSchema.plugin(uniqueValidator, { type: 'unique-validator' })

personSchema.set('toJSON',{
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
