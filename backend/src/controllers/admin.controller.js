const userModel = require('../models/user.model')
const reviewModel = require('../models/review.model')

const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        const user = await userModel.findByIdAndDelete(id)

        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        res.status(200).json({ message: "User deleted" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getAllReviews = async (req, res) => {
    try {
        const reviews = await reviewModel
            .find()
            .populate("user", "username email")
            .populate("movie", "title posterPath")
            .sort({ createdAt: -1 })

        res.status(200).json(reviews)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const flagReview = async (req, res) => {
    try {
        const { id } = req.params

        const review = await reviewModel.findByIdAndUpdate(
            id,
            { status: "flagged" },
            { new: true }
        )

        if (!review) {
            return res.status(404).json({ message: "Review not found" })
        }

        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const unflagReview = async (req, res) => {
    try {
        const { id } = req.params

        const review = await reviewModel.findByIdAndUpdate(
            id,
            { status: "active" },
            { new: true }
        )

        if (!review) {
            return res.status(404).json({ message: "Review not found" })
        }

        res.status(200).json(review)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteReviewAdmin = async (req, res) => {
    try {
        const { id } = req.params

        const review = await reviewModel.findByIdAndDelete(id)

        if (!review) {
            return res.status(404).json({ message: "Review not found" })
        }

        res.status(200).json({ message: "Review deleted by admin" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllUsers,
    deleteUser,
    getAllReviews,
    flagReview,
    unflagReview,
    deleteReviewAdmin,
}