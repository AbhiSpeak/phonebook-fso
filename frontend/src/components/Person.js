
const Person = ({ person, deleteDetail }) => {
    return (
      <div>
        {person.name} {person.number} 
        <button onClick={deleteDetail}>delete</button>
      </div>
    )
}

export default Person 