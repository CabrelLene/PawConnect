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
<div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
<div className="grid gap-4">
<CreatePost onCreated={onCreated} />
{posts.map(p => <PostCard key={p._id} post={p} onLike={onLike} />)}
</div>
<aside className="hidden md:block card p-4 h-fit sticky top-24">
<h3 className="font-semibold mb-2">Tendances</h3>
<ul className="space-y-2 opacity-80 text-sm">
<li>#chiens</li>
<li>#cats</li>
<li>#adoption</li>
</ul>
</aside>
</div>
)
}