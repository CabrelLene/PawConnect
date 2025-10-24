import { useEffect, useState } from 'react'
import { api } from '../api'
import PostCard from '../components/PostCard'
import CreatePost from '../components/CreatePost'


export default function Feed() {
const [posts, setPosts] = useState([])


const load = async () => {
const { data } = await api.get('/posts')
setPosts(data)
}


useEffect(() => { load() }, [])


const onCreated = (p) => setPosts(prev => [p, ...prev])
const onLike = (id, likes) => setPosts(prev => prev.map(p => p._id === id ? { ...p, likes: Array.from({length: likes}) } : p))


return (
<div style={{ maxWidth:640, margin:'24px auto', display:'grid', gap:12 }}>
<CreatePost onCreated={onCreated} />
{posts.map(p => <PostCard key={p._id} post={p} onLike={onLike} />)}
</div>
)
}