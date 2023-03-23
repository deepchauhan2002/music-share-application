import axios from 'axios';

const API_URL = 'http://localhost:4000';

export const login = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/users/login`, user);
        return response.data;
      } catch (error) {
        console.error(error);
        throw error;
      }
  };

export const signup = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users/signup`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSong = async (data) => {
    try {
      const response = await axios.post(`${API_URL}/track`, data);
      
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  export const getSongs = async () => {
    try {
      const response = await axios.get(`${API_URL}/track`);
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  export const getSongsByUserId = async (userId,token) => {
    try {
      const response = await axios.get(`${API_URL}/track/${userId}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }});
      return response;
    } catch (error) {
      console.error(error);
    }
  }

export const postPlaylists = async (playlist) => {
  try {
    const response = await axios.post(`${API_URL}/playlists`,playlist);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const updatePlaylist = async (playlist,userId) => {
  try {
    const response = await axios.put(`${API_URL}/playlists/${userId}`,playlist);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const getPlaylists = async (userId,token) => {
  try {
    const response = await axios.get(`${API_URL}/playlists/${userId}`,{
    headers: {
      'Authorization': `Bearer ${token}`
    }});
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const checkAuth = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/users`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }});
    return response;
  } catch (error) {
    console.error(error);
  }
}
