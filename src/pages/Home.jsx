import HeroBanner from '../components/HeroBanner'
import MovieCard from '../components/MovieCard'
import { movies, series, cartoons } from '../data/content'

function ContentRow({ title, items }) {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold text-white mb-5 tracking-wide">{title}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map(item => (
          <MovieCard key={item.id} item={item} trailer={item.trailer}/>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <HeroBanner item={series[0]} />
      <div className="px-8 md:px-12 pb-16 -mt-28 relative z-10">
        <ContentRow title="Movies" items={movies} />
        <ContentRow title="Series" items={series} />
        <ContentRow title="Cartoons" items={cartoons} />
      </div>
    </>
  )
}
