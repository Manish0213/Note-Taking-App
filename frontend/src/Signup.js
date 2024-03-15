import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Signup = ({showAlert}) => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cPassword: "",
    imagePath: null,
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "imagePath" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();

    // Append form fields to FormData
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("cPassword", formData.cPassword);
    formDataToSend.append("imagePath", formData.imagePath);

    const response = await fetch(`http://localhost:5000/auth/signup`,{
        method: "POST",
        // headers: {
        //   Content-Type: 'multipart/form-data'
        // },
        body: formDataToSend
    })
    const data = await response.json();
    console.log(response);

    if(response.status===470){
      return showAlert("Password and confirm password do not match","danger");
    }

    if(response.status===404){
      return showAlert("User already exits with this email","danger");
    }

    localStorage.setItem('token', data.authToken);
    showAlert("SignUp Successfully","success");
    navigate('/');
  }

  return (
    <div className="container my-2">
      <form onSubmit={(event)=>handleSubmit(event)}>
        <div className="form-group">
          <label for="exampleInputPassword1">Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Your Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="cPassword"
            value={formData.cPassword}
            onChange={handleChange}
          />
        </div>
        <div className="form-group my-1">
          <label for="exampleFormControlFile1">Add Your Image</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
            name="imagePath"
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
