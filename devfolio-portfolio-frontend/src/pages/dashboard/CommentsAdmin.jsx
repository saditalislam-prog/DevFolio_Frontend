import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { commentsApi } from '../../api/endpoints'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Pagination from '../../components/ui/Pagination'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { formatDate } from '../../utils/formatDate'

export default function CommentsAdmin(){
  useDocumentTitle('Comment moderation');const [pendingOnly,setPendingOnly]=useState(true);const [page,setPage]=useState(1);const [deleting,setDeleting]=useState(null);const qc=useQueryClient();const q=useQuery({queryKey:['admin-comments',{pendingOnly,page}],queryFn:()=>commentsApi.list({is_approved:pendingOnly?false:undefined,page,ordering:'is_approved,-created_at'})});const patch=useMutation({mutationFn:c=>commentsApi.update(c.id,{is_approved:!c.is_approved}),onSuccess:()=>{toast.success('Comment updated.');qc.invalidateQueries({queryKey:['admin-comments']})}});const del=useMutation({mutationFn:id=>commentsApi.remove(id),onSuccess:()=>{toast.success('Comment deleted.');setDeleting(null);qc.invalidateQueries({queryKey:['admin-comments']})}})
  return <div><div className="dash-head"><div><span className="eyebrow">Moderation</span><h1 style={{fontSize:48}}>Comments</h1></div><label><input type="checkbox" checked={pendingOnly} onChange={e=>{setPendingOnly(e.target.checked);setPage(1)}}/> Pending first / only</label></div><div className="table-wrap"><table><thead><tr><th>Comment</th><th>Post</th><th>Status</th><th>Actions</th></tr></thead><tbody>{q.data?.results?.map(c=><tr key={c.id}><td><strong>{c.name}</strong><p>{c.content}</p><small className="muted">{c.email} · {formatDate(c.created_at)}</small></td><td>{c.post_title}</td><td>{c.is_approved?'Approved':'Pending'}</td><td><div className="row"><button className="pill" onClick={()=>patch.mutate(c)}>{c.is_approved?'Unapprove':'Approve'}</button><button className="pill" onClick={()=>setDeleting(c)}>Delete</button></div></td></tr>)}</tbody></table></div><Pagination page={page} count={q.data?.count} pageSize={10} onPage={setPage}/><ConfirmModal open={Boolean(deleting)} onCancel={()=>setDeleting(null)} onConfirm={()=>del.mutate(deleting.id)} pending={del.isPending}/></div>
}
