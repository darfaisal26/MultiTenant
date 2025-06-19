const NoteModelFactory = require('../models/datamodel');

exports.createNote = async (req, res) => {
  try {
    const Note = NoteModelFactory(req.db);
    const note = new Note({
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.userId,
    });
    await note.save();
    res.status(201).json({ message: 'Note created', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const Note = NoteModelFactory(req.db);
    const notes = await Note.find({ createdBy: req.user.userId });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get notes', error: err.message });
  }
};
