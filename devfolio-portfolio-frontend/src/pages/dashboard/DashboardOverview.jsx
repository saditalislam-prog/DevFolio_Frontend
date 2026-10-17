import { useQuery } from '@tanstack/react-query'
import { dashboardApi } from '../../api/endpoints'
import Skeleton from '../../components/ui/Skeleton'
import ErrorState from '../../components/ui/ErrorState'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { formatDate } from '../../utils/formatDate'

export default function DashboardOverview(){
  useDocumentTitle('Dashboard');const q=useQuery({queryKey:['dashboard','stats'],queryFn:dashboardApi.stats})
  if(q.isLoading)return <Skeleton count={4}/>
  if(q.isError)return <ErrorState onRetry={q.refetch}/>
  const d=q.data;const stats=[['Posts',d.total_posts],['Published',d.published_posts],['Drafts',d.draft_posts],['Projects',d.total_projects],['Skills',d.total_skills],['Comments',d.total_comments],['Pending comments',d.pending_comments],['Unread messages',d.unread_messages],['Likes',d.total_likes],['Views',d.total_views]]
  return <div className="stack-lg"><div className="dash-head"><div><span className="eyebrow">Dashboard</span><h1 style={{fontSize:48}}>Overview</h1></div></div><div className="stat-grid">{stats.map(([label,value])=><div className="stat-card" key={label}><span className="muted">{label}</span><strong>{value??0}</strong></div>)}</div><div className="grid-2"><div className="card"><h2 style={{fontSize:32}}>Top posts</h2><div className="stack">{d.top_posts?.map(p=><div key={p.slug}><strong>{p.title}</strong><p className="muted">{p.views_count} views · {p.likes} likes</p></div>)}</div></div><div className="card"><h2 style={{fontSize:32}}>Recent comments</h2><div className="stack">{d.recent_comments?.map(c=><div key={c.id}><strong>{c.name}</strong><p>{c.content.slice(0,100)}</p><small className="muted">{c.post__title} · {formatDate(c.created_at)}</small></div>)}</div></div></div><div className="card"><h2 style={{fontSize:32}}>Posts per month</h2><div className="row">{d.posts_per_month?.map(m=><div className="badge" key={m.month}>{formatDate(m.month,{year:'numeric',month:'short'})}: {m.count}</div>)}</div></div></div>
}
