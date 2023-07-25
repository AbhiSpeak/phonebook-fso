import Person from "./Person"
const Persons = ({persons, filter, deleteDetail }) => {
    return (
      <div>
        {persons.filter((person) => 
          person.name.toLowerCase().includes(filter.toLowerCase())
          )
          .map((filteredPerson) => (
            <Person key={filteredPerson.id} person={filteredPerson} deleteDetail={() => deleteDetail(filteredPerson)}/>
          ))}
      </div>
    )
}

export default Persons