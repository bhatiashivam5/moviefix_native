import axios from 'axios';

// Define the structure of the movie and genre data
interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre_ids: number[];
  vote_average: number;
  poster_path: string;
}

interface Genre {
  id: number;
  name: string;
}

// Fetch movies from TMDb API
export const fetchMovies = async (
  year: number | null,
  page: number = 1,
  with_genres: number[] = [],
): Promise<Movie[]> => {
  try {
    const params = {
      api_key: process.env.API_KEY as string,
      sort_by: 'popularity.desc',
      with_genres: with_genres.join(','),
      primary_release_year: year ?? undefined,
      vote_count_gte: 100,
      page,
    };

    const response = await axios.get(`${process.env.BASE_URL}/discover/movie`, {
      params,
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

// Fetch genres from TMDb API
export const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await axios.get(
      `${process.env.BASE_URL}/genre/movie/list`,
      {
        params: {
          api_key: process.env.API_KEY as string,
        },
      },
    );
    return response.data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    return [];
  }
};
