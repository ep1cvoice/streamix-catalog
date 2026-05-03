const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 fill-yellow-400" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

export default function MovieCard({ item }) {
  return (
    <div className="group relative bg-[#1c1c1c] rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-[0_8px_32px_rgba(220,38,38,0.25)]">
      {/* Poster */}
      <div className="relative overflow-hidden">
        <img
          src={item.poster}
          alt={item.title}
          className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        {/* Dark overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Type badge */}
        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">
            {{ movie: 'Movie', series: 'TV Series', serial: 'TV Series', cartoon: 'Cartoon' }[item.type] ?? 'TV Series'}
          </span>
        </div>

        {/* Heart button */}
        <button
          className="absolute top-2 right-2 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110"
          aria-label="Add to favorites"
        >
          <HeartIcon />
        </button>
      </div>

      {/* Info */}
      <div className="p-3">
        <h3 className="text-white font-semibold text-sm truncate mb-1">{item.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs">{item.year}</span>
          <div className="flex items-center gap-1">
            <StarIcon />
            <span className="text-yellow-400 text-xs font-semibold">{item.rating}</span>
          </div>
        </div>
        <span className="text-gray-600 text-xs mt-0.5 block">{item.genre}</span>
      </div>

      {/* Red bottom border on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  )
}
