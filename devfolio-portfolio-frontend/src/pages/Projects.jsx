import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { projectsApi } from '../api/endpoints'
import useDebounce from '../hooks/useDebounce'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import Pagination from '../components/ui/Pagination'

const categories=['','WEB','MOBILE','API','ML','OTHER']
export default function Projects(){
  useDocumentTitle('Projects')
  const [params,setParams]=useSearchParams()
  const [search,setSearch]=useState(params.get('search')||'')
  const debounced=useDebounce(search)
  const page=Number(params.get('page')||1), category=params.get('category')||'', ordering=params.get('ordering')||'-completed_date'
  const query=useQuery({queryKey:['projects',{search:debounced,page,category,ordering}],queryFn:()=>projectsApi.list({search:debounced||undefined,page,category:category||undefined,ordering})})
  const update=(key,value)=>{const next=new URLSearchParams(params);value?next.set(key,value):next.delete(key);if(key!=='page')next.set('page','1');setParams(next)}
  return <div className="container"><header className="page-header"><span className="eyebrow">Projects</span><h1>Selected work</h1><p className="muted">Search and filter the projects loaded from the API.</p></header><section className="section-sm stack-lg"><div className="toolbar"><div className="field"><label>Search</label><input className="input" value={search} onChange={e=>{setSearch(e.target.value);update('search',e.target.value)}} placeholder="Search projects…"/></div><div className="field"><label>Category</label><select className="select" value={category} onChange={e=>update('category',e.target.value)}>{categories.map(c=><option key={c} value={c}>{c||'All categories'}</option>)}</select></div><div className="field"><label>Sort</label><select className="select" value={ordering} onChange={e=>update('ordering',e.target.value)}><option value="-completed_date">Newest</option><option value="completed_date">Oldest</option><option value="display_order">Display order</option></select></div></div>{query.isLoading?<Skeleton count={6}/>:query.isError?<ErrorState onRetry={query.refetch}/>:query.data?.results?.length===0?<EmptyState title="No projects found" text={`No projects match “${debounced}”.`}/>:<><div className="grid-3">{(query.data?.results||query.data||[]).map(p=><article className="card stack" key={p.slug}>{p.cover_image&&<img className="card-image" src={p.cover_image} alt={`${p.title} screenshot`} loading="lazy"/>}<span className="badge">{p.category}</span><h3><Link to={`/projects/${p.slug}`}>{p.title}</Link></h3><p className="muted">{p.summary}</p><div className="pill-list">{p.tech_stack?.map(s=><span className="pill" key={s.id}>{s.name}</span>)}</div></article>)}</div><Pagination page={page} count={query.data?.count} pageSize={9} onPage={p=>update('page',String(p))}/></>}</section></div>
}
