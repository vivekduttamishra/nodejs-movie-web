
const MovieRepository = require('./movie-repository');
let movieRepository = new MovieRepository();

//-------- helpers
let sendJson = (res, data, status = 200) => {
    res
        .status(status)
        .contentType("application/json")
        .send(data);
}

let send404 = (req, res, message = null) => {
    sendJson(res, { url: req.url, "not-found": message }, 404);
}
//--------


//---> GET /movies
let getAllMovies = async (req, res, next) => {
    let movies = await movieRepository.getAll();
    sendJson(res, movies);
}

// ---> POST /movies
let addMovie = async (req, res) => {
    let movie = req.body;
    await movieRepository.add(movie);
    sendJson(res, movie, 201);
}

//---> GET /movies/tt1234
let getMovieById = async (req, res, next) => {
    let movie = await movieRepository.getById(req.params.id);
    if (movie)
        sendJson(res, movie);
    else {
        send404(req, res, `movie id ${req.params.id}`);
    }
}

//---> PUT /movies/tt1234
let updateMovie = async (req, res) => {
    let movie = req.body;
    await movieRepository.update(req.params.id,movie);
    sendJson(res, movie, 202);
}
//---> DELETE /movies/tt1234
let deleteMovie = async (req, res) => {
    await movieRepository.delete(req.params.id);
    sendJson(res, {}, 204);
}


//Let us connect the functions to express

//lets define a Unqiue set of routes (url set and its handler)
// for movie api

const express = require('express');

let router = express.Router();

router.get("/movies", getAllMovies)
    .post("/movies", addMovie)

    .get('/movies/:id', getMovieById)
    .put('/movies/:id', updateMovie)
    .delete('/movies/:id', deleteMovie);

module.exports = router;


