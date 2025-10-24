import { api } from '../api'


export default function PostCard({ post, onLike }) {
const like = async () => {
const { data } = await api.put(`/posts/${post._id}/like`)
onLike?.(post._id, data.likes)
}


return (
<div style={{ border:'1px solid #eee', padding:12, borderRadius:8 }}>
<div style={{ fontWeight:600 }}>
{post.author?.name}
</div>
{post.image && (
<img src={post.image} alt="post" style={{ width:'100%', borderRadius:8, margin:'8px 0' }} />
)}
<div>{post.description}</div>
<button onClick={like} style={{ marginTop:8 }}>❤️ {post.likes?.length || 0}</button>
</div>
)
}