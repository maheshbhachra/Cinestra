const mongoose = require('mongoose')

const dairySchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    movie:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Movie",
        required: true,
    },
    watchedDate:{
        type: Date,
        required: true
    },
    rewatch:{
        type: Boolean,
        default: false,
    },
},
{applyTimestamps: true}
)

const dairyModel = mongoose.model("Dairy", dairySchema)

module.exports = dairyModel