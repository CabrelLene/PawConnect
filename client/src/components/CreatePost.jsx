import { useState } from 'react'
import { api } from '../api'


export default function CreatePost({ onCreated }) {
const [description, setDescription] = useState('')
const [file, setFile] = useState(null)
const [loading, setLoading] = useState(false)


const submit = async (e) => {
e.preventDefault()
setLoading(true)
const form = new FormData()
form.append('description', description)
if (file) form.append('image', file)
const { data } = await api.post('/posts', form, {
headers: { 'Content-Type': 'multipart/form-data' }
})
setDescription('')
setFile(null)
setLoading(false)
onCreated?.(data)
}


return (
<form onSubmit={submit} style={{ display:'grid', gap:8, border:'1px solid #eee', padding:12, borderRadius:8 }}>
<textarea placeholder="Quoi de neuf ?" value={description} onChange={e=>setDescription(e.target.value)} />
<input type="file" onChange={e=>setFile(e.target.files?.[0] || null)} />
<button disabled={loading}>{loading ? 'Publication…' : 'Publier'}</button>
</form>
)
}