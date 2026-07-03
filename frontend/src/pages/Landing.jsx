import { Link } from "react-router-dom";

const posters = [
  "https://image.tmdb.org/t/p/w500/aKCvdFFF5n80P2VdS7d8YBwbCjh.jpg", // Inception
  "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", // Fight Club
  "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", // Interstellar
  "https://image.tmdb.org/t/p/w500//wuMc08IPKEatf9rnMNXvIDxqP4W.jpg", // Harry Potter
  "https://image.tmdb.org/t/p/w500//z9YIo2qscyaXYgRqIdRJtND3bw8.jpg", // Bahuballi
  "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", // Pulp Fiction
  "https://image.tmdb.org/t/p/w500//ekstpH614fwDX8DUln1a2Opz0N8.jpg", // Taxi Driver
  "https://image.tmdb.org/t/p/w500/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg", // Spider-man
  "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", // Joker
  "https://image.tmdb.org/t/p/w500//j9HrX8f7GbZQm1BrBiR40uFQZSb.jpg", // Nightcrawler
  "https://image.tmdb.org/t/p/w500/bRwnj8WEKBCvmfeUNOukJPwB43K.jpg", // Obsession
  "https://image.tmdb.org/t/p/w500//7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", // Parasite
  "https://image.tmdb.org/t/p/w500/4nbvLoPDftqXV14w5Mv14iqgVrt.jpg", // Gangs of Wasseypur
  "https://image.tmdb.org/t/p/w500/hKO9O715wYxjkQSEv47giCYcyO8.jpg", // Zindagi Na Milegi Dobara
  "https://image.tmdb.org/t/p/w500/snBOuXDdhmTvlzMUvP9Em3Pp1u1.jpg", // Dhurandhar
];

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
          className="w-full rounded-lg object-cover .aspect-[2/3] opacity-60"
        />
      ))}
    </div>
  </div>
);

