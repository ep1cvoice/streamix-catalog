import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import SkeletonCard from './components/SkeletonCard';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

const Home      = lazy(() => import('./pages/Home'));
const Movies    = lazy(() => import('./pages/Movies'));
const Series    = lazy(() => import('./pages/Series'));
const Cartoons  = lazy(() => import('./pages/Cartoons'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Search    = lazy(() => import('./pages/Search'));
const Browse    = lazy(() => import('./pages/Browse'));

function PageSkeleton() {
  return (
    <div className='pt-28 px-8 md:px-12 pb-16'>
      <div className='h-10 bg-[#2a2a2a] rounded w-48 mb-8 animate-pulse' />
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
        {Array.from({ length: 10 }, (_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <FavoritesProvider>
      <div className='min-h-screen bg-[#141414] text-white'>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={<PageSkeleton />}>
          <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
              <Route path='/'          element={<Home />} />
              <Route path='/movies'    element={<Movies />} />
              <Route path='/series'    element={<Series />} />
              <Route path='/cartoons'  element={<Cartoons />} />
              <Route path='/favorites' element={<Favorites />} />
              <Route path='/search'    element={<Search />} />
              <Route path='/browse'   element={<Browse />} />
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
