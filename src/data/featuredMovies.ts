import theboysHero        from '../assets/hero/theboyshero.jpg'
import breakingBadHero    from '../assets/hero/breakingbadhero.jpg'
import pulpFictionHero    from '../assets/hero/pulpfictionhero.jpg'
import strangerThingsHero from '../assets/hero/strangerthingshero.jpg'

export const FEATURED_CONFIG = [
  { id: 76479, mediaType: 'tv'    as const, type: 'series' as const, hero: theboysHero,        objectPosition: 'center 50%' },
  { id: 1396,  mediaType: 'tv'    as const, type: 'series' as const, hero: breakingBadHero },
  { id: 680,   mediaType: 'movie' as const, type: 'movie'  as const, hero: pulpFictionHero },
  { id: 66732, mediaType: 'tv'    as const, type: 'series' as const, hero: strangerThingsHero },
]
