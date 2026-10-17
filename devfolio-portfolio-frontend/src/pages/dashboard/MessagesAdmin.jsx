import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { contactApi } from '../../api/endpoints'
import ConfirmModal from '../../components/ui/ConfirmModal'
import Pagination from '../../components/ui/Pagination'
import useDocumentTitle from '../../hooks/useDocumentTitle'
import { formatDate } from '../../utils/formatDate'

export default function MessagesAdmin(){
  useDocumentTitle('Contact inbox');const [unreadOnly,setUnreadOnly]=useState(false);const [page,setPage]=useState(1);const [deleting,setDeleting]=useState(null);const qc=useQueryClient();const q=useQuery({queryKey:['messages',{unreadOnly,page}],queryFn:()=>contactApi.list({is_read:unreadOnly?false:undefined,page})});const read=useMutation({mutationFn:m=>contactApi.update(m.id,{is_read:!m.is_read}),onSuccess:()=>qc.invalidateQueries({queryKey:['messages']})});const del=useMutation({mutationFn:id=>contactApi.remove(id),onSuccess:()=>{toast.success('Message deleted.');setDeleting(null);qc.invalidateQueries({queryKey:['messages']})}})
  return <div><div className="dash-head"><div><span className="eyebrow">Inbox</span><h1 style={{fontSize:48}}>Messages</h1></div><label><input type="checkbox" checked={unreadOnly} onChange={e=>{setUnreadOnly(e.target.checked);setPage(1)}}/> Unread only</label></div><div className="stack">{q.data?.results?.map(m=><div className="card" key={m.id} style={{borderLeft:`4px solid ${m.is_read?'var(--border)':'var(--accent)'}`}}><div className="row" style={{justifyContent:'space-between'}}><div><h3>{m.subject}</h3><p className="muted">{m.name} · {m.email} · {formatDate(m.created_at)}</p></div><span className="badge">{m.is_read?'Read':'Unread'}</span></div><p>{m.message}</p><div className="row"><button className="pill" onClick={()=>read.mutate(m)}>{m.is_read?'Mark unread':'Mark read'}</button><button className="pill" onClick={()=>setDeleting(m)}>Delete</button></div></div>)}</div><Pagination page={page} count={q.data?.count} pageSize={10} onPage={setPage}/><ConfirmModal open={Boolean(deleting)} onCancel={()=>setDeleting(null)} onConfirm={()=>del.mutate(deleting.id)} pending={del.isPending}/></div>
}
