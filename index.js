const express = require('express')

const app = new express()

  const persons=[
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
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
app.get('/info',(req, res)=>{
  const total = persons.length
  const date = new Date()
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC', timeZoneName:'long'};
  res.send(`
  <p>Phonebook has info for ${total} people</p>
  <p>${date}</p>`)
})

const PORT = '3001'
app.listen(PORT,()=> console.log(`Server running on port ${PORT}`))