// track.controller.js
const Track = require('../models/Track');

// Define function to handle POST request to create new track
const createTrack = async (req, res) => {
  try {
    const { trackName, artistName, userId,audioFile, albumArt } = req.body;

    const track = new Track({
      trackName:trackName,
      artistName: artistName,
      userId: userId,
      audioFile: audioFile,
      albumArt: albumArt
    });

    await track.save();
    res.status(201).json(track);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create track!' });
  }
};

const getTracks = async (req, res, next) => {
  try {
    const tracks = await Track.find({}, '_id name userId artistName albumArt') // Use projection to return only the required fields
      .limit(50) // Limit the number of documents returned
      .sort({ name: 1 }); // Sort the documents by name
    res.json(tracks);
  } catch (err) {
    next(err);
  }
}

const getTracksByUserId = async (req, res, next) => {
  try {
    const tracks = await Track.find({ userId: req.params.userId }).limit(50);
    res.json(tracks);
  } catch (err) {
    next(err);
  }
}

const deleteTracks = async (req, res, next) => {
  try {
    await Track.deleteMany({});
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createTrack,getTracks,getTracksByUserId,deleteTracks };
