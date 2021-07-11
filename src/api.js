const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';
const RANDOM_API_ENDPOINT = 'https://api.thecatapi.com/v1';

const request = async url => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const api = {
  fetchCats: keyword => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },
  fetchRandom: () => {
    return request(`${API_ENDPOINT}/images/search?limit=100`);
  }
};

export default api;
