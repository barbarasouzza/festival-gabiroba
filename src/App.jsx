import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import SpeciesIndex from './pages/SpeciesIndex'
import SpeciesPage from './pages/SpeciesPage'
import TrailPage from './pages/TrailPage'
import BottomNav from './components/BottomNav'
import ScrollManager from './components/ScrollManager'
import MotionManager from './components/MotionManager'

export default function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <MotionManager />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/especies" element={<SpeciesIndex />} />
          <Route path="/especies/:slug" element={<SpeciesPage />} />
          <Route path="/minha-trilha" element={<TrailPage />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  )
}
