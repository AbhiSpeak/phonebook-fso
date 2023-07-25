const Form = ({handleSubmit, nameValue, numberValue, handleNameChange, handleNumberChange}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={nameValue} onChange={handleNameChange} />
        </div>
        <div>
          Number: <input value={numberValue} onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
    )
  }

export default Form