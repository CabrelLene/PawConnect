import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const nav = useNavigate()
const { login } = useAuth()


const submit = async (e) => {
e.preventDefault()
try {
await login(email, password)
nav('/')
} catch (e) {
setErr(e.response?.data?.error || 'Erreur de connexion')
}
}


return (
<div style={{ maxWidth:360, margin:'40px auto' }}>
<h2>Connexion</h2>
<form onSubmit={submit} style={{ display:'grid', gap:8 }}>
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
<button>Se connecter</button>
{err && <div style={{ color:'crimson' }}>{err}</div>}
</form>
<p>Pas de compte ? <Link to="/register">Inscription</Link></p>
</div>
)
}