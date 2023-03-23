const Playlist = require('../models/Playlist');

const getPlaylistById = async (req, res, next) => {
    try {
      const tracks = await Playlist.find({ userId: req.params.userId }).limit(50);
      res.json(tracks);
    } catch (err) {
      next(err);
    }
  }

const createPlaylist = async (req, res, next) => {
    try {
        const { playlistName,tracks,userId } = req.body;
        const playlist = new Playlist({
            playlistName:playlistName,
            tracks:tracks,
            userId:userId,
        });
        await playlist.save();
        res.status(201).json({
          success: true,
          data: playlist,
        });
      } catch (err) {
        res.status(400).json({
          success: false,
          error: err.message,
        });
      }
    };

const updatePlaylist = async (req,res,next) => {
    try {
        const { userId } = req.params;
        const { playlist } = req.body;
        const updatedPlaylist = await Playlist.findOneAndUpdate(
          { userId },
          { ...playlist },
          { new: true, upsert: true }
        );
        res.json(updatedPlaylist);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
      }
}

module.exports={ createPlaylist,getPlaylistById,updatePlaylist }