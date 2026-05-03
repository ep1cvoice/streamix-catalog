import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import Series from './pages/Series'
import Favorites from './pages/Favorites'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#141414] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/series" element={<Series />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
