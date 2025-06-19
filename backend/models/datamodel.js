const mongoose = require('mongoose');

module.exports = (conn) => {
  if (conn.models && conn.models.Note) return conn.models.Note;

  const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  });

  return conn.model('Note', noteSchema);
};
