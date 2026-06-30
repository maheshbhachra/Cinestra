const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ message: "not authorized, no token" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(decoded.id).select("-password")

        if (!user) {
            return res.status(401).json({ message: "user not found" })
        }

        req.user = user;

        next()

    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed" });
    }
}

const authAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Admin access only" });
  }
};

module.exports = { authUser, authAdmin }