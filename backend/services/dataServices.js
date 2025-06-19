
const NoteModelFactory = require('../models/datamodel');

exports.createNote = async (db, data) => {
  const Note = NoteModelFactory(db);
  const note = new Note(data);
  return await note.save();
};

exports.getNotes = async (db, userId) => {
  const Note = NoteModelFactory(db);
  return await Note.find({ createdBy: userId });
};
