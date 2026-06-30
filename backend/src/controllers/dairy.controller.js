const dairyModel = require('../models/dairy.model')

const addDairyEntry = async (req, res) => {
    try{
        const {movieId, watchedDate, rewatch } = req.body

        if(!movieId || !watchedDate){
            res.status(400).json({message:"movieId and watchedDate are required"})
        }

        const entry = await dairyModel.create({
            user: req.user._id,
            movie: movieId,
            watchedDate,
            rewatch: rewatch || false,
        })

        res.status(201).json(entry)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const getMyDairy = async (req,res) => {
    try{
        const entries = await dairyModel
            .find({user : req.user._id})
            .populate("movie")
            .sort({watchedDate: -1})

        res.status(200).json(entries)

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const deleteDairyEntry = async (req, res ) => {
    try{
        const { id } = req.params

        const entry = await dairyModel.findOneAndDelete({
            _id: id,
            user: req.user._id,
        })

        if(!entry){
            return res.status(404).json({message: "Dairy entry not found"})
        }

        res.status(200).json({message: "Dairy entry deleted"})

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

module.exports = { addDairyEntry, getMyDairy, deleteDairyEntry }