import { useMemo } from 'react';
import HeroBanner from '../components/HeroBanner';
import ScrollRow from '../components/ScrollRow';
import PageWrapper from '../components/PageWrapper';
import { fetchMovies, fetchSeries, fetchCartoons } from '../api/tmdb';
import { useTMDB } from '../hooks/useTMDB';
import { groupByGenre } from '../utils/groupByGenre';

const PLACEHOLDER_GENRES = ['Drama', 'Action', 'Comedy', 'Sci-Fi', 'Thriller'];

export default function Home() {
  const { items: movies,   loading: moviesLoading   } = useTMDB(fetchMovies);
  const { items: series,   loading: seriesLoading   } = useTMDB(fetchSeries);
  const { items: cartoons, loading: cartoonsLoading } = useTMDB(fetchCartoons);

  const isLoading = moviesLoading || seriesLoading || cartoonsLoading;

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
        {isLoading
          ? PLACEHOLDER_GENRES.map(genre => (
              <ScrollRow key={genre} genre={genre} items={[]} loading={true} />
            ))
          : genreRows.map(({ genre, items }) => (
              <ScrollRow key={genre} genre={genre} items={items} />
            ))
        }
      </div>
    </PageWrapper>
  );
}
