const express = require('express')
const router = express.Router()
const Note = require('../models/NoteSchema.js');
const fetchUser = require('../middleware/fetchUserMiddleware.js');

router.post('/createnote', fetchUser, async (req, res) => {
    try{
        const {title, description} = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const note = new Note({ title, description, userId : req.user.id });
        const newNote = await note.save();
        res.send(newNote);
    } catch(error){
        console.log('error creating note',error);
    }
})

router.get('/getallnotes', fetchUser, async (req,res) => {
    const notes = await Note.find({userId : req.user.id});
    res.send(notes);
})

router.delete('/deletenote/:id', async (req,res) => {
    const delId = req.params.id;
    const deletedNote = await Note.findOneAndDelete({ _id: delId })
    res.send(deletedNote);
})

router.get('/getnote/:id', async (req,res) => {
    const noteId = req.params.id;
    const note = await Note.findOne({_id: noteId });
    res.send(note);
})

router.put('/updatenote/:id', async (req,res) => {
    const noteId = req.params.id;
    console.log(noteId);
    const {title,description} = req.body;
    console.log(req.body);
    console.log(title,description);
    const updatedNote = await Note.updateOne({ _id: noteId }, { $set: { title, description } }, { upsert: true });
    res.send(updatedNote);
})

module.exports = router