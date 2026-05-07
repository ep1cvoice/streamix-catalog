import { createContext, useContext, type ReactNode } from 'react'
import { useFavorites } from '../hooks/useFavorites'

type FavoritesContextValue = ReturnType<typeof useFavorites>

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useFavorites()
  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>
}

export function useFavoritesContext(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavoritesContext must be used within FavoritesProvider')
  return ctx
}
