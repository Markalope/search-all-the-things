import  { get } from './request';
const API_KEY = 'd559a426';
const API_QUERY = `api_key=${API_KEY}`;
const BASE_URL = 'http://www.omdbapi.com/?i=tt3896198';
const EVERYTHING_URL = `${BASE_URL}/?${API_QUERY}`;

const getUrl = url => {
  const json = window.localStorage.getItem(url);
  if(json) {
    const response = JSON.parse(json);
    return Promise.resolve(response);
  }

  return get(url)
    .then(response => {
      window.localStorage.setItem(url, JSON.stringify(response));
      return response;
    });
};

export function search({ search }, { page }) {
  const searchTerm = `&s=${search}`;
  const paging = `&page=${page}`;

  return get(`${EVERYTHING_URL}&${searchTerm}${paging}`);
}

export function getMovies(id) {
  if(id) {
    return getUrl(`${EVERYTHING_URL}&i=${id}`);
  }
  else {
    return getUrl(EVERYTHING_URL);
  }
}