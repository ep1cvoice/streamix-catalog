import { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { WatchLaterProvider } from './context/WatchLaterContext';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import SkeletonCard from './components/SkeletonCard';
import { useLegacyListsImport } from './hooks/useLegacyListsImport';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function LegacyListsImport() {
  useLegacyListsImport();
  return null;
}

const Home      = lazy(() => import('./pages/Home'));
const Movies    = lazy(() => import('./pages/Movies'));
const Series    = lazy(() => import('./pages/Series'));
const Cartoons  = lazy(() => import('./pages/Cartoons'));
const Favorites = lazy(() => import('./pages/Favorites'));
const WatchLater = lazy(() => import('./pages/WatchLater'));
const Search    = lazy(() => import('./pages/Search'));
const Browse    = lazy(() => import('./pages/Browse'));
const Login     = lazy(() => import('./pages/Login'));
const Register  = lazy(() => import('./pages/Register'));

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
    <AuthProvider>
      <FavoritesProvider>
        <WatchLaterProvider>
          <div className='min-h-screen bg-[#141414] text-white'>
            <ScrollToTop />
            <LegacyListsImport />
            <Navbar />
            <Suspense fallback={<PageSkeleton />}>
              <AnimatePresence mode='wait'>
                <Routes location={location} key={location.pathname}>
                  <Route path='/'            element={<Home />} />
                  <Route path='/movies'      element={<Movies />} />
                  <Route path='/series'      element={<Series />} />
                  <Route path='/cartoons'    element={<Cartoons />} />
                  <Route path='/favorites'   element={<RequireAuth><Favorites /></RequireAuth>} />
                  <Route path='/watch-later' element={<RequireAuth><WatchLater /></RequireAuth>} />
                  <Route path='/search'      element={<Search />} />
                  <Route path='/browse'      element={<Browse />} />
                  <Route path='/login'       element={<Login />} />
                  <Route path='/register'    element={<Register />} />
                </Routes>
              </AnimatePresence>
            </Suspense>
          </div>
        </WatchLaterProvider>
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
