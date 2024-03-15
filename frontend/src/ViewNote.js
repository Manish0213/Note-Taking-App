import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ViewNoteCSS.css';

const ViewNote = () => {
    const { id } = useParams();
    const [note, setNote] = useState(null);

    const getNote = async () => {
        const response = await fetch(`http://localhost:5000/note/getnote/${id}`);
        const data = await response.json();
        setNote(data);
    }

    useEffect(() => {
        getNote();
      }, [id]);

      if (!note) {
        return <div>Loading...</div>;
      }

  return (
    <div className="view-note-container">
      <h2 className="view-note-title">{note.title}</h2>
      <p className="view-note-description" dangerouslySetInnerHTML={{ __html: note.description }}></p>
    </div>
  )
}

export default ViewNote
