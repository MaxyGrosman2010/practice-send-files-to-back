import { useState } from 'react';
import axios from 'axios';

function App() {
  const [submit, setSubmit] = useState({
    file: '',
    name: '',
  });
  const formData = new FormData();

  const handleChange = (event) => {
    setSubmit({
      ...submit,
      [event.target.name]: event.target.value
    });
  };

  const handleFile = (event) => {
    console.log(submit, 'edit on handleFile')
    console.log(event.target.files, 'event.target.files on handleFile');
    setSubmit({
      ...submit,
      file: event.target.files[0]
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    formData.append('file', submit.file);
    formData.append('name', submit.name);

    for(let pair of formData.entries()) 
      console.log(`${pair[0]}: ${pair[1]}`); // ver form data
    
    console.log('^Form Data guardada');

    axios.post('http://localhost:3001/prueba', formData).then((data) => {console.log(data.data)});

    setSubmit({
      file: '',
      name: ''
    });
  };

  console.log(submit, 'ver mi imagen');

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >name</label>
        <input type="text" name='name' value={submit.name} onChange={handleChange} ></input>
        <label >info</label>
        <input type="file" name="file" onChange={handleFile}  />
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default App
