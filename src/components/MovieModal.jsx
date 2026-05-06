import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import StarIcon from '../assets/Icons/StarIcon';

const TYPE_LABEL = { movie: 'Movie', series: 'TV Series', serial: 'TV Series', cartoon: 'Cartoon' };

export default function MovieModal({ item, onClose }) {
	const isMovie = item.type === 'movie';

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

				{/* Close button */}
				<button
					onClick={onClose}
					className='absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-black/60 rounded-full text-white hover:bg-red-600 transition cursor-pointer'
					aria-label='Close modal'>
					×
				</button>

				<div className='flex flex-col sm:flex-row'>
					{/* Poster — layoutId matches the card poster so Framer morphs between them */}
					<motion.img
						layoutId={`poster-${item.id}`}
						src={item.poster}
						alt={item.title}
						className='w-full sm:w-44 object-cover object-top shrink-0 max-h-64 sm:max-h-none'
					/>

					{/* Info */}
					<div className='flex flex-col gap-3 p-5 min-w-0'>

						{/* Title + badges */}
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
								<span className='text-gray-500'>{item.genre}</span>
							</div>
						</div>

						{/* Description */}
						<p className='text-gray-300 text-sm leading-relaxed'>{item.description}</p>

						{/* Meta grid */}
						<div className='grid grid-cols-2 gap-x-4 gap-y-2 text-sm border-t border-white/10 pt-3'>
							{isMovie ? (
								<div>
									<span className='text-gray-500 text-xs uppercase tracking-wide'>Director</span>
									<p className='text-white'>{item.director}</p>
								</div>
							) : (
								<div>
									<span className='text-gray-500 text-xs uppercase tracking-wide'>Creator</span>
									<p className='text-white'>{item.creator}</p>
								</div>
							)}

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>
									{isMovie ? 'Runtime' : 'Seasons'}
								</span>
								<p className='text-white'>
									{isMovie ? `${item.duration} min` : `${item.seasons} season${item.seasons !== 1 ? 's' : ''}`}
								</p>
							</div>

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>Cast</span>
								<p className='text-white'>{item.cast.join(', ')}</p>
							</div>

							<div>
								<span className='text-gray-500 text-xs uppercase tracking-wide'>Country / Language</span>
								<p className='text-white'>{item.country} &middot; {item.language.toUpperCase()}</p>
							</div>
						</div>
					</div>
				</div>

				{/* Trailer */}
				{item.trailer && (
					<div className='border-t border-white/10'>
						<p className='text-xs text-gray-500 uppercase tracking-wide px-5 pt-4 pb-2'>Trailer</p>
						<iframe
							className='w-full aspect-video'
							src={`https://www.youtube.com/embed/${item.trailer}`}
							title={`${item.title} trailer`}
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							referrerPolicy='strict-origin-when-cross-origin'
							allowFullScreen
						/>
					</div>
				)}
			</motion.div>
		</motion.div>,
		document.body,
	);
}
