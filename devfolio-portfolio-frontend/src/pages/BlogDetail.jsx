import { Copy, Share2 } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import toast from 'react-hot-toast'
import { postsApi } from '../api/endpoints'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Skeleton from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import LikeButton from '../components/blog/LikeButton'
import CommentForm from '../components/blog/CommentForm'
import CommentList from '../components/blog/CommentList'
import PostCard from '../components/blog/PostCard'
import { formatDate } from '../utils/formatDate'

export default function BlogDetail(){
  const {slug}=useParams();const post=useQuery({queryKey:['post',slug],queryFn:()=>postsApi.get(slug)});const comments=useQuery({queryKey:['comments',slug],queryFn:()=>postsApi.comments(slug)});useDocumentTitle(post.data?.title||'Blog post')
  if(post.isLoading)return <div className="container section"><Skeleton count={2}/></div>
  if(post.isError)return <div className="container section"><ErrorState message="Post not found or not published." onRetry={post.refetch}/></div>
  const p=post.data
  const copy=async()=>{await navigator.clipboard.writeText(window.location.href);toast.success('Link copied.')}
  const share=async()=>{if(navigator.share){await navigator.share({title:p.title,url:window.location.href})}else copy()}
  return <article><div className="container"><header className="page-header prose"><span className="badge">{p.category?.name}</span><h1>{p.title}</h1><p className="muted">{formatDate(p.published_at)} · {p.reading_time} min read · {p.views_count} views</p></header>{p.cover_image&&<img src={p.cover_image} alt={`${p.title} cover`} style={{width:'100%',maxHeight:600,objectFit:'cover',borderRadius:24}}/>}<div className="section-sm prose"><ReactMarkdown>{p.content}</ReactMarkdown><div className="pill-list">{p.tags?.map(t=><span className="pill" key={t.id}>{t.name}</span>)}</div><div className="row" style={{marginTop:24}}><LikeButton post={p}/><button className="button secondary" onClick={copy}><Copy size={18}/>Copy link</button><button className="button secondary" onClick={share}><Share2 size={18}/>Share</button></div></div><section className="section-sm prose"><h2>Leave a comment</h2><CommentForm slug={slug}/><p className="muted">Comments appear publicly only after owner approval.</p></section><section className="section-sm prose"><h2>Comments</h2>{comments.isLoading?<Skeleton count={2}/>:<CommentList comments={comments.data||[]} slug={slug}/>}</section>{p.related_posts?.length>0&&<section className="section-sm stack-lg"><h2>Related posts</h2><div className="grid-3">{p.related_posts.map(r=><PostCard key={r.slug} post={r}/>)}</div></section>}</div></article>
}
