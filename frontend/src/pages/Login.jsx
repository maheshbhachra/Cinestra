import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import api from "../utils/axios"

const posters = [
  "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",  // Inception
  "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",  // Fight Club
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",  // Interstellar
  "https://image.tmdb.org/t/p/w500//wuMc08IPKEatf9rnMNXvIDxqP4W.jpg",  // Harry Potter
  "https://image.tmdb.org/t/p/w500//z9YIo2qscyaXYgRqIdRJtND3bw8.jpg",  // Bahuballi
  "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg",  // Pulp Fiction
  "https://image.tmdb.org/t/p/w500//ekstpH614fwDX8DUln1a2Opz0N8.jpg",  // Taxi Driver
  "https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",  // Joker
  "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",  // Goodfellas
  "https://image.tmdb.org/t/p/w500//j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg",  // Nightcrawler
  "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",  // The Matrix
  "https://image.tmdb.org/t/p/w500//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg",  // Parasite
  "https://image.tmdb.org/t/p/w500/4nbvLoPDftqXV14w5Mv14iqgVrt.jpg",  // Gangs of Wasseypur
  "https://image.tmdb.org/t/p/w500/hKO9O715wYxjkQSEv47giCYcyO8.jpg",  // 3 Idiots
  "https://image.tmdb.org/t/p/w500/tk1h0lXd0WkrVo4BC36sOO3gi9P.jpg",  // Tumbbad
]
  

const PosterColumn = ({ images, duration, reverse = false }) => (
  <div className="flex flex-col overflow-hidden h-full">
    <div
      className="flex flex-col gap-2"
      style={{
        animation: `${reverse ? "scrollDown" : "scrollUp"} ${duration}s linear infinite`,
      }}
    >
      {[...images, ...images].map((src, i) => (
        <img
          key={i}
          src={src}
          alt="poster"
          className="w-full rounded-lg object-cover .aspect-[2/3] opacity-80"
        />
      ))}
    </div>
  </div>
)

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await api.post("/auth/login", formData)
      login(res.data)
      navigate("/home")
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
      `}</style>

      <div className="h-screen bg-black flex overflow-hidden">
        {/* Left side — animated poster columns */}
        <div className="hidden lg:flex w-1/2 relative overflow-hidden gap-2 p-3">
          <div className="absolute inset-0 .bg-gradient-to-r from-black/10 to-black/70 z-10 pointer-events-none" />
                <PosterColumn images={posters.slice(0, 5)} duration={25} />
                <PosterColumn images={posters.slice(5, 10)} duration={30} reverse />
                <PosterColumn images={posters.slice(10, 15)} duration={20} />
        </div>

        {/* Right side — form */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16">
          <div className="mb-8">
            <h1 className="text-yellow-400 text-3xl font-bold mb-8">Cinestra</h1>
            <h2 className="text-white text-4xl font-bold mb-2">Welcome back</h2>
            <p className="text-gray-400">Your cinematic journey continues here.</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-[#1a1a1a] text-white border border-gray-800 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black font-bold py-3 rounded-full mt-2 hover:bg-yellow-300 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-6 text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-yellow-400 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login