import React,{useState, useEffect} from "react";
import UploadPlaylistCard from "../util/UploadPlayListCard";
import PlaylistCard from "../util/PlayListCard";
import './PlayList.css'
import { getPlaylists } from "../services/UserService";
import { ThreeDots } from "react-loader-spinner";
const PlayList = (props) => {
  const [playList, setPlayList] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  useEffect(() => {
    const fetchPlaylist = async () => {
      setLoading(true);
      const token = localStorage.getItem('token')
      const playlistData = await getPlaylists(userId,token);
      setPlayList(playlistData);
      setLoading(false);
    };
    fetchPlaylist();
  },[]);
  return (
      <>
      {loading ? (
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            wrapperClassName=""
            visible={true}
          />
      ) : (
      <div className="playlist" style={{ marginLeft:'100px', marginTop:'30px' }}>
        <div className="left-column">
          <h1>Your saved playlists</h1>
          <div className="playlist-list" style={{ overflowY: "scroll", height: "500px" }}>
            {playList.map((playlist)=><PlaylistCard playlist={playlist}/>)}
          </div>
        </div>
        <div className="right-column" style={{ overflowY: "scroll", height: "600px", padding:'10px' }}>
          <UploadPlaylistCard userId={userId}/>
        </div>
      </div>
  )};
  </>
)}

export default PlayList