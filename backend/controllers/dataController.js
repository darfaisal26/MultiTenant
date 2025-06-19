

const noteService = require('../services/dataServices');

exports.createNote = async (req, res) => {
  try {
    const note = await noteService.createNote(req.db, {
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.userId,
    });
    res.status(201).json({ message: 'Note created', note });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to create note', error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotes(req.db, req.user.userId);
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get notes', error: err.message });
  }
};
