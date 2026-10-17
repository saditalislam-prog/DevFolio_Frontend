import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { projectsApi } from '../../api/endpoints'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Pagination from '../../components/ui/Pagination'
import Skeleton from '../../components/ui/Skeleton'
import useDocumentTitle from '../../hooks/useDocumentTitle'

export default function ProjectsAdmin(){
  useDocumentTitle('Manage projects');const [page,setPage]=useState(1);const [deleting,setDeleting]=useState(null);const qc=useQueryClient();const q=useQuery({queryKey:['admin-projects',page],queryFn:()=>projectsApi.list({page,ordering:'display_order'})});const del=useMutation({mutationFn:slug=>projectsApi.remove(slug),onSuccess:()=>{toast.success('Project deleted.');setDeleting(null);qc.invalidateQueries({queryKey:['admin-projects']})},onError:()=>toast.error('Could not delete project.')})
  return <div><div className="dash-head"><div><span className="eyebrow">Portfolio</span><h1 style={{fontSize:48}}>Projects</h1></div><Link className="button" to="/dashboard/projects/new">New project</Link></div>{q.isLoading?<Skeleton count={4}/>:<><div className="table-wrap"><table><thead><tr><th>Project</th><th>Category</th><th>Featured</th><th>Actions</th></tr></thead><tbody>{q.data?.results?.map(p=><tr key={p.slug}><td><strong>{p.title}</strong><p className="muted">{p.summary}</p></td><td>{p.category}</td><td>{p.is_featured?'Yes':'No'}</td><td><div className="row"><Link className="pill" to={`/dashboard/projects/${p.slug}/edit`}>Edit</Link><button className="pill" onClick={()=>setDeleting(p)}>Delete</button></div></td></tr>)}</tbody></table></div><Pagination page={page} count={q.data?.count} pageSize={9} onPage={setPage}/></>}<ConfirmModal open={Boolean(deleting)} title={`Delete “${deleting?.title||''}”?`} onCancel={()=>setDeleting(null)} onConfirm={()=>del.mutate(deleting.slug)} pending={del.isPending}/></div>
}
