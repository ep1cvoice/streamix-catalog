import { useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import ScrollRow from '../components/ScrollRow';
import PageWrapper from '../components/PageWrapper';
import { fetchMovies, fetchSeries, fetchCartoons, fetchTopRated, fetchNowPlaying, fetchUpcoming } from '../api/tmdb';
import { useTMDB } from '../hooks/useTMDB';
import { groupByGenre } from '../utils/groupByGenre';

const PLACEHOLDER_GENRES = ['Drama', 'Action', 'Comedy', 'Sci-Fi', 'Thriller'];

export default function Home() {
  const { items: topRated,   loading: topRatedLoading   } = useTMDB(fetchTopRated);
  const { items: nowPlaying, loading: nowPlayingLoading } = useTMDB(fetchNowPlaying);
  const { items: upcoming,   loading: upcomingLoading   } = useTMDB(fetchUpcoming);
  const { items: movies,     loading: moviesLoading     } = useTMDB(fetchMovies);
  const { items: series,     loading: seriesLoading     } = useTMDB(fetchSeries);
  const { items: cartoons,   loading: cartoonsLoading   } = useTMDB(fetchCartoons);

  const isLoading = topRatedLoading || nowPlayingLoading || upcomingLoading || moviesLoading || seriesLoading || cartoonsLoading;

  const genreRows = useMemo(() => {
    const seen = new Set<number>();
    const unique = [...movies, ...series, ...cartoons].filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    return groupByGenre(unique);
  }, [movies, series, cartoons]);

  return (
    <PageWrapper>
      <HeroBanner />
      <div className='px-8 md:px-12 pb-16 -mt-28 relative z-10'>
        {isLoading ? (
          PLACEHOLDER_GENRES.map(genre => (
            <ScrollRow key={genre} genre={genre} items={[]} loading={true} />
          ))
        ) : (
          <>
            <ScrollRow genre='Upcoming'   items={upcoming}   to='/browse?list=upcoming' />
            <ScrollRow genre='Now Playing' items={nowPlaying} to='/browse?list=now-playing' />
            <ScrollRow genre='Top Rated'  items={topRated}   to='/browse?list=top-rated' />
            {genreRows.map(({ genre, items }) => (
              <ScrollRow key={genre} genre={genre} items={items} to={`/browse?genre=${encodeURIComponent(genre)}`} />
            ))}
          </>
        )}
      </div>
    </PageWrapper>
  );
}
