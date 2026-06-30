const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/auth.middleware')
const {
    addReview,
    updateReview,
    deleteReview,
    getMovieReviews
} = require('../controllers/review.controller')

router.post('/', authUser, addReview)
router.put('/:id', authUser, updateReview)
router.delete('/:id', authUser, deleteReview)
router.get('/movie/:movieId', getMovieReviews)

module.exports = router