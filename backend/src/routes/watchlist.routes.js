const express = require('express')
const router = express.Router()
const { authUser } = require('../middlewares/auth.middleware')
const { addToWatchlist, removeFromWatchlist, getMyWatchlist, } = require("../controllers/watchlist.controller")

router.post("/", authUser, addToWatchlist)
router.delete("/:movieId", authUser, removeFromWatchlist)
router.get("/", authUser, getMyWatchlist)

module.exports = router