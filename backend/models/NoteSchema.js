const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

const Note = mongoose.model('note',noteSchema);
module.exports = Note;