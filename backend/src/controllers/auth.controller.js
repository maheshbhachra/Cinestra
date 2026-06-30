const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn : "7d"
    })
}

const register = async (req, res) =>{
    try{
        const {username, email, password} = req.body

        if(!username || !email || !password){
            return res.status(400).json({message: "All fields are required"})
        }

        const existingUser = await userModel.findOne({
            $or:[{email}, {username}]
        })
        if(existingUser){
            return res.status(400).json({message: "User already exits"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await  bcrypt.hash(password, salt)

        const user = await userModel.create({
            username,
            email,
            password: hashPassword  
        })

        const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        })

    }catch(error){
        res.status(500).json({message: error.message})
    }
}

const loginUser = async(req,res) => {
    try{
        const {username, email, password} = req.body

        const user = await userModel.findOne({
            $or:[
                {username},
                {email}
            ]
        })

        if(!user){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

          const token = generateToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        })

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

const logoutUser = (req, res) => {
  res.clearCookie("token")
  res.status(200).json({ message: "Logged out successfully" })
}


module.exports = { register, loginUser, logoutUser }