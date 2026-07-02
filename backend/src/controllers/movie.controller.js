const movieModel = require('../models/movie.model')
const axios = require('axios')

const searchMovies = async (req, res) => {
    try{
        const {query} = req.query

        if(!query){
            return res.status(400).json({message: "Search query is required"})
        }

        const response = await axios(`${process.env.TMDB_BASE_URL}/search/movie`, {
            params :{
                api_key: process.env.TMDB_API_KEY,
                query,
            }
        })
        res.status(200).json(response.data.results)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getMovieDetails = async (req, res) => {
  try {
    const { tmdbId } = req.params;

    let movie = await movieModel.findOne({ tmdbId });

    if (!movie) {
      const response = await axios(`${process.env.TMDB_BASE_URL}/movie/${tmdbId}`, {
        params: { api_key: process.env.TMDB_API_KEY },
      });

      const data = response.data;

      movie = await movieModel.create({
        tmdbId: data.id,
        title: data.title,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
        overview: data.overview,
        releaseDate: data.release_date,
        genres: data.genres.map((g) => g.name),
      });
    }

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPopularMovies = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        page: 1,
      },
    })
    res.status(200).json(response.data.results)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = { searchMovies, getMovieDetails, getPopularMovies}
