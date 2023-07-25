const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))


let phonebook = [
    {
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
    }
]

const generateId = () => {
    const maxId = phonebook.length > 0 ?
        Math.max(...phonebook.map(n => n.id)) : 0

    return maxId + 1;
}

app.get('/', (request, response) => {
    response.send('<h1>This is phonebook.</h1>')

})

app.get('/api/persons', (request, response) => {
    response.send(phonebook)
})

app.get('/api/info', (request, response) => {
    const date = new Date();
    console.log(date)
    response.send(
        `<p>Phonebook has info for ${phonebook.length} people</p>
        <br />
        <p>${date}</p>`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const contact = phonebook.find(person => person.id == id)
    if(contact) {
        response.send(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const contact = phonebook.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body 
    if(phonebook.find(pb => pb.name === body.name)) {
        return response.status(400).json({
            error: 'name already exist'
        })
    }
    if(!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }
    else if(!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }
    else {
        const contact = {
            id: generateId(),
            name: body.name,
            number: body.number
        }
    
        phonebook = phonebook.concat(contact)
        response.json(contact)
    }
    
})
const PORT= process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})