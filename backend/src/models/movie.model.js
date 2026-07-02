const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    tmdbId: {
      type: Number,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    posterPath: String,
    overview: String,
    releaseDate: String,
    genres: [String],
    backdropPath: String,
  },
  { timestamps: true }
)

const movieModel = mongoose.model("Movie", movieSchema)

module.exports = movieModel