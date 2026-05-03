import MovieCard from '../components/MovieCard'
import { movies } from '../data/content'

export default function Movies() {
  return (
    <div className="pt-28 px-8 md:px-12 pb-16">
      <h1
        className="text-5xl font-black text-white mb-8 tracking-wider"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Фильмы
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map(item => (
          <MovieCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
