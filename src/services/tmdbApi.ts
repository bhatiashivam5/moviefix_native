// src/services/tmdbApi.ts
import axios from 'axios';

export const fetchMovies = async (
  year: number | null,
  page: number = 1,
  with_genres: number[],
) => {
  const params = {
    api_key: process.env.API_KEY,
    sort_by: 'popularity.desc',
    with_genres: with_genres?.join(','),
    primary_release_year: year,
    vote_count_gte: 100,
    page,
  };
  const response = await axios.get(`${process.env.BASE_URL}/discover/movie`, {
    params,
  });
  return response.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${process.env.BASE_URL}/genre/movie/list`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });
  return response.data.genres;
};
