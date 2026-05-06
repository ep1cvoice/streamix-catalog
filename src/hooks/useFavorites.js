import { useState } from 'react'

function load() {
  try {
    return JSON.parse(localStorage.getItem('favorites')) ?? []
  } catch {
    return []
  }
}

export function useFavorites() {
  const [ids, setIds] = useState(load)

  function toggle(id) {
    setIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      localStorage.setItem('favorites', JSON.stringify(next))
      return next
    })
  }

  return { ids, toggle, isFavorite: id => ids.includes(id) }
}
