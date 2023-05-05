import axios from 'axios';
const KEY_API = '34319177-3d2304792b13ac083aa4cb62b';
axios.defaults.baseURL = `https://pixabay.com/api`;

export const fetchImages = async (inputValue, pageNr) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${inputValue}&page=${pageNr}&key=${KEY_API}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
