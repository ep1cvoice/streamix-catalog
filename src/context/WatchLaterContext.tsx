import { createContext, useContext, type ReactNode } from 'react'
import { useWatchLater } from '../hooks/useWatchLater'

type WatchLaterContextValue = ReturnType<typeof useWatchLater>

const WatchLaterContext = createContext<WatchLaterContextValue | null>(null)

export function WatchLaterProvider({ children }: { children: ReactNode }) {
  const watchLater = useWatchLater()
  return <WatchLaterContext.Provider value={watchLater}>{children}</WatchLaterContext.Provider>
}

export function useWatchLaterContext(): WatchLaterContextValue {
  const ctx = useContext(WatchLaterContext)
  if (!ctx) throw new Error('useWatchLaterContext must be used within WatchLaterProvider')
  return ctx
}
