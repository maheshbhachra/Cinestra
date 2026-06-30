const watchlistModel = require('../models/watchlist.model')

const addToWatchlist = async (req,res) =>{
    try {
        const {movieId} = req.body

        if(!movieId){
            return res.status(400).json({message: "movieId is required"})
        }

        const entry = await watchlistModel.create({
            user: req.user._id,
            movie: movieId,
        })
        
        res.status(201).json(entry)

    }catch(error){
        if(error.code === 11000 ){
            return res.status(400).json({message: "Movie is already in watchlist"})
        }
    }
}

const removeFromWatchlist = async (req, res) =>{
    try{
        const {movieId} = req.params

        const entry = await watchlistModel.findOneAndDelete({
            user: req.user._id,
            movie: movieId
        })

        if(!entry){
            res.status(404).json({message: "Watchlist entry not found"})
        }

        res.status(200).json({message: "Removed from watchlist"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getMyWatchlist = async (req, res) => {
    try {
        const entries = await watchlistModel
            .find({ user: req.user._id })
            .populate("movie")
            .sort({ createdAt: -1 })

        res.status(200).json(entries)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { addToWatchlist, removeFromWatchlist, getMyWatchlist }