const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true
    },
    ratingTier: {
        type: String,
        enum: ["masterpiece", "must_watch", "timepass", "skip"],
        required: true
    },
    reviewText: {
        type: String,
        trim: true,
        maxlength: 2000
    },
    status:{
        type: String,
        enum: ["active", "flagged"],
        default: "active"
    },
},
{timestamps: true}
)

// one review per user per movie (like Moctale — you can edit it, not duplicate it)
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });

const reviewModel = mongoose.model("Review", reviewSchema)

module.exports = reviewModel