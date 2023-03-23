const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const checkAuth = require('./middleware/check-auth');
const { createUser, loginUser } = require('./controllers/users-controllers');
const trackController = require('./controllers/track-controller');
const playlistsController = require('./controllers/playlist-controller');
const app = express();

mongoose.connect('mongodb+srv://deep:deep@cluster0.xuwb6.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(cors());

app.post('/users/signup', createUser);
app.post('/users/login', loginUser);
app.get('/users',checkAuth,(req, res) => {
  return res.status(201)
})
app.get('/track', trackController.getTracks);
app.get('/track/:userId', trackController.getTracksByUserId);
app.delete('/track', trackController.deleteTracks);
app.post('/track',trackController.createTrack);

app.get('/playlists/:userId',checkAuth, playlistsController.getPlaylistById)
app.post('/playlists', playlistsController.createPlaylist)
app.put('/playlists/:userId',playlistsController.updatePlaylist)

const port = 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
