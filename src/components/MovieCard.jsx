import { useState } from 'react';
import MovieModal from './MovieModal';
import HeartIcon from '../assets/Icons/HeartIcon';
import StarIcon from '../assets/Icons/StarIcon';

export default function MovieCard({ item }) {
	const [isOpenModal, setIsOpenModal] = useState(false);

	return (
		<>
			{isOpenModal && (
				<MovieModal item={item} onClose={() => setIsOpenModal(false)} />
			)}

			<div
				onClick={() => setIsOpenModal(true)}
				className='group relative bg-[#1c1c1c] rounded-md overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 hover:shadow-[0_8px_32px_rgba(220,38,38,0.25)]'>
				{/* Poster */}
				<div className='relative overflow-hidden'>
					<img
						src={item.poster}
						alt={item.title}
						className='w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-105'
						loading='lazy'
					/>

					{/* Dark overlay on hover */}
					<div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

					{/* Type badge */}
					<div className='absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
						<span className='text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded uppercase tracking-wider'>
							{{ movie: 'Movie', series: 'TV Series', serial: 'TV Series', cartoon: 'Cartoon' }[item.type] ??
								'TV Series'}
						</span>
					</div>

					{/* Heart button */}
					<button
						onClick={e => e.stopPropagation()}
						className='absolute top-2 right-2 p-2 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-600 hover:scale-110'
						aria-label='Add to favorites'>
						<HeartIcon />
					</button>
				</div>

				{/* Info */}
				<div className='p-3'>
					<h3 className='text-white font-semibold text-sm truncate mb-1'>{item.title}</h3>
					<div className='flex items-center justify-between'>
						<span className='text-gray-500 text-xs'>{item.year}</span>
						<div className='flex items-center gap-1'>
							<StarIcon />
							<span className='text-yellow-400 text-xs font-semibold'>{item.rating}</span>
						</div>
					</div>
					<span className='text-gray-600 text-xs mt-0.5 block'>{item.genre}</span>
				</div>

				{/* Red bottom border on hover */}
				<div className='absolute bottom-0 left-0 right-0 h-0.5 bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left' />
			</div>
		</>
	);
}
