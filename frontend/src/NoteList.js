import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

const NoteList = ({ notes,deleteNote }) => {
  const buttonRef = useRef(null);
  const closeModalRef = useRef(null);

  const [note, setNote] = useState();

  const handleButtonClick = (note) => {
    buttonRef.current.click();
    setNote(note);
  }

  const handleDelete = () => {
    deleteNote(note._id);
    closeModalRef.current.click();
  }

  return (
    <>
    <div className="row">
      {notes.map((note) => (
         <div className="card mx-3 my-3" style={{ width: "15rem" }} key={note._id} to={`/viewnote/${note._id}`} >
           <div className="card-body">
             <h5 className="card-title">{note.title}</h5>
             <p className="card-text">
             {note.description.slice(0,23)+'...'}
             </p>
             <Link to={`/editnote/${note._id}`}><i className="fa-solid fa-pen-to-square"></i></Link>
             <i className="fa-solid fa-trash mx-3" onClick={()=>handleButtonClick(note)}></i>
             <Link to={`/viewnote/${note._id}`} ><i className="fa-solid fa-book-open"></i></Link>
           </div>
         </div> 
       ))} 
    </div>

    <button type="button" ref={buttonRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Are You Sure?</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-footer">
        <button type="button" ref={closeModalRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
};

export default NoteList;



