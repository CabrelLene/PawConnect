import { useState } from 'react'
import { api } from '../api'
import { motion } from 'framer-motion'


export default function CreatePost({ onCreated }) {
const [description, setDescription] = useState('')
const [file, setFile] = useState(null)
const [loading, setLoading] = useState(false)
const [preview, setPreview] = useState('')


const onFile = (f) => {
setFile(f)
if (f) setPreview(URL.createObjectURL(f)); else setPreview('')
}


const submit = async (e) => {
e.preventDefault()
setLoading(true)
const form = new FormData()
form.append('description', description)
if (file) form.append('image', file)
const { data } = await api.post('/posts', form, { headers: { 'Content-Type': 'multipart/form-data' } })
setDescription(''); setFile(null); setPreview(''); setLoading(false)
onCreated?.(data)
}


return (
<motion.form layout onSubmit={submit} className="card p-4 grid gap-3">
<textarea className="input min-h-[90px]" placeholder="Quoi de neuf ?" value={description} onChange={e=>setDescription(e.target.value)} />
{preview && (
<img src={preview} alt="preview" className="rounded-xl border border-white/20" />
)}
<div className="flex items-center gap-3">
<label className="btn cursor-pointer">
📎 Image
<input type="file" className="hidden" onChange={e=>onFile(e.target.files?.[0]||null)} />
</label>
<button disabled={loading} className="btn">{loading ? 'Publication…' : 'Publier'}</button>
</div>
</motion.form>
)
}