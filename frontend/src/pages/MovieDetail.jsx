import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

const ratingTiers = [
  { value: "masterpiece", label: "Masterpiece", color: "bg-yellow-500 text-black" },
  { value: "must_watch", label: "Must Watch", color: "bg-green-400 text-black" },
  { value: "timepass", label: "Timepass", color: "bg-slate-400 text-white" },
  { value: "skip", label: "Skip", color: "bg-red-400 text-white" },
]

const MovieDetail = () => {
  const { tmdbId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [movie, setMovie] = useState(null)
  const [reviews, setReviews] = useState([])
  const [selectedTier, setSelectedTier] = useState("")
  const [reviewText, setReviewText] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [watchlistMsg, setWatchlistMsg] = useState("")
  const [diaryMsg, setDiaryMsg] = useState("")
  const [reviewMsg, setReviewMsg] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${tmdbId}`)
        console.log("Movie data:", res.data) // add this
        setMovie(res.data)
      } catch (error) {
        console.error("Failed to fetch movie", error)
      } finally {
        setLoading(false)
      }
    }
    fetchMovie()
  }, [tmdbId])

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/movie/${tmdbId}`)
        setReviews(res.data)
      } catch (error) {
        console.error("Failed to fetch reviews", error)
      }
    }
    fetchReviews()
  }, [tmdbId])

  const handleAddToWatchlist = async () => {
    try {
      await api.post("/watchlist", { movieId: movie._id })
      setWatchlistMsg("Added to watchlist!")
    } catch (err) {
      setWatchlistMsg(err.response?.data?.message || "Failed")
    }
    setTimeout(() => setWatchlistMsg(""), 3000)
  }

  const handleLogDiary = async () => {
    try {
      await api.post("/dairy", {
        movieId: movie._id,
        watchedDate: new Date().toISOString(),
        rewatch: false,
      })
      setDiaryMsg("Logged in dairy!")
    } catch (err) {
      setDiaryMsg(err.response?.data?.message || "Failed")
    }
    setTimeout(() => setDiaryMsg(""), 3000)
  }

  const handleSubmitReview = async () => {
    if (!selectedTier) {
      setReviewMsg("Please select a rating tier")
      return
    }
    setSubmitting(true)
    try {
      const res = await api.post("/reviews", {
        movieId: movie._id,
        ratingTier: selectedTier,
        reviewText,
      })
      setReviews([res.data, ...reviews])
      setReviewMsg("Review submitted!")
      setSelectedTier("")
      setReviewText("")
    } catch (err) {
      setReviewMsg(err.response?.data?.message || "Failed to submit review")
    } finally {
      setSubmitting(false)
      setTimeout(() => setReviewMsg(""), 3000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    )
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-gray-500">Movie not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-sm border-b border-gray-900">
        <h1
          className="text-yellow-400 text-4xl font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          cinestra
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white text-sm transition cursor-pointer"
        >
          ← Back
        </button>
      </nav>

      {/* Backdrop */}
      <div className="relative h-80 w-full overflow-hidden mt-17">
        {movie.backdropPath ? (
            <img
            src={`https://image.tmdb.org/t/p/original${movie.backdropPath}`}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
            />
        ) : movie.posterPath ? (
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
            alt={movie.title}
            className="w-full h-full object-cover object-top blur-md scale-110 opacity-30"
            />
        ) : (
            <div className="w-full h-full bg-gray-900" />
        )}
        {/* Gradient fades into black smoothly at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black" />
        {/* Extra bottom fade for seamless blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>

      {/* Movie info */}
      <div className="max-w-6xl mx-auto px-8 -mt-32 relative z-10">
        <div className="flex gap-8 items-start">
          {/* Poster */}
          {movie.posterPath && (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
              alt={movie.title}
              className="w-44 rounded-xl shadow-2xl flex-shrink-0 hidden md:block"
            />
          )}

          {/* Details */}
          <div className="flex-1 pt-20">
            <h1 className="text-4xl font-black mb-2">{movie.title}</h1>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-gray-400 text-sm">{movie.releaseDate?.split("-")[0]}</span>
              <div className="flex gap-2 flex-wrap">
                {movie.genres?.map((g) => (
                  <span key={g} className="text-xs text-gray-400 border border-gray-700 px-2 py-1 rounded-full">
                    {g}
                  </span>
                ))}
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl mb-6">
              {movie.overview}
            </p>

            {/* Action buttons */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleAddToWatchlist}
                className="border border-gray-600 text-white text-sm px-5 py-2 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition cursor-pointer"
              >
                + Add to Watchlist
              </button>
              <button
                onClick={handleLogDiary}
                className="border border-gray-600 text-white text-sm px-5 py-2 rounded-full hover:border-yellow-400 hover:text-yellow-400 transition cursor-pointer"
              >
                📖 Log in Diary
              </button>
            </div>
            <div className="flex gap-3 mt-2">
              {watchlistMsg && <p className="text-yellow-400 text-xs">{watchlistMsg}</p>}
              {diaryMsg && <p className="text-yellow-400 text-xs">{diaryMsg}</p>}
            </div>
          </div>
        </div>

        {/* Rating + Review */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Rate this film</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {ratingTiers.map((tier) => (
              <button
                key={tier.value}
                onClick={() => setSelectedTier(tier.value)}
                className={`px-5 py-2 rounded-full text-sm font-bold transition cursor-pointer border-2 ${
                  selectedTier === tier.value
                    ? `${tier.color} border-transparent scale-105`
                    : "bg-transparent border-gray-700 text-gray-400 hover:border-gray-500"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <h2 className="text-xl font-bold mb-3">Your Thoughts</h2>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your thoughts..."
            rows={4}
            className="w-full bg-[#111] border border-gray-800 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition resize-none"
          />

          {reviewMsg && (
            <p className={`text-sm mt-2 ${reviewMsg.includes("Failed") || reviewMsg.includes("Please") ? "text-red-400" : "text-yellow-400"}`}>
              {reviewMsg}
            </p>
          )}

          <button
            onClick={handleSubmitReview}
            disabled={submitting}
            className="mt-4 bg-white text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition disabled:opacity-50 cursor-pointer text-sm"
          >
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </div>

        {/* Community Reviews */}
        <div className="mt-16 mb-16">
          <h2 className="text-xl font-bold mb-6">
            Community Reviews
            <span className="text-gray-600 text-sm font-normal ml-2">
              {reviews.length} review{reviews.length !== 1 ? "s" : ""}
            </span>
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-[#111] border border-gray-900 rounded-xl p-8 text-center">
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => {
                const tier = ratingTiers.find((t) => t.value === review.ratingTier)
                return (
                  <div key={review._id} className="bg-[#111] border border-gray-900 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black text-xs font-bold">
                          {review.user?.username?.[0]?.toUpperCase()}
                        </div>
                        <span className="text-white text-lg font-medium">
                          {review.user?.username}
                        </span>
                        <span className="text-gray-600 text-xs">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {tier && (
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${tier.color}`}>
                          {tier.label}
                        </span>
                      )}
                    </div>
                    {review.reviewText && (
                      <p className="text-gray-400 text-md leading-relaxed">
                        {review.reviewText}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MovieDetail