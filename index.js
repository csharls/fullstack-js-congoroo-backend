const express = require('express')
const morgan = require('morgan')

const app = new express()

  let persons=[
    {
      "name": "Arto Hellas",
      "number": "040-134567",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
  ]

app.use(express.json())
app.use(morgan('tiny'))



app.get('/', (req,res)=> {
  res.send("Welcome to the phonebook api server")
})

app.get('/info',(req, res)=>{
  const total = persons.length
  const date = new Date()
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC', timeZoneName:'long'};
  res.send(`
  <p>Phonebook has info for ${total} people</p>
  <p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id',(req,res)=> {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  person
  ? res.json(person)
  : res.status(404).send()
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p=> p.id !== id)
  res.status(204).send()
})

app.post('/api/persons',(req,res) => {
  const person = req.body
  
  const personExist = persons.find( p => p.name === person.name )

  if(personExist) {
    res.status(409).json({
      error: `${person.name} already exist`
    })
  }
  
  
  if( !personExist && person.number ) {
    const id = Math.max(...persons.map(p=>p.id))
    const newPerson = {
      name: person.name,
      number: person.number,
      id: id + 1
    }
    persons = [...persons, newPerson]

    res.status(201).json(newPerson)
  }
  else{
    res.status(400).json({
      error: 'Phone number is missing'
    })

  }
})

const PORT = '3001'
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))