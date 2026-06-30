const mongoose = require('mongoose')

const watchlistSchema = new mongoose.Schema({
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
},
    {timestamps: true}
)

// prevent the same user adding the same movie twice
watchlistSchema.index({ user: 1, movie: 1 }, { unique: true });

const watchlistModel = mongoose.model("Watchlist", watchlistSchema)

module.exports = watchlistModel