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
try { await register(name, email, password); nav('/') }
catch (e) { setErr(e.response?.data?.error || "Erreur d'inscription") }
}


return (
<div className="max-w-sm mx-auto grid gap-4">
<h2 className="text-2xl font-semibold">Inscription</h2>
<form onSubmit={submit} className="card p-4 grid gap-3">
<input className="input" placeholder="Nom" value={name} onChange={e=>setName(e.target.value)} />
<input className="input" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
<input className="input" type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
<button className="btn">Créer le compte</button>
{err && <div className="text-rose-600 text-sm">{err}</div>}
</form>
<p className="opacity-80">Déjà un compte ? <Link className="underline" to="/login">Connexion</Link></p>
</div>
)
}