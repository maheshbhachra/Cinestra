const express = require('express')
const router = express.Router()
const { authUser } = require('../middlewares/auth.middleware')
const { 
    addDairyEntry, 
    getMyDairy, 
    deleteDairyEntry 
} = require('../controllers/dairy.controller')

router.post('/', authUser, addDairyEntry)
router.get('/', authUser, getMyDairy)
router.delete('/:id', authUser, deleteDairyEntry)

module.exports = router 