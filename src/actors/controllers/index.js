import actorsService from "./../services";

export default (dependencies) => {

    const getActor = async (request, response, next) => {
        const actorId = request.params.id;
        const actor = await actorsService.getActor(actorId, dependencies);
        response.status(200).json(actor);
    };

    const find = async (request, response, next) => {
        const query = request.query;
        const actors = await actorsService.find(query, dependencies);
        response.status(200).json(actors);
    };

    const getActorMovies = async (request, response, next) => {
        const actorId = request.params.id;
        const movies = await actorsService.getActorMovies(actorId, dependencies);
        response.status(200).json(movies);
    };

    const getActorImages = async (request, response, next) => {
        const actorId = request.params.id;
        const images = await actorsService.getActorImages(actorId, dependencies);
        response.status(200).json(images);
    };

    return {
        getActor,
        find,
        getActorMovies,
        getActorImages,
    };
};
