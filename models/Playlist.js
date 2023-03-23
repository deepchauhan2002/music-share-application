const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  playlistName: {
    type: String,
  },
  userId: {
    type: String,
  },
  tracks: [
    {
      trackName: {
        type: String,
        required: true,
      },
      audioFile: {
        type: String,
        required: true,
      },
      albumArt: {
        type: String,
        required: true,
      },
      artistName: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Playlist = mongoose.model("Playlist", PlaylistSchema);