const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const checkAuth = require('./middleware/check-auth');
const { createUser, loginUser } = require('./controllers/users-controllers');
const trackController = require('./controllers/track-controller');
const playlistsController = require('./controllers/playlist-controller');
const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('frontend/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html')));
  }
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
