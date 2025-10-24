import { api } from '../api'
import { motion } from 'framer-motion'


export default function PostCard({ post, onLike }) {
const like = async () => {
const { data } = await api.put(`/posts/${post._id}/like`)
onLike?.(post._id, data.likes)
}


return (
<motion.article layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
className="card p-4">
<div className="flex items-center gap-3 mb-3">
<div className="size-10 rounded-full bg-gradient-to-tr from-brand-500 to-emerald-400 grid place-items-center text-white font-semibold">
{post.author?.name?.[0]?.toUpperCase() || 'U'}
</div>
<div className="leading-tight">
<div className="font-semibold">{post.author?.name}</div>
<div className="text-sm opacity-70">{new Date(post.createdAt||Date.now()).toLocaleString()}</div>
</div>
</div>
{post.image && <img src={post.image} alt="post" className="rounded-xl border border-white/20 mb-3" />}
<p className="mb-3">{post.description}</p>
<button onClick={like} className="btn">❤️ {post.likes?.length || 0}</button>
</motion.article>
)
}