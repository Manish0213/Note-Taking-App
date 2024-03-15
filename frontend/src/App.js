// import './App.css';
import { useEffect, useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import About from "./About";
import ViewNote from "./ViewNote";
import EditNote from "./EditNote";
import Alert from "./Alert";
import DOMPurify from 'dompurify';

function App() {
  const [notes,setNotes] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(()=>{
      setAlert(null);
    },1500);
    console.log("fucntion called");
  }

  const fetchNote = async () => {
    try{
      const response = await fetch(`http://localhost:5000/note/getallnotes`,{
        method: "GET",
        headers: {
          token: localStorage.getItem('token')
        }
      });
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.log("error getting notes", error);
    }
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNote();
    }
  }, [localStorage.getItem('token')]);

  const createNote = async (formData) => {
    console.log(formData);
    const htmlDesription = DOMPurify.sanitize(formData.description);
    console.log(htmlDesription);
    try{
      const response = await fetch(`http://localhost:5000/note/createnote`,{
          method: "POST",
          body: JSON.stringify({title: formData.title, description: htmlDesription}),
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem('token')
          }
      });
      const data = await response.json();
      const newNotes = [...notes,data];
      setNotes(newNotes);
      showAlert("Note Created Successfully","success");
    } catch(error) {
      console.log("error fetching Notes",error);
    }
  }

  const deleteNote = async (delId) => {
    const response = await fetch(`http://localhost:5000/note/deletenote/${delId}`,{
      method: "DELETE"
    });
    const data = await response.json();
    console.log(data);
    const newNotes = notes.filter((note)=>note._id!==delId);
    setNotes(newNotes);
    showAlert("Note Deleted Successfully","danger");
  }

  const updateNote = async (updatedNote) => {
    const {id, title, description} = updatedNote;
    try{
      const response = await fetch(`http://localhost:5000/note/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description })
      });
      const data = await response.json();
    } catch (error) {
      console.log("error updating notes", error);
    }

    const newNotes = JSON.parse(JSON.stringify(notes));

    for(let index=0; index<newNotes.length; index++){
      const element = newNotes[index];
      if(element._id === updatedNote.id){
         newNotes[index].title = title;
         newNotes[index].description = description;
         setNotes(newNotes);
         break;
      }
    }
    showAlert("Note Updated Successfully","success");
  }

  return (
    <Router>
      <Navbar showAlert={showAlert} setNotes={setNotes} />
      {alert !== null ? <Alert alert={alert} /> : null}
      <Routes>
        <Route path="/" element={<Home notes={notes} deleteNote={deleteNote} createNote={createNote} />}/>
        <Route path="/login" element={<Login showAlert={showAlert}/>}/>
        <Route path="/signup" element={<Signup showAlert={showAlert}/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/viewnote/:id" element={<ViewNote/>}/>
        <Route path="/editnote/:id" element={<EditNote updateNote={updateNote} />}/>
      </Routes>
    </Router>
  );
}

export default App;
