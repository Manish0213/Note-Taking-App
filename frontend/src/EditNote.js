import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditNote = ({updateNote}) => {
    const { id } = useParams();
    const [formData, setFormData] = useState(null);

    const getNote = async () => {
        const response = await fetch(`http://localhost:5000/note/getnote/${id}`);
        const data = await response.json();
        setFormData({
            id: data._id,
            title: data.title,
            description: data.description,
          });
    }

    useEffect(() => {
        getNote();
      }, [id]);

      if (!formData) {
        return <div>Loading...</div>;
      }

      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
          ...formData,
          [name]: value,
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateNote(formData);
        console.log("fsdfsd");
    }

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
  <div class="form-group my-3">
    <label for="exampleInputEmail1">Edit Title</label>
    <input type="text" class="form-control" name="title" value={formData.title} onChange={handleChange} />
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Edit Description</label>
    <textarea type="text" class="form-control" rows={10} cols={40} name="description" onChange={handleChange} value={formData.description} />
  </div>
  <button type="submit" class="btn btn-primary my-3">Update</button>
</form>
    </div>
  )
}

export default EditNote
