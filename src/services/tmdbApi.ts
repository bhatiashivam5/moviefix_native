// src/services/tmdbApi.ts
import axios from 'axios';

const API_KEY = '2dca580c2a14b55200e784d157207b4d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (year: number, page: number = 1) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      sort_by: 'popularity.desc',
      primary_release_year: year,
      vote_count_gte: 100,
      page,
    },
  });
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.genres;
};
