import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'


export default function Navbar() {
const { user, logout } = useAuth()
const nav = useNavigate()


return (
<header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 dark:bg-black/30 border-b border-white/20">
<nav className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-4">
<Link to="/" className="text-xl font-semibold tracking-tight">🐾 PawConnect</Link>
<div className="ml-auto flex items-center gap-3">
<ThemeToggle />
{user ? (
<>
<Link to={`/profile/${user.id}`} className="btn">Profil</Link>
<button onClick={() => { logout(); nav('/login') }} className="btn !bg-rose-600 hover:!bg-rose-500">Déconnexion</button>
</>
) : (
<>
<Link to="/login" className="btn">Connexion</Link>
<Link to="/register" className="btn">Inscription</Link>
</>
)}
</div>
</nav>
</header>
)
}