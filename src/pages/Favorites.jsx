export default function Favorites() {
  return (
    <div className="pt-28 px-8 md:px-12 pb-16 min-h-screen">
      <h1
        className="text-5xl font-black text-white mb-8 tracking-wider"
        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
      >
        Избранное
      </h1>

      <div className="flex flex-col items-center justify-center py-32">
        <div className="text-red-600/30 mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <p className="text-gray-400 text-lg font-medium mb-2">Здесь пока пусто</p>
        <p className="text-gray-600 text-sm">Нажимайте ♡ на карточках, чтобы добавить сюда фильмы и сериалы</p>
      </div>
    </div>
  )
}
