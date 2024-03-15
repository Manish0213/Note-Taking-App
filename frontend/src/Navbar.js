import React, {useEffect,useState,useRef} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Navbar = ({showAlert,setNotes}) => {
  const navigate = useNavigate();
  const buttonRef = useRef(null);
  const [user,setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem('token');
    setNotes([]);
    showAlert("Logout Successfully","success");
    navigate('/login');
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchUserInfo();
    }
  }, [localStorage.getItem('token')]);

  const handleButtonClick = () => {
    buttonRef.current.click();
  }

  const fetchUserInfo = async () => {
    const response = await fetch(`http://localhost:5000/auth/userinfo`,{
      method: "GET",
      headers: {
        token: localStorage.getItem('token')
      }
    });
    const data = await response.json();
    console.log(data);
    setUser(data);
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="about">About</Link>
        </li>   
      </ul>
      <form className="d-flex">
        {localStorage.getItem('token') === null ? (
        <>
          <Link type="button" className="btn btn-primary" to="/login">Login</Link>
          <Link type="button" className="btn btn-primary mx-2" to="/signup">Signup</Link>
        </>
        ) : (<><button type="button" className="btn btn-primary mx-2" onClick={handleLogout}>Logout</button>
        {localStorage.getItem('token') !== null ? <>
        <div onClick={handleButtonClick}>
        <img
                  // src={user.imagePath} 
                  src={`http://localhost:5000/uploads/${user.imagePath}`}
                  alt="User Avatar"
                  className="rounded-circle"
                  style={{ width: '40px', height: '40px', marginRight: '10px' }}
                />
        </div>
        </> : null}</>
        )} 
      </form>
    </div>
  </div>
</nav>
<button type="button" ref={buttonRef} class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#navbarModal">
  Launch demo modal
</button>

<div class="modal fade" id="navbarModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content" style={{ backgroundColor: 'transparent', border: 'none', boxShadow: 'none' }}>
      <div class="modal-body">
      <img
                  // src={user.imagePath} 
                  src={`http://localhost:5000/uploads/${user.imagePath}`}
                  alt="User Avatar"
                  className="rounded-circle mx-auto d-block"
                  style={{ width: '300px', height: '300px', marginRight: '10px' }}
                />
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default Navbar
