import axios from 'axios';

export default {

    find: async (query, page = 1) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&${query}`
      );
      return response.data;
  },
  
};
