import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

const ratingTiers = [
  { value: "masterpiece", label: "Masterpiece", color: "bg-yellow-500 text-black" },
  { value: "must_watch", label: "Must Watch", color: "bg-green-400 text-black" },
  { value: "timepass", label: "Timepass", color: "bg-teal-500 text-black" },
  { value: "skip", label: "Skip", color: "bg-red-400 text-black" },
]

const Profile = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("diary")
  const [diary, setDiary] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

    const fetchAll = async () => {
      try {
        const [diaryRes, watchlistRes, reviewsRes] = await Promise.all([
          api.get("/dairy"),
          api.get("/watchlist"),
          api.get("/reviews/user/me"),
        ])
        setDiary(diaryRes.data)
        setWatchlist(watchlistRes.data)
        setReviews(reviewsRes.data)
      } catch (error) {
        console.error("Failed to fetch profile data", error)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchAll()
  }, [])

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const handleDeleteDiary = async (id) => {
    try {
      await api.delete(`/diary/${id}`)
      setDiary(diary.filter((d) => d._id !== id))
      // fetchAll()
    } catch (error) {
      console.error("Failed to delete diary entry", error)
    }
  }

  const handleRemoveWatchlist = async (movieId) => {
    try {
      await api.delete(`/watchlist/${movieId}`)
      setWatchlist(watchlist.filter((w) => w.movie._id !== movieId))
      // fetchAll()
    } catch (error) {
      console.error("Failed to remove from watchlist", error)
    }
  }

  const handleDeleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`)
      setReviews(reviews.filter((r) => r._id !== id))
      // fetchAll()
    } catch (error) {
      console.error("Failed to delete review", error)
    }
  }


  return (
    <div className="min-h-screen bg-black text-white pb-16">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/90 backdrop-blur-sm border-b border-gray-900">
        <h1
          className="text-yellow-400 text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          cinestra
        </h1>
        <div className="flex items-center gap-4">
          {/* <span className="text-yellow-400 text-lg">{user?.username}</span> */}
          <span className="text-yellow-400 text-lg hover:text-white cursor-pointer" onClick={() => navigate("/home")}>Home</span>
          <button
            onClick={handleLogout}
            className="text-gray-500 text-md hover:text-white transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-8 pt-28">
        {/* Profile header */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-black text-3xl font-black">
            {user?.username?.[0]?.toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-black">{user?.username}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Member since {new Date(user?.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mb-10 border-b border-gray-900 pb-8">
          <div>
            <p className="text-yellow-400 text-2xl font-black">{diary.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Watched</p>
          </div>
          <div>
            <p className="text-yellow-400 text-2xl font-black">{reviews.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Reviews</p>
          </div>
          <div>
            <p className="text-yellow-400 text-2xl font-black">{watchlist.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest">Watchlist</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b border-gray-900">
          {["diary", "watchlist", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm uppercase tracking-widest font-bold transition cursor-pointer ${
                activeTab === tab
                  ? "text-yellow-400 border-b-2 border-yellow-400"
                  : "text-gray-600 hover:text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : (
          <>
            {/* Diary Tab */}
            {activeTab === "diary" && (
              <div className="flex flex-col gap-3">
                {diary.length === 0 ? (
                  <div className="bg-[#111] border border-gray-900 rounded-xl p-8 text-center">
                    <p className="text-gray-600">No diary entries yet.</p>
                  </div>
                ) : (
                  diary.map((entry) => (
                    <div
                      key={entry._id}
                      className="flex items-center gap-4 bg-[#111] border border-gray-900 rounded-xl p-4"
                    >
                      {entry.movie?.posterPath ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${entry.movie.posterPath}`}
                          alt={entry.movie.title}
                          className="w-18 h-23 object-cover rounded-lg flex-shrink-0 cursor-pointer"
                          onClick={() => navigate(`/movie/${entry.movie.tmdbId}`)}
                        />
                      ) : (
                        <div className="w-10 h-14 bg-gray-800 rounded-lg flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p
                          className="text-white font-medium text-md cursor-pointer hover:text-yellow-400 transition"
                          onClick={() => navigate(`/movie/${entry.movie.tmdbId}`)}
                        >
                          {entry.movie?.title}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          Watched on {new Date(entry.watchedDate).toLocaleDateString()}
                        </p>
                      </div>
                      {entry.rewatch && (
                        <span className="text-xs bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full">
                          Rewatch
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteDiary(entry._id)}
                        className="text-gray-700 hover:text-red-400 text-xs transition cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Watchlist Tab */}
            {activeTab === "watchlist" && (
              <div>
                {watchlist.length === 0 ? (
                  <div className="bg-[#111] border border-gray-900 rounded-xl p-8 text-center">
                    <p className="text-gray-600">Your watchlist is empty.</p>
                  </div>
                ) : (
                  <div className="columns-3 sm:columns-4 md:columns-5 gap-3">
                    {watchlist.map((entry) => (
                      <div
                        key={entry._id}
                        className="break-inside-avoid mb-3 relative group cursor-pointer"
                        onClick={() => navigate(`/movie/${entry.movie.tmdbId}`)}
                      >
                        {entry.movie?.posterPath ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w500${entry.movie.posterPath}`}
                            alt={entry.movie.title}
                            className="w-full aspect-[2/3] object-cover rounded-xl group-hover:opacity-70 transition"
                          />
                        ) : (
                          <div className="w-full aspect-[2/3] bg-gray-900 rounded-xl" />
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveWatchlist(entry.movie._id)
                          }}
                          className="absolute top-2 right-2 bg-black/70 text-red-400 text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="flex flex-col gap-4">
                {reviews.length === 0 ? (
                  <div className="bg-[#111] border border-gray-900 rounded-xl p-8 text-center">
                    <p className="text-gray-600">No reviews yet.</p>
                  </div>
                ) : (
                  reviews.map((review) => {
                    const tier = ratingTiers.find((t) => t.value === review.ratingTier)
                    return (
                      <div
                        key={review._id}
                        className="flex gap-4 bg-[#111] border border-gray-900 rounded-xl p-4"
                      >
                        {review.movie?.posterPath ? (
                          <img
                            src={`https://image.tmdb.org/t/p/w92${review.movie.posterPath}`}
                            alt={review.movie.title}
                            className="w-18 h-23 object-cover rounded-lg flex-shrink-0 cursor-pointer"
                            onClick={() => navigate(`/movie/${review.movie.tmdbId}`)}
                          />
                        ) : (
                          <div className="w-10 h-14 bg-gray-800 rounded-lg flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p
                              className="text-white font-medium text-md cursor-pointer hover:text-yellow-400 transition"
                              onClick={() => navigate(`/movie/${review.movie.tmdbId}`)}
                            >
                              {review.movie?.title}
                            </p>
                            {tier && (
                              <span className={`text-xs font-bold px-3 py-1 rounded-full ${tier.color}`}>
                                {tier.label}
                              </span>
                            )}
                          </div>
                          {review.reviewText && (
                            <p className="text-gray-500 text-md leading-relaxed">
                              {review.reviewText}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => handleDeleteReview(review._id)}
                          className="text-gray-700 hover:text-red-400 text-xs transition cursor-pointer self-start"
                        >
                          Remove
                        </button>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Profile