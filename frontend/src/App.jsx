import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Landing from './pages/Landing'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App