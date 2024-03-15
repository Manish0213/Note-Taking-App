import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = ({showAlert}) => {
  const navigate = useNavigate();
  const [formData,setFormData] = useState({email: "", password: ""});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);

    const response = await fetch(`http://localhost:5000/auth/login`,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await response.json();
    if(data.success === true){
    localStorage.setItem('token', data.authToken);
    console.log(localStorage.getItem('token'));
    showAlert("Login Successfully","success");
    navigate('/');
    } else {
      showAlert("Invlid Crediantials","danger");
    }
  }

  return (
    <div className='container my-3'>
      <form onSubmit={handleSubmit} >
    <div className="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" value={formData.email} onChange={handleChange}/>
    </div>
    <div className="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" value={formData.password} onChange={handleChange}/>
    </div>
    <button type="submit" className="btn btn-primary my-3">Submit</button>
  </form>
    </div>
    
  )
}

export default Login
