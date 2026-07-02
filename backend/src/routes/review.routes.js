const express = require('express')
const router = express.Router()
const {authUser} = require('../middlewares/auth.middleware')
const {
    addReview,
    updateReview,
    deleteReview,
    getMovieReviews,
    getMyReviews
} = require('../controllers/review.controller')

router.get("/user/me", authUser, getMyReviews)
router.get('/movie/:movieId', getMovieReviews)
router.post('/', authUser, addReview)
router.put('/:id', authUser, updateReview)
router.delete('/:id', authUser, deleteReview)



module.exports = router