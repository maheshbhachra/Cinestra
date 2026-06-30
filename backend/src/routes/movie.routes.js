const express = require('express')
const router = express.Router()
const movieController = require('../controllers/movie.controller')

router.get("/search", movieController.searchMovies)

router.get("/:tmdbId", movieController.getMovieDetails);    

module.exports = router