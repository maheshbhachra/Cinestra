const express = require('express')
const cookieParse = require('cookie-parser')
const authRoutes = require('./routes/auth.routes')
const movieRoutes = require('./routes/movie.routes')
const watchlistRoutes = require('./routes/watchlist.routes')
const dairyRoutes = require('./routes/dairy.routes')
const reviewRoutes = require('./routes/review.routes')
const adminRoutes = require('./routes/admin.routes')

const app = express()
app.use(express.json())
app.use(cookieParse())

app.use('/api/auth', authRoutes)

app.use('/api/movies', movieRoutes)

app.use('/api/watchlist', watchlistRoutes)

app.use('/api/dairy', dairyRoutes)

app.use('/api/reviews', reviewRoutes)

app.use('/api/admin', adminRoutes)                                                                                                                        

module.exports = app                                                                                                                                                                                                                                                    