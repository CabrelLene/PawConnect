import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Navbar() {
const { user, logout } = useAuth()
const nav = useNavigate()


return (
<nav style={{ display:'flex', gap:16, padding:12, borderBottom:'1px solid #ddd' }}>
<Link to="/">PawConnect</Link>
<div style={{ marginLeft:'auto', display:'flex', gap:12 }}>
{user ? (
<>
<Link to={`/profile/${user.id}`}>Profil</Link>
<button onClick={() => { logout(); nav('/login') }}>Se déconnecter</button>
</>
) : (
<>
<Link to="/login">Connexion</Link>
<Link to="/register">Inscription</Link>
</>
)}
</div>
</nav>
)
}