import axios from 'axios';

const BASE_URL = 'https://api.rawg.io/api';
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

console.log('RAWG API Key:', API_KEY); // Debugging line to check if the key is loaded correctly

export const fetchGames = async (page = 1, pageSize = 20) => {
  return axios
    .get(`${BASE_URL}/games`, {
      params: {
        key: API_KEY,
        page,
        page_size: pageSize,
      },
    })
    .then(res => res.data);
};
