import React, {useState,useEffect} from 'react'
import AddNote from './AddNote'
import NoteList from './NoteList'
import { useNavigate } from 'react-router-dom';

const Home = ({notes,deleteNote,createNote}) => {

  const navigate = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
  }, []);

  return (
    <>
    <div className='container'>
    <AddNote createNote={createNote} />
    <NoteList notes={notes} deleteNote={deleteNote} /> 
    </div>
    
    </>
  )
}

export default Home
