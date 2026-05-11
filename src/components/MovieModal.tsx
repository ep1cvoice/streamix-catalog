import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import StarIcon from '../assets/Icons/StarIcon';
import { fetchVideos, fetchDetails } from '../api/tmdb';
import type { Details } from '../api/tmdb';
import type { ContentItem } from '../types/content';

const TYPE_LABEL: Record<string, string> = {
	movie: 'Movie',
	series: 'TV Series',
	serial: 'TV Series',
	cartoon: 'Cartoon',
}

interface MovieModalProps {
	item: ContentItem
	onClose: () => void
}

export default function MovieModal({ item, onClose }: MovieModalProps) {
	const [trailerKey, setTrailerKey] = useState<string | null>(item.trailer ?? null);
	const [trailerLoading, setTrailerLoading] = useState(!item.trailer);
	const [details, setDetails] = useState<Details>({});

	const mediaType = item.type === 'movie' ? 'movie' : 'tv';

	useEffect(() => {
		if (item.trailer) return;
		fetchVideos(item.id, mediaType)
			.then(key => { setTrailerKey(key); setTrailerLoading(false); })
			.catch(() => setTrailerLoading(false));
	}, [item.id, mediaType, item.trailer]);

	useEffect(() => {
		fetchDetails(item.id, mediaType)
			.then(setDetails)
			.catch(() => {});
	}, [item.id, mediaType]);

	const director = details.director ?? item.director;
	const creator  = details.creator  ?? item.creator;
	const cast     = details.cast     ?? item.cast;
	const duration = details.duration ?? item.duration;
	const seasons  = details.seasons  ?? item.seasons;
	const country  = details.country  ?? item.country;

	return createPortal(
		<motion.div
			className='fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.25 }}
			onClick={onClose}>

			<motion.div
				className='relative w-full max-w-2xl bg-neutral-900 text-white rounded-2xl shadow-2xl overflow-hidden overflow-y-auto max-h-[90vh]'
				initial={{ scale: 0.92, opacity: 0 }}
				animate={{ scale: 1,    opacity: 1 }}
				exit={{    scale: 0.92, opacity: 0 }}
				transition={{ type: 'spring', stiffness: 260, damping: 28 }}
				onClick={e => e.stopPropagation()}>

				<button
					onClick={onClose}
					className='absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-red-600 transition cursor-pointer'
					aria-label='Close modal'>
					×
				</button>

				<div className='flex flex-col sm:flex-row'>
					<motion.img
						layoutId={`poster-${item.id}`}
						src={item.poster}
						alt={item.title}
						className='w-full sm:w-44 object-cover object-top shrink-0 max-h-64 sm:max-h-none'
					/>

					<div className='flex flex-col gap-3 p-5 min-w-0'>

						<div>
							<h2 className='text-xl font-bold leading-tight mb-1'>{item.title}</h2>
							<div className='flex flex-wrap items-center gap-2 text-xs'>
								<span className='bg-red-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wide'>
									{TYPE_LABEL[item.type] ?? 'Unknown'}
								</span>
								<span className='text-gray-400'>{item.year}</span>
								<div className='flex items-center gap-1'>
									<StarIcon />
									<span className='text-yellow-400 font-semibold'>{item.rating}</span>
								</div>
								<span className='text-gray-500'>{item.genre.join(', ')}</span>
							</div>
						</div>

						<p className='text-gray-300 text-sm leading-relaxed'>{item.description}</p>

						<div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3'>
							{item.type === 'movie' ? (
								<div>
									<span className='text-gray-500 text-xs uppercase tracking-wide'>Director</span>
									<p className='text-white'>{director ?? '—'}</p>
								</div>
							) : (
								<div>
									<span className='text-gray-500 text-xs uppercase tracking-wide'>Creator</span>
									<p className='text-white'>{creator ?? '—'}</p>
								</div>
							)}

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>
									{item.type === 'movie' ? 'Runtime' : 'Seasons'}
								</span>
								<p className='text-white'>
									{item.type === 'movie'
										? duration ? `${duration} min` : '—'
										: seasons ? `${seasons} season${seasons !== 1 ? 's' : ''}` : '—'}
								</p>
							</div>

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>Cast</span>
								<p className='text-white'>{cast?.join(', ') ?? '—'}</p>
							</div>

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>Country / Language</span>
								<p className='text-white'>{country ?? '—'} · {item.language.toUpperCase()}</p>
							</div>
						</div>
					</div>
				</div>

				<div className='border-t border-white/10'>
					<p className='text-xs text-gray-500 uppercase tracking-wide px-5 pt-4 pb-2'>Trailer</p>
					{trailerLoading ? (
						<div className='w-full aspect-video bg-[#1a1a1a] animate-pulse' />
					) : trailerKey ? (
						<iframe
							className='w-full aspect-video'
							src={`https://www.youtube.com/embed/${trailerKey}`}
							title={`${item.title} trailer`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						/>
					) : (
						<p className='text-gray-600 text-sm px-5 pb-5'>No trailer available</p>
					)}
				</div>
			</motion.div>
		</motion.div>,
		document.body,
	);
}
