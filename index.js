const express = require('express')

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

const PORT = '3001'
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))