import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';

const Home      = lazy(() => import('./pages/Home'));
const Movies    = lazy(() => import('./pages/Movies'));
const Series    = lazy(() => import('./pages/Series'));
const Cartoons  = lazy(() => import('./pages/Cartoons'));
const Favorites = lazy(() => import('./pages/Favorites'));

function AppContent() {
  const location = useLocation();

  return (
    <FavoritesProvider>
      <div className='min-h-screen bg-[#141414] text-white'>
        <Navbar />
        <Suspense fallback={<div className='min-h-screen bg-[#141414]' />}>
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path='/'          element={<Home />} />
              <Route path='/movies'    element={<Movies />} />
              <Route path='/series'    element={<Series />} />
              <Route path='/cartoons'  element={<Cartoons />} />
              <Route path='/favorites' element={<Favorites />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </div>
    </FavoritesProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
