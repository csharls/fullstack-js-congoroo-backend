const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')

const app = new express()

  // let persons=[
  //   {
  //     "name": "Arto Hellas",
  //     "number": "040-134567",
  //     "id": 1
  //   },
  //   {
  //     "name": "Ada Lovelace",
  //     "number": "39-44-5323523",
  //     "id": 2
  //   },
  //   {
  //     "name": "Dan Abramov",
  //     "number": "12-43-234345",
  //     "id": 3
  //   },
  //   {
  //     "name": "Mary Poppendieck",
  //     "number": "39-23-6423122",
  //     "id": 4
  //   }
  // ]


morgan.token('body', function (req, res) { return JSON.stringify(req.body) })
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(express.static('build'))



app.get('/', (req,res)=> {
  res.send("Welcome to the phonebook api server")
})

app.get('/info',(req, res)=>{
Person.find({})
  .then( result => {
    const date = new Date()
    res.send(`
    <p>Phonebook has info for ${result.length} people</p>
    <p>${date}</p>`)

  }
  )
})

app.get('/api/persons', (req, res) => {
  Person.find({})
  .then(result =>{
    res.json(result)
  })
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
})

app.delete('/api/persons/:id', (req,res) => {

  const id = Number(req.params.id)
  persons = persons.filter(p=> p.id !== id)
  res.status(204).send()
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
})

const PORT = process.env.PORT || '3001'
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))