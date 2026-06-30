const express = require("express")
const router = express.Router()
const { authUser, authAdmin } = require("../middlewares/auth.middleware")
const {
    getAllUsers,
    deleteUser,
    getAllReviews,
    flagReview,
    unflagReview,
    deleteReviewAdmin,
} = require("../controllers/admin.controller")

router.get("/users", authUser, authAdmin, getAllUsers)
router.delete("/users/:id", authUser, authAdmin, deleteUser)

router.get("/reviews", authUser, authAdmin, getAllReviews)
router.patch("/reviews/:id/flag", authUser, authAdmin, flagReview)
router.patch("/reviews/:id/unflag", authUser, authAdmin, unflagReview)
router.delete("/reviews/:id", authUser, authAdmin, deleteReviewAdmin)

module.exports = router