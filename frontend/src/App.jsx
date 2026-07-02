import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'
import Home from './pages/Home'
import MovieDetail from './pages/MovieDetail'
import Profile from './pages/Profile'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/movie/:tmdbId" element={<MovieDetail />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

export default App