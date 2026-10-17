import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useDocumentTitle from '../hooks/useDocumentTitle'
import Button from '../components/ui/Button'

export default function Login(){
  useDocumentTitle('Owner login');const {login,isOwner,loading}=useAuth();const nav=useNavigate();const location=useLocation();const [form,setForm]=useState({username:'',password:''});const [error,setError]=useState('');const [pending,setPending]=useState(false)
  if(loading)return <div className="container section"><div className="skeleton"/></div>
  if(isOwner)return <Navigate to="/dashboard" replace/>
  const submit=async e=>{e.preventDefault();setPending(true);setError('');try{await login(form);nav(location.state?.from?.pathname||'/dashboard',{replace:true})}catch{setError('Invalid credentials.')}finally{setPending(false)}}
  return <main className="container section" style={{maxWidth:560}}><div className="card"><span className="eyebrow">Private</span><h1 style={{fontSize:48}}>Owner login</h1><p className="muted">This page is intentionally not linked from the public navigation.</p><form className="stack" onSubmit={submit}><div className="field"><label>Username</label><input className="input" autoComplete="username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/></div><div className="field"><label>Password</label><input className="input" type="password" autoComplete="current-password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></div>{error&&<span className="field-error">{error}</span>}<Button disabled={pending}>{pending?'Signing in…':'Sign in'}</Button></form></div></main>
}
