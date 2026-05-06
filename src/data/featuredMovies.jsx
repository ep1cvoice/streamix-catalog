import theboysHero from '../assets/hero/theboyshero.jpg';
import pulpFictionHero from '../assets/hero/pulpfictionhero.jpg';
import strangerThingsHero from '../assets/hero/strangerthingshero.jpg';
import breakingBadHero from '../assets/hero/breakingbadhero.jpg';

export const featuredMovies = [
	{
		id: 'feat-1',
		title: 'The Boys',
		type: 'series',
		genre: 'Action · Satire',
		rating: '8.7',
		year: 2019,
		description:
			'A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers and are shielded from consequences by a powerful corporation.',
		hero: theboysHero,
	},
	{
		id: 'feat-2',
		title: 'Breaking Bad',
		type: 'series',
		genre: 'Crime · Thriller',
		rating: '9.5',
		year: 2008,
		description:
			"A chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine to secure his family's future.",
		hero: breakingBadHero,
	},
	{
		id: 'feat-3',
		title: 'Pulp Fiction',
		type: 'movie',
		genre: 'Crime · Drama',
		rating: '8.9',
		year: 1994,
		description:
			'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
		hero: pulpFictionHero,
	},
	{
		id: 'feat-4',
		title: 'Stranger Things',
		type: 'series',
		genre: 'Sci-Fi · Horror',
		rating: '8.7',
		year: 2016,
		description:
			'When a young boy vanishes, his mother, a police chief, and his friends must confront terrifying supernatural forces to get him back.',
		hero: strangerThingsHero,
	},
];
