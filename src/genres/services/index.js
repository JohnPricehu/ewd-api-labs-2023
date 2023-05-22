import axios from 'axios';

export default {

    find: async (query) => {
      const response = await axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&${query}`
      );
      return response.data;
  },
  
};
