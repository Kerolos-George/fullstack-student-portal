import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAppSelector } from './store/hooks'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'
import AnnouncementsPage from './pages/AnnouncementsPage'
import QuizzesPage from './pages/QuizzesPage'
import { requireAuth } from './hoc/requireAuth'

const ProtectedDashboard = requireAuth(Dashboard)
const ProtectedAnnouncements = requireAuth(AnnouncementsPage)
const ProtectedQuizzes = requireAuth(QuizzesPage)

function App() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/" element={isAuthenticated ? <ProtectedDashboard /> : <HomePage />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/announcements" element={<ProtectedAnnouncements />} />
        <Route path="/quizzes" element={<ProtectedQuizzes />} />
      </Routes>
    </Router>
  )
}

export default App
