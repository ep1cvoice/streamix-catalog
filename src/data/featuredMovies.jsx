import { movies, series } from './content'

import theboysHero from '../assets/hero/theboyshero.jpg'
import pulpFictionHero from '../assets/hero/pulpfictionhero.jpg'
import strangerThingsHero from '../assets/hero/strangerthingshero.jpg'
import breakingBadHero from '../assets/hero/breakingbadhero.jpg'

export const featuredMovies = [
	{ ...series.find(s => s.id === 11),  hero: theboysHero, objectPosition: 'center 50%' },
	{ ...series.find(s => s.id === 12),  hero: breakingBadHero },
	{ ...movies.find(m => m.id === 6),   hero: pulpFictionHero },
	{ ...series.find(s => s.id === 16),  hero: strangerThingsHero },
]