const Landing = () => {
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

      <div className="bg-black min-h-screen text-white">
        {/* Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 bg-black/80 backdrop-blur-sm">
          <h1 className="text-yellow-400 text-4xl font-bold">cinestra</h1>
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-400 text-black text-sm font-bold px-5 py-2 rounded-full hover:bg-yellow-300 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Poster grid background */}
          <div className="absolute inset-0 flex gap-2 p-2 opacity-40">
            <PosterColumn images={posters.slice(0, 5)} duration={20} />
            <PosterColumn images={posters.slice(3, 8)} duration={25} reverse />
            <PosterColumn images={posters.slice(6, 11)} duration={22} />
            <PosterColumn images={posters.slice(9, 14)} duration={28} reverse />
            <PosterColumn images={posters.slice(11, 16)} duration={18} />
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Hero text */}
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              Track every movie.
              <br />
              Share every opinion.
            </h1>
            <p className="text-gray-400 text-xl mb-10 max-w-xl mx-auto">
              The cinematic diary for those who live through the lens. Rate,
              review, and discover your next <span className="text-yellow-400 font-bold">masterpiece</span>.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link
                to="/register"
                className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition text-sm"
              >
                Get Started for Free
              </Link>
              <Link
                to="/login"
                className="border border-gray-600 text-white font-bold px-8 py-3 rounded-full hover:border-gray-400 transition text-sm"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

    {/* Section 1 — Track */}
    <div className="flex flex-col md:flex-row items-center gap-12 px-12 py-24 max-w-6xl mx-auto">
        <div className="flex-1">
            <h2 className="text-6xl font-black mb-4">Track everything you watch.</h2>
            <p className="text-gray-400 text-xl">
                Log films as you watch them. Build a lifelong archive of your cinematic journey and never forget a title again.
            </p>
        </div>
        <div className="flex-1 relative h-80 mt-10">
            <img src={posters[0]} className="absolute w-32 rounded-xl object-cover .aspect-[2/3] left-16 top-0 .rotate-[-6deg] shadow-2xl" />
            <img src={posters[1]} className="absolute w-40 rounded-xl object-cover .aspect-[2/3] left-32 top-8 .rotate-[4deg] shadow-2xl" />
            <img src={posters[2]} className="absolute w-32 rounded-xl object-cover .aspect-[2/3] right-12 top-4 .rotate-[-3deg] shadow-2xl" />
            <img src={posters[3]} className="absolute w-36 rounded-xl object-cover .aspect-[2/3] right-24 top-20 .rotate-[6deg] shadow-2xl" />
        </div>
    </div>

    {/* Section 2 — Reviews */}
    <div className="flex flex-col md:flex-row-reverse items-center gap-12 px-12 py-24 max-w-6xl mx-auto">
        <div className="flex-1">
            <h2 className="text-6xl font-black mb-4">Share your reviews.</h2>
            <p className="text-gray-400 text-xl">
            Rate, review and share your thoughts with the community. From the rare <span className="text-yellow-400 font-bold">Masterpiece</span> to the straight-up <span className="text-red-400 font-bold">Skip</span>.
            </p>
        </div>
        <div className="flex-1 relative h-80 flex items-center justify-center">
            {/* Center movie card */}
            <img src="https://image.tmdb.org/t/p/w500//snBOuXDdhmTvlzMUvP9Em3Pp1u1.jpg" className="w-60 rounded-xl object-cover .aspect-[2/3] shadow-2xl  z-10" />
                {/* Floating rating pills */}
                <span className="absolute top-0 right-18 bg-red-400 text-black text-md font-bold px-4 py-2 rounded-full shadow-lg">Skip</span>
                <span className="absolute top-16 left-4 bg-green-400 text-black text-md font-bold px-4 py-2 rounded-full shadow-lg">Must Watch</span>
                <span className="absolute bottom-25 right-9 bg-teal-500 text-black text-md font-bold px-4 py-2 rounded-full shadow-lg">Timepass</span>
                <span className="absolute bottom-0 left-4 bg-yellow-500 text-black text-md font-bold px-4 py-2 rounded-full shadow-lg">Masterpiece</span>
        </div>
    </div>

    {/* Section 3 — Watchlist */}
    <div className="flex flex-col md:flex-row items-center gap-12 px-12 py-24 max-w-6xl mx-auto">
    <div className="flex-1">
        <h2 className="text-6xl font-black mb-4">Build your watchlist.</h2>
        <p className="text-gray-400 text-xl">
        Save the films you're dying to see. Keep your upcoming queue organized and always know what to watch next.
        </p>
    </div>
    <div className="flex-1 grid grid-cols-3 gap-2">
        <img src={posters[8]} className="w-full rounded-lg object-cover .aspect-[2/3]" />
        <img src={posters[9]} className="w-full rounded-lg object-cover .aspect-[2/3] mt-6" />
        <img src={posters[10]} className="w-full rounded-lg object-cover .aspect-[2/3]" />
        <img src={posters[11]} className="w-full rounded-lg object-cover .aspect-[2/3] .mt-[-12px]" />
        <img src={posters[12]} className="w-full rounded-lg object-cover .aspect-[2/3] mt-4" />
        <img src={posters[13]} className="w-full rounded-lg object-cover .aspect-[2/3] .mt-[-8px]" />
    </div>
    </div>

        {/* Footer */}
        <footer className="border-t border-gray-900 py-10 text-center text-gray-600 text-sm">
          <h2 className="text-yellow-400 text-3xl font-bold mb-4">cinestra</h2>
          <div className="flex justify-center gap-6 mb-4">
            <span className="hover:text-gray-400 cursor-pointer">About</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms</span>
            <span className="hover:text-gray-400 cursor-pointer">Privacy</span>
            <span className="hover:text-gray-400 cursor-pointer">Contact</span>
          </div>
          <p>© 2026 Cinestra. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default Landing;
