import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Feed from './pages/Feed'
import Profile from './pages/Profile'


export default function App() {
return (
<div className="min-h-screen">
<Navbar />
<main className="mx-auto max-w-6xl px-4 py-6">
<Routes>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
<Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
</Routes>
</main>
</div>
)
}