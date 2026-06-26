import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import HabitDetailPage from './pages/HabitDetailsPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/:id" element={<HabitDetailPage />} />
    </Routes>
  )
}


export default App;