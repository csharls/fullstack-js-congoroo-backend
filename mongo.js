const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const name = process?.argv[3]
const number = process?.argv[4]

const url = `mongodb+srv://fullstackdev:${password}@cluster0.vwuuf.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex: true})

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if(!name && ! number) {
  Person.find({})
  .then( result => {
    result.forEach(p => console.log(p))
    mongoose.connection.close()
  })
}
else{
  const newPerson = new Person({
    name:name,
    number:number
  })
  
  newPerson.save()
  .then(result => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close()
  })
}

