const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = new express()

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))

app.get('/', (req,res)=> {
  res.send("Welcome to the phonebook api server")
})

app.get('/info',(req, res, next)=>{
Person.find({})
  .then( result => {
    const date = new Date()
    res.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${date}</p>`)
  })
  .catch(error => next(error))
})

app.get('/api/persons', (req, res) => {
  Person.find({})
  .then(result =>{
    res.json(result)
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id',(req,res)=> {
  const id = req.params.id

  Person.findById(id)
  .then(result =>  result 
    ? res.json(result) 
    : res.status(404).end() )
    .catch(error => {
      console.log(error);
      res.status(500).end()
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res) => {
  const id = req.params.id

  Person.findByIdAndRemove(id)
  .then(result =>{
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.post('/api/persons',(req,res) => {
  const person = req.body

  const newPerson = new Person( {
    name: person.name,
    number: person.number
  })

  newPerson.save()
  .then(savedPerson =>{
    res.status(201).json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    id: body.id,
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(person.id, person, {new: true})
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(error => next(error))
})
const wrongIdHandler = (error, request, response, next) => {
  console.log(error);
  if(error.name === 'CastError') {
    return response.status(400).send({error: 'malforemd id'})
  }
  next(error)
}

const errorHandler = (error,req, res) => {
    console.log(error)
    res.status(500).end()
}

const unknowEndpoint = (req, res) => {
  res.status(404).send({error: 'unknown endpoint'})
}

app.use(wrongIdHandler)
app.use(errorHandler)
app.use(unknowEndpoint)

const PORT = process.env.PORT || '3001'
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))