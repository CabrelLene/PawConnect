import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Register() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [err, setErr] = useState('')
const nav = useNavigate()
const { register } = useAuth()


const submit = async (e) => {
e.preventDefault()
try {
await register(name, email, password)
nav('/')
} catch (e) {
setErr(e.response?.data?.error || "Erreur d'inscription")
}
}


return (
<div style={{ maxWidth:360, margin:'40px auto' }}>
<h2>Inscription</h2>
<form onSubmit={submit} style={{ display:'grid', gap:8 }}>
<input placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
<input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
<button>Créer le compte</button>
{err && <div style={{ color:'crimson' }}>{err}</div>}
</form>
<p>Déjà un compte ? <Link to="/login">Connexion</Link></p>
</div>
)
}