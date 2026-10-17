import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { contactApi, profileApi } from '../api/endpoints'
import { useQuery } from '@tanstack/react-query'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Button from '../components/ui/Button'
import { setServerFieldErrors } from '../utils/forms'

export default function Contact(){
  useDocumentTitle('Contact');const profile=useQuery({queryKey:['profile'],queryFn:profileApi.get,retry:false});const [form,setForm]=useState({name:'',email:'',subject:'',message:''});const [errors,setErrors]=useState({});const [sent,setSent]=useState(false)
  const mutation=useMutation({mutationFn:()=>contactApi.create(form),onSuccess:()=>{setSent(true);setErrors({});toast.success('Message sent.')},onError:(e)=>{if(e.response?.status===429)toast.error('Too many attempts, please try later.');else if(!setServerFieldErrors(e,setErrors))toast.error('Could not send message.')}})
  const submit=e=>{e.preventDefault();mutation.mutate()}
  return <div className="container"><header className="page-header"><span className="eyebrow">Contact</span><h1>Start a conversation</h1><p className="muted">{profile.data?.email||''}{profile.data?.location?` · ${profile.data.location}`:''}</p></header><section className="section-sm grid-2"><div><h2>Tell me what you are working on.</h2><p className="muted">Use the form. The API applies validation and rate limiting.</p></div><div className="card">{sent?<div className="empty"><h3>Message received</h3><p className="muted">Thanks. Your message has been saved successfully.</p><Button onClick={()=>{setSent(false);setForm({name:'',email:'',subject:'',message:''})}}>Send another</Button></div>:<form className="stack" onSubmit={submit}>{[['name','Name','text'],['email','Email','email'],['subject','Subject','text']].map(([key,label,type])=><div className="field" key={key}><label>{label}</label><input className="input" type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} required/>{errors[key]&&<span className="field-error">{errors[key]}</span>}</div>)}<div className="field"><label>Message</label><textarea className="textarea" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} required minLength={10}/>{errors.message&&<span className="field-error">{errors.message}</span>}</div><Button disabled={mutation.isPending}>{mutation.isPending?'Sending…':'Send message'}</Button></form>}</div></section></div>
}
