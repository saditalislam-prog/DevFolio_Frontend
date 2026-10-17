import { ExternalLink, Github } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { projectsApi } from '../api/endpoints'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Skeleton from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import { formatDate } from '../utils/formatDate'

export default function ProjectDetail(){
  const {slug}=useParams();const q=useQuery({queryKey:['project',slug],queryFn:()=>projectsApi.get(slug)});useDocumentTitle(q.data?.title||'Project')
  if(q.isLoading)return <div className="container section"><Skeleton count={2}/></div>
  if(q.isError)return <div className="container section"><ErrorState message="Project not found." onRetry={q.refetch}/></div>
  const p=q.data
  return <div className="container"><header className="page-header"><span className="badge">{p.category}</span><h1>{p.title}</h1><p className="muted">{p.summary}</p><div className="row actions">{p.live_url&&<a className="button" href={p.live_url} target="_blank" rel="noreferrer"><ExternalLink size={18}/>Live site</a>}{p.github_url&&<a className="button secondary" href={p.github_url} target="_blank" rel="noreferrer"><Github size={18}/>GitHub</a>}</div></header>{p.cover_image&&<img src={p.cover_image} alt={`${p.title} project screenshot`} style={{width:'100%',aspectRatio:'16/9',objectFit:'cover',borderRadius:24}}/>}<section className="section-sm grid-2"><div><h2>Project details</h2><p className="muted">Completed {formatDate(p.completed_date)}</p><div className="pill-list">{p.tech_stack.map(s=><span className="pill" key={s.id}>{s.name}</span>)}</div></div><div><p style={{whiteSpace:'pre-line'}}>{p.description}</p></div></section></div>
}
