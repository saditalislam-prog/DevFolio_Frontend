import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { postsApi, categoriesApi, tagsApi } from '../api/endpoints'
import useDebounce from '../hooks/useDebounce'
import useDocumentTitle from '../hooks/useDocumentTitle'
import PostCard from '../components/blog/PostCard'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import Pagination from '../components/ui/Pagination'

export default function Blog(){
  useDocumentTitle('Blog')
  const [params,setParams]=useSearchParams();const [search,setSearch]=useState(params.get('search')||'');const debounced=useDebounce(search)
  const page=Number(params.get('page')||1),category=params.get('category')||'',tag=params.get('tag')||'',ordering=params.get('ordering')||'-published_at'
  const firstSearchEffect = useRef(true)
  useEffect(()=>{
    if (firstSearchEffect.current) { firstSearchEffect.current = false; return }
    const next=new URLSearchParams(window.location.search)
    debounced?next.set('search',debounced):next.delete('search')
    next.set('page','1')
    setParams(next,{replace:true})
  },[debounced,setParams])
  const posts=useQuery({queryKey:['posts',{search:debounced,page,category,tag,ordering}],queryFn:()=>postsApi.list({search:debounced||undefined,page,category:category||undefined,tag:tag||undefined,ordering})})
  const categories=useQuery({queryKey:['categories'],queryFn:()=>categoriesApi.list()});const tags=useQuery({queryKey:['tags'],queryFn:()=>tagsApi.list()})
  const update=(key,value)=>{const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);if(key!=='page')next.set('page','1');setParams(next)}
  return <div className="container"><header className="page-header"><span className="eyebrow">Blog</span><h1>Notes from what I am learning</h1><p className="muted">Searchable, filterable articles served by the Django API.</p></header><section className="section-sm stack-lg"><div className="field"><label>Search posts</label><input className="input" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title, excerpt, or content…"/></div><div className="pill-list"><button className={`pill ${!category?'active':''}`} onClick={()=>update('category','')}>All</button>{(categories.data?.results||categories.data||[]).map(c=><button className={`pill ${category===c.slug?'active':''}`} key={c.id} onClick={()=>update('category',c.slug)}>{c.name} ({c.posts_count})</button>)}</div><div className="toolbar"><div className="field"><label>Tag</label><select className="select" value={tag} onChange={e=>update('tag',e.target.value)}><option value="">All tags</option>{(tags.data?.results||tags.data||[]).map(t=><option key={t.id} value={t.slug}>{t.name}</option>)}</select></div><div className="field"><label>Sort</label><select className="select" value={ordering} onChange={e=>update('ordering',e.target.value)}><option value="-published_at">Newest</option><option value="-views_count">Most viewed</option><option value="-likes_count">Most liked</option><option value="title">A–Z</option></select></div></div>{posts.isLoading?<Skeleton count={6}/>:posts.isError?<ErrorState onRetry={posts.refetch}/>:posts.data?.results?.length===0?<EmptyState title="No posts found" text={`No posts found for “${debounced}”.`}/>:<><div className="grid-3">{(posts.data?.results||[]).map(p=><PostCard key={p.slug} post={p}/>)}</div><Pagination page={page} count={posts.data?.count} pageSize={6} onPage={p=>update('page',String(p))}/></>}</section></div>
}
