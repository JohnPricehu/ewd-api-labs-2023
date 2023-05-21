import axios from "axios";

export default {
    getActor: async(personId) => {
        const response = await axios.get(`https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.TMDB_KEY}`);
        return response.data;
    },
    find: async (query, page = 1) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/popular?api_key=${process.env.TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}&${query}`
        );
        return response.data;
    },
    getActorMovies: async (personId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${personId}/movie_credits?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
    getActorImages: async (personId) => {
        const response = await axios.get(
            `https://api.themoviedb.org/3/person/${personId}/images?api_key=${process.env.TMDB_KEY}`
        );
        return response.data;
    },
};