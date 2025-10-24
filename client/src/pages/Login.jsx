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
try { await login(email, password); nav('/') }
catch (e) { setErr(e.response?.data?.error || 'Erreur de connexion') }
}


return (
<div className="max-w-sm mx-auto grid gap-4">
<h2 className="text-2xl font-semibold">Connexion</h2>
<form onSubmit={submit} className="card p-4 grid gap-3">
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="input" type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="btn">Se connecter</button>
{err && <div className="text-rose-600 text-sm">{err}</div>}
</form>
<p className="opacity-80">Pas de compte ? <Link className="underline" to="/register">Inscription</Link></p>
</div>
)
}