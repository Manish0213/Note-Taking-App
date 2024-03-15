import React, { useState } from 'react'

const AddNote = ({createNote}) => {
    const [formData, setFormData] = useState({title: "", description: ""});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        createNote(formData);
        setFormData({title: "", description: ""});
    }

  return (
    <div className='container my-3'>
    <form onSubmit={handleSubmit}>
  <div className="form-group my-2">
    <label htmlFor="exampleInputEmail1">Enter Title</label>
    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter Your title" name="title" value={formData.title} onChange={handleChange}/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Enter Description</label>
    <textarea type="text" rows={6} cols={4} className="form-control" id="exampleInputPassword1" placeholder="enter your description" name="description" value={formData.description} onChange={handleChange}/>
  </div>
  <button type="submit" className="btn btn-primary my-3">Submit</button>
    </form>
    </div>
  )
}

export default AddNote
