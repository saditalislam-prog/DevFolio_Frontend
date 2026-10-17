import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/formatDate'
export default function PostCard({ post }){ return <article className="card stack"><Link to={`/blog/${post.slug}`}>{post.cover_image&&<img className="card-image" src={post.cover_image} alt={`${post.title} cover`} loading="lazy"/>}</Link><div><span className="badge">{post.category?.name}</span><h3><Link to={`/blog/${post.slug}`}>{post.title}</Link></h3><p className="muted">{post.excerpt}</p><small className="muted">{formatDate(post.published_at)} · {post.reading_time} min read</small></div></article> }
