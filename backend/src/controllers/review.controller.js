const reviewModel = require('../models/review.model')
const movieModel = require('../models/movie.model')

const addReview = async (req,res) => {
    try{
        const {movieId, ratingTier, reviewText} = req.body

        if(!movieId || !ratingTier){
            return res.status(400).json({meaage: "movieId and ratingTier are required"})
        }

        const entry = await reviewModel.create({
            user: req.user._id,
            movie: movieId,
            ratingTier,
            reviewText
        })

        res.status(201).json(entry)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const updateReview = async (req, res) => {
    try{
        const {id} = req.params
        const {ratingTier, reviewText} = req.body
 
        const review = await reviewModel.findOneAndUpdate(
            { _id: id, user: req.user._id },
            { ratingTier, reviewText },
            { new: true }
        )

        if(!review){
            return res.status(404).json({message: "Review not found"})
        }

        res.status(200).json({message: "review updated successfully"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteReview = async (req, res) => {
    try{
        const { id } = req.params

        const entry = await reviewModel.findOneAndDelete({
            _id: id,
            user: req.user._id,
        })

        if(!entry){
            return res.status(404).json({message: "Review not found"})
        }

        res.status(200).json({message: "Review deleted"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

// const getMovieReviews = async (req,res) =>{
//     try{
//         const { movieId } = req.params

//         const reviews = await reviewModel
//             .find({movie: movieId, status: "active"})
//             .populate("user" , "username")
//             .sort({ createdAt: -1 })

//         res.status(200).json(reviews)
//     }catch(error){
//         res.status(500).json({message: error.message})
//     }
// }

const getMovieReviews = async (req, res) => {
  try {
    const { movieId } = req.params

    // movieId here is actually tmdbId from the URL
    const movie = await movieModel.findOne({ tmdbId: movieId })

    if (!movie) {
      return res.status(200).json([]) // no movie cached = no reviews
    }

    const reviews = await reviewModel
      .find({ movie: movie._id, status: "active" })
      .populate("user", "username")
      .sort({ createdAt: -1 })

    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getMyReviews = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({ user: req.user._id })
      .populate("movie", "title posterPath tmdbId")
      .sort({ createdAt: -1 })
    res.status(200).json(reviews)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}


module.exports = { addReview, updateReview, deleteReview, getMovieReviews, getMyReviews}