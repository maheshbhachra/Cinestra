import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

const Home = () => {
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)
  const [loading, setLoading] = useState(true)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  // fetch popular movies on mount
  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await api.get("/movies/popular")
        setMovies(res.data)
      } catch (error) {
        console.error("Failed to fetch popular movies", error)
      } finally {
        setLoading(false)
      }
    }
    fetchPopular()
  }, [])

  // search with debounce
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([])
      setShowDropdown(false)
      return
    }
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/movies/search?query=${searchQuery}`)
        setSearchResults(res.data.slice(0, 6))
        setShowDropdown(true)
      } catch (error) {
        console.error("Search failed", error)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const handleMovieClick = (tmdbId) => {
    setShowDropdown(false)
    setSearchQuery("")
    navigate(`/movie/${tmdbId}`)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/90 backdrop-blur-sm border-b border-gray-900">
        <h1
          className="text-yellow-400 text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          cinestra
        </h1>

        {/* Search */}
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Search films..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
            className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-full px-5 py-2 text-sm focus:outline-none focus:border-yellow-400 transition"
          />

          {/* Search dropdown */}
          {showDropdown && searchResults.length > 0 && (
            <div className="absolute top-12 left-0 right-0 bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-2xl z-50">
              {searchResults.map((movie) => (
                <div
                  key={movie.id}
                  onClick={() => handleMovieClick(movie.id)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-[#1a1a1a] cursor-pointer transition"
                >
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={movie.title}
                      className="w-8 h-12 object-cover rounded"
                    />
                  ) : (
                    <div className="w-8 h-12 bg-gray-800 rounded" />
                  )}
                  <div>
                    <p className="text-white text-sm font-medium">{movie.title}</p>
                    <p className="text-gray-500 text-xs">
                      {movie.release_date?.split("-")[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User */}
        <div className="flex items-center gap-4">
          <span
            className="text-yellow-300 text-md cursor-pointer hover:text-white transition"
            onClick={() => navigate("/profile")}
          >
            {user?.username}
          </span>
          <button
            onClick={handleLogout}
            className="text-gray-500 text-sm hover:text-white transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-24 px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black mb-1">Popular Movies</h2>
          <p className="text-gray-500 text-sm">Trending globally right now</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading movies...</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3">
            {movies.map((movie, i) => (
              <div
                key={movie.id}
                onClick={() => handleMovieClick(movie.id)}
                className="break-inside-avoid mb-3 cursor-pointer group relative overflow-hidden rounded-xl"
              >
                {movie.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className={`w-full object-cover rounded-xl group-hover:opacity-70 transition duration-300 ${
                      i % 3 === 0 ? ".aspect-[2/3]" : i % 3 === 1 ? ".aspect-[2/4]" : ".aspect-[2/3]"
                    }`}
                  />
                ) : (
                  <div className="w-full .aspect-[2/3] bg-gray-900 rounded-xl" />
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition duration-300 .bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-xl">
                  <p className="text-white text-xs font-semibold">{movie.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home