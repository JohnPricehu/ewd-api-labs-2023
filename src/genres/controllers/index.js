import genresService from "./../services";

export default (dependencies) => {

    const find = async (request, response, next) => {
        const query = request.query;
      // Treatment
      const genres = await genresService.find(query, dependencies);
      //output
      response.status(200).json(genres);
  };

      
    return {
        find
    };
};
