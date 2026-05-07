export default function SkeletonCard() {
	return (
		<div className='bg-[#1c1c1c] rounded-md overflow-hidden'>
			{/* Poster */}
			<div className='w-full aspect-[2/3] bg-[#2a2a2a] animate-pulse' />

			{/* Info */}
			<div className='p-3 flex flex-col gap-2'>
				<div className='h-3.5 bg-[#2a2a2a] rounded-sm w-3/4 animate-pulse' />
				<div className='flex items-center justify-between'>
					<div className='h-3 bg-[#2a2a2a] rounded-sm w-10 animate-pulse' />
					<div className='h-3 bg-[#2a2a2a] rounded-sm w-8 animate-pulse' />
				</div>
				<div className='h-3 bg-[#2a2a2a] rounded-sm w-1/2 animate-pulse' />
			</div>
		</div>
	)
}
