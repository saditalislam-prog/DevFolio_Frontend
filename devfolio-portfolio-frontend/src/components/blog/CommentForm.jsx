import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { postsApi } from '../../api/endpoints'
import { setServerFieldErrors } from '../../utils/forms'
import Button from '../ui/Button'

export default function CommentForm({ slug, parent = null, onDone }){
  const [form,setForm]=useState({name:'',email:'',website:'',content:'',parent:parent?.id||null})
  const [errors,setErrors]=useState({})
  const qc=useQueryClient()
  const mutation=useMutation({mutationFn:()=>postsApi.addComment(slug,form),onSuccess:(d)=>{toast.success(d.message||'Your comment is awaiting approval.');setForm({name:'',email:'',website:'',content:'',parent:parent?.id||null});setErrors({});qc.invalidateQueries({queryKey:['comments',slug]});onDone?.()},onError:(e)=>{if(!setServerFieldErrors(e,setErrors))toast.error('Could not submit comment.')}})
  const submit=(e)=>{e.preventDefault();const next={};if(form.name.trim().length<2)next.name='Name must be at least 2 characters.';if(!/\S+@\S+\.\S+/.test(form.email))next.email='Enter a valid email.';if(form.content.trim().length<5)next.content='Comment must be at least 5 characters.';setErrors(next);if(!Object.keys(next).length)mutation.mutate()}
  return <form className="stack" onSubmit={submit}><div className="form-grid"><div className="field"><label>Name</label><input className="input" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>{errors.name&&<span className="field-error">{errors.name}</span>}</div><div className="field"><label>Email</label><input className="input" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>{errors.email&&<span className="field-error">{errors.email}</span>}</div><div className="field full"><label>Website (optional)</label><input className="input" type="url" value={form.website} onChange={e=>setForm({...form,website:e.target.value})}/></div><div className="field full"><label>Comment</label><textarea className="textarea" value={form.content} onChange={e=>setForm({...form,content:e.target.value})}/>{errors.content&&<span className="field-error">{errors.content}</span>}</div></div><Button disabled={mutation.isPending}>{mutation.isPending?'Submitting…':'Post comment'}</Button></form>
}
