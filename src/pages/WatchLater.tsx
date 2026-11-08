import { Clock } from 'lucide-react'
import { useWatchLaterContext } from '../context/WatchLaterContext'
import ListContent from '../components/ListContent'
import PageWrapper from '../components/PageWrapper'

export default function WatchLater() {
  const { items, isLoading, error, refetch } = useWatchLaterContext()

  return (
    <PageWrapper>
      <div className='pt-28 px-8 md:px-12 pb-16 min-h-screen'>
        <h1
          className='text-5xl font-black text-white mb-8 tracking-wider'
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Watch Later
        </h1>

        <ListContent
          items={items}
          isLoading={isLoading}
          error={error}
          onRetry={() => refetch()}
          errorTitle="Couldn't load your watch later list"
          empty={
            <div className='flex flex-col items-center justify-center py-32'>
              <div className='text-red-600/30 mb-6'>
                <Clock className='h-24 w-24' strokeWidth={1} />
              </div>
              <p className='text-gray-400 text-lg font-medium mb-2'>Nothing here yet</p>
              <p className='text-gray-600 text-sm'>Click the clock on any card to save it here</p>
            </div>
          }
        />
      </div>
    </PageWrapper>
  )
}
