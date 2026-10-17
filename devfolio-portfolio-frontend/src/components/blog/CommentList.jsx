import { useState } from 'react'
import { formatDate } from '../../utils/formatDate'
import CommentForm from './CommentForm'
function Item({comment,slug}){const [reply,setReply]=useState(false);return <div className="card"><div className="row"><strong>{comment.name}</strong><small className="muted">{formatDate(comment.created_at)}</small></div><p>{comment.content}</p><button className="pill" onClick={()=>setReply(!reply)}>Reply</button>{reply&&<div style={{marginTop:16}}><CommentForm slug={slug} parent={comment} onDone={()=>setReply(false)}/></div>}{comment.replies?.length>0&&<div className="stack" style={{marginTop:16,marginLeft:24}}>{comment.replies.map(r=><div className="card" key={r.id}><strong>{r.name}</strong><p>{r.content}</p></div>)}</div>}</div>}
export default function CommentList({comments=[],slug}){return <div className="stack">{comments.map(c=><Item key={c.id} comment={c} slug={slug}/>)}</div>}
