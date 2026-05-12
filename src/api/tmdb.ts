import type { Movie, Show } from '../types/content';

const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_KEY;
const IMG = 'https://image.tmdb.org/t/p/w500';
const BACKDROP = 'https://image.tmdb.org/t/p/w1280';

const MOVIE_GENRES: Record<number, string> = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music',
  9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 53: 'Thriller',
  10752: 'War', 37: 'Western',
};

const TV_GENRES: Record<number, string> = {
  10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy',
  80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family',
  10762: 'Kids', 9648: 'Mystery', 10765: 'Sci-Fi & Fantasy', 37: 'Western',
};

async function get(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const r = await fetch(url.toString());
  if (!r.ok) throw new Error(`TMDB error ${r.status}`);
  return r.json();
}

function mapGenres(ids: number[], map: Record<number, string>) {
  return ids.map(id => map[id]).filter(Boolean) as string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMovie(item: any): Movie {
  return {
    id: item.id,
    title: item.title,
    year: item.release_date ? parseInt(item.release_date) : 0,
    rating: Math.round(item.vote_average * 10) / 10,
    genre: mapGenres(item.genre_ids ?? [], MOVIE_GENRES),
    type: 'movie',
    poster: item.poster_path ? `${IMG}${item.poster_path}` : '',
    hero: item.backdrop_path ? `${BACKDROP}${item.backdrop_path}` : undefined,
    description: item.overview,
    language: item.original_language,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeShow(item: any, type: 'series' | 'cartoon'): Show {
  return {
    id: item.id,
    title: item.name,
    year: item.first_air_date ? parseInt(item.first_air_date) : 0,
    rating: Math.round(item.vote_average * 10) / 10,
    genre: mapGenres(item.genre_ids ?? [], TV_GENRES),
    type,
    poster: item.poster_path ? `${IMG}${item.poster_path}` : '',
    hero: item.backdrop_path ? `${BACKDROP}${item.backdrop_path}` : undefined,
    description: item.overview,
    language: item.original_language,
  };
}

export async function fetchMovies(): Promise<Movie[]> {
  const data = await get('/movie/popular');
  return data.results.map(normalizeMovie);
}

export async function fetchSeries(): Promise<Show[]> {
  const data = await get('/tv/popular');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.map((item: any) => normalizeShow(item, 'series'));
}

export async function fetchCartoons(): Promise<Show[]> {
  const data = await get('/discover/tv', { with_genres: '16' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.results.map((item: any) => normalizeShow(item, 'cartoon'));
}

export const fetchSearch = (q: string) => get('/search/multi', { query: q });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeMovieDetail(data: any): Movie {
  return {
    id: data.id,
    title: data.title,
    year: data.release_date ? parseInt(data.release_date) : 0,
    rating: Math.round(data.vote_average * 10) / 10,
    genre: data.genres?.map((g: any) => g.name as string) ?? [],
    type: 'movie',
    poster: data.poster_path ? `${IMG}${data.poster_path}` : '',
    hero: data.backdrop_path ? `${BACKDROP}${data.backdrop_path}` : undefined,
    description: data.overview,
    language: data.original_language,
    director: data.credits?.crew?.find((c: any) => c.job === 'Director')?.name,
    cast: data.credits?.cast?.slice(0, 5).map((c: any) => c.name as string),
    duration: data.runtime ?? undefined,
    country: data.production_countries?.[0]?.name,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeShowDetail(data: any, type: 'series' | 'cartoon'): Show {
  return {
    id: data.id,
    title: data.name,
    year: data.first_air_date ? parseInt(data.first_air_date) : 0,
    rating: Math.round(data.vote_average * 10) / 10,
    genre: data.genres?.map((g: any) => g.name as string) ?? [],
    type,
    poster: data.poster_path ? `${IMG}${data.poster_path}` : '',
    hero: data.backdrop_path ? `${BACKDROP}${data.backdrop_path}` : undefined,
    description: data.overview,
    language: data.original_language,
    creator: data.created_by?.[0]?.name,
    cast: data.credits?.cast?.slice(0, 5).map((c: any) => c.name as string),
    seasons: data.number_of_seasons ?? undefined,
    country: data.origin_country?.[0],
  };
}

export async function fetchItemById(
  id: number,
  mediaType: 'movie' | 'tv',
  type: 'movie' | 'series' | 'cartoon' = mediaType === 'movie' ? 'movie' : 'series'
): Promise<ContentItem> {
  const data = await get(`/${mediaType}/${id}`, { append_to_response: 'credits' });
  return mediaType === 'movie'
    ? normalizeMovieDetail(data)
    : normalizeShowDetail(data, type as 'series' | 'cartoon');
}

export interface Details {
  director?: string
  creator?: string
  cast?: string[]
  duration?: number
  seasons?: number
  country?: string
}

export async function fetchDetails(id: number, mediaType: 'movie' | 'tv'): Promise<Details> {
  const data = await get(`/${mediaType}/${id}`, { append_to_response: 'credits' });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cast = data.credits?.cast?.slice(0, 5).map((c: any) => c.name as string);

  if (mediaType === 'movie') {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      director: data.credits?.crew?.find((c: any) => c.job === 'Director')?.name,
      cast,
      duration: data.runtime ?? undefined,
      country: data.production_countries?.[0]?.name,
    };
  }
  return {
    creator: data.created_by?.[0]?.name,
    cast,
    seasons: data.number_of_seasons ?? undefined,
    country: data.origin_country?.[0],
  };
}

export async function fetchVideos(id: number, mediaType: 'movie' | 'tv'): Promise<string | null> {
  const data = await get(`/${mediaType}/${id}/videos`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const yt = (data.results ?? []).filter((v: any) => v.site === 'YouTube');
  const pick = (
    yt.find((v: any) => v.type === 'Trailer' && v.official) ??
    yt.find((v: any) => v.type === 'Trailer') ??
    yt.find((v: any) => v.type === 'Teaser')
  );
  return pick?.key ?? null;
}
