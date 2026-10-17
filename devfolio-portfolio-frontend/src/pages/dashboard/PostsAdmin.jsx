import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { postsApi } from '../../api/endpoints'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import ErrorState from '../../components/ui/ErrorState'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { formatDate } from '../../utils/formatDate'

export default function PostsAdmin(){
  useDocumentTitle('Manage posts');const [status,setStatus]=useState('all');const [search,setSearch]=useState('');const [page,setPage]=useState(1);const [deleting,setDeleting]=useState(null);const qc=useQueryClient()
  const q=useQuery({queryKey:['admin-posts',{status,search,page}],queryFn:()=>postsApi.list({status,search:search||undefined,page,ordering:'-published_at'})})
  const del=useMutation({mutationFn:slug=>postsApi.remove(slug),onSuccess:()=>{toast.success('Post deleted.');setDeleting(null);qc.invalidateQueries({queryKey:['admin-posts']})},onError:()=>toast.error('Could not delete post.')})
  const toggle=useMutation({mutationFn:post=>postsApi.update(post.slug,{status:post.status==='PUBLISHED'?'DRAFT':'PUBLISHED'}),onSuccess:()=>{toast.success('Post status updated.');qc.invalidateQueries({queryKey:['admin-posts']})},onError:e=>toast.error(e.response?.data?.content?.[0]||'Could not change status.')})
  return <div><div className="dash-head"><div><span className="eyebrow">Content</span><h1 style={{fontSize:48}}>Posts</h1></div><Link className="button" to="/dashboard/posts/new">New post</Link></div><div className="toolbar" style={{marginBottom:24}}><div className="field"><label>Search</label><input className="input" value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}}/></div><div className="field"><label>Status</label><select className="select" value={status} onChange={e=>{setStatus(e.target.value);setPage(1)}}><option value="all">All</option><option value="PUBLISHED">Published</option><option value="DRAFT">Draft</option></select></div></div>{q.isLoading?<Skeleton count={4}/>:q.isError?<ErrorState onRetry={q.refetch}/>:<><div className="table-wrap"><table><thead><tr><th>Title</th><th>Status</th><th>Published</th><th>Views</th><th>Actions</th></tr></thead><tbody>{q.data?.results?.map(p=><tr key={p.slug}><td><strong>{p.title}</strong></td><td><span className="badge">{p.status}</span></td><td>{formatDate(p.published_at)}</td><td>{p.views_count}</td><td><div className="row"><Link className="pill" to={`/dashboard/posts/${p.slug}/edit`}>Edit</Link><button className="pill" onClick={()=>toggle.mutate(p)}>{p.status==='PUBLISHED'?'Unpublish':'Publish'}</button><button className="pill" onClick={()=>setDeleting(p)}>Delete</button></div></td></tr>)}</tbody></table></div><Pagination page={page} count={q.data?.count} pageSize={6} onPage={setPage}/></>}<ConfirmModal open={Boolean(deleting)} title={`Delete “${deleting?.title||''}”?`} onCancel={()=>setDeleting(null)} onConfirm={()=>del.mutate(deleting.slug)} pending={del.isPending}/></div>
}
