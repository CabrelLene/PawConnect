import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../api'
import PostCard from '../components/PostCard'


export default function Profile() {
const { id } = useParams()
const [user, setUser] = useState(null)
const [posts, setPosts] = useState([])


useEffect(() => {
(async () => {
const { data: u } = await api.get(`/users/${id}`)
setUser(u)
const { data: ps } = await api.get(`/posts/by/${id}`)
setPosts(ps)
})()
}, [id])


return (
<div style={{ maxWidth:640, margin:'24px auto', display:'grid', gap:12 }}>
{user && (
<div style={{ padding:12, border:'1px solid #eee', borderRadius:8 }}>
<h2>{user.name}</h2>
<div>{user.bio}</div>
<div>Abonnés: {user.followers?.length || 0} • Abonnements: {user.following?.length || 0}</div>
</div>
)}
{posts.map(p => <PostCard key={p._id} post={p} />)}
</div>
)
}