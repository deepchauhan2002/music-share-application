const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
  trackName: String,
  artistName: String,
  userId: String,
  audioFile: String,
  albumArt: String
});

module.exports = mongoose.model('Track', trackSchema);