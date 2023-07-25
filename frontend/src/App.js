import { useEffect, useState } from 'react'
import Filter from './components/Filter.js'
import Form from './components/Form.js'
import Persons from './components/Persons.js'
import phoneservice from './services/phonebook.js'
import './index.css'
import axios from 'axios'





const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '999-999-999', id: 1}
  ]) 
  const [newName, setNewName] = useState('Enter the name')
  const [newNumber, setNewNumber] = useState('xxx-xxx-xxx')
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)
  const [notifType, setNotifType] = useState('')
  
  useEffect(() => {
    phoneservice
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }, [])

  const Notification = ({message, notifType}) => {
    if(message === null)
      return null
    return (
      <div className={notifType}>
        {message}
      </div>
    )
  }
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,

    }
    const existingNames = persons.map(person => person.name)
    if(existingNames.includes(newName)) {
      const msg = `The ${newName} already exists. Want to update it?`
      const confirm = window.confirm(msg)
      if(confirm) {
        updateName(nameObject)
      }
    }
    else {
      phoneservice
        .create(nameObject)
        .then(newPersons => {
        setPersons(persons.concat(newPersons))
        setNewName('Enter new name')
        setNewNumber('Enter new number')
        setNotification(`${newPersons.name} has been added...`)
        setNotifType('info')
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }
  const updateName = (nameObject) => {
    const updatePerson = persons.find(person => person.name === nameObject.name)
    const updateId = updatePerson.id
    phoneservice
      .update(updateId, nameObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== updateId ? person : returnedPerson))
          setNotification(`The name ${nameObject.name} has been updated...`)
          setNotifType('info')
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        }).catch(error => {
          setNotification(`The name has been not updated`)
          setNotifType('error')
          setTimeout(() => {
            setNotification(null)
          }, 3000)
        })
    
  }
  const deleteDetail = (person) => {
    const msg =`Delete ${person.name} ?`
    const confirm = window.confirm(msg)
    if(confirm) {
      phoneservice.deleted(person.id)
        .then(persons => 
          setPersons(persons))
    }
  }

  const handleValueChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} notifType={notifType} />
      <Filter filter={filter} onFilterChange={handleFilterChange} />
      <h2>add a new </h2>
      <Form 
        handleSubmit={addName} 
        nameValue={newName}
        numberValue={newNumber}
        handleNameChange={handleValueChange}
        handleNumberChange={handleNumberChange} />


      
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deleteDetail={deleteDetail}/>
      
    </div>
  )
}

export default App