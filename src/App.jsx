import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';

import Navbar from './components/Navbar';

const Home = lazy(() => import('./pages/Home'));
const Movies = lazy(() => import('./pages/Movies'));
const Series = lazy(() => import('./pages/Series'));
const Cartoons = lazy(() => import('./pages/Cartoons'));
const Favorites = lazy(() => import('./pages/Favorites'));

export default function App() {
	return (
		<BrowserRouter>
			<FavoritesProvider>
				<div className='min-h-screen bg-[#141414] text-white'>
					<Navbar />
					<Suspense fallback={<p>Loading...</p>}>
						<Routes>
							<Route path='/' element={<Home />} />
							<Route path='/movies' element={<Movies />} />
							<Route path='/series' element={<Series />} />
							<Route path='/cartoons' element={<Cartoons />} />
							<Route path='/favorites' element={<Favorites />} />
						</Routes>
					</Suspense>
				</div>
			</FavoritesProvider>
		</BrowserRouter>
	);
}
