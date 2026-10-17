import { useQuery } from '@tanstack/react-query'
import { profileApi, skillsApi, experienceApi, educationApi } from '../api/endpoints'
import Skeleton from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { formatDate } from '../utils/formatDate'

export default function About(){
  useDocumentTitle('About')
  const profile=useQuery({queryKey:['profile'],queryFn:profileApi.get})
  const skills=useQuery({queryKey:['skills','about'],queryFn:()=>skillsApi.list({ordering:'display_order'})})
  const experience=useQuery({queryKey:['experience'],queryFn:()=>experienceApi.list()})
  const education=useQuery({queryKey:['education'],queryFn:()=>educationApi.list()})
  if(profile.isLoading) return <div className="container section"><Skeleton count={2}/></div>
  if(profile.isError) return <div className="container section"><ErrorState message="Profile is not available." onRetry={profile.refetch}/></div>
  const skillRows=skills.data?.results||skills.data||[]
  const expRows=experience.data?.results||experience.data||[]
  const eduRows=education.data?.results||education.data||[]
  return <div className="container">
    <header className="page-header grid-2"><div><span className="eyebrow">About</span><h1>{profile.data.full_name}</h1><p className="muted">{profile.data.headline}</p></div><div>{profile.data.avatar&&<img src={profile.data.avatar} alt={`${profile.data.full_name} portrait`} style={{aspectRatio:'16/9',objectFit:'cover',borderRadius:24}}/>}</div></header>
    <section className="section-sm grid-2"><h2>My story</h2><div><p style={{whiteSpace:'pre-line'}}>{profile.data.bio}</p>{profile.data.resume&&<a className="button" href={profile.data.resume} target="_blank" rel="noreferrer">Download Resume</a>}</div></section>
    <section className="section-sm stack-lg"><h2>Experience</h2><div className="timeline">{expRows.map(x=><div className="timeline-item" key={x.id}><h3>{x.role} · {x.company}</h3><p className="muted">{formatDate(x.start_date)} – {x.is_current?'Present':formatDate(x.end_date)} · {x.location}</p><p style={{whiteSpace:'pre-line'}}>{x.description}</p></div>)}</div></section>
    <section className="section-sm stack-lg"><h2>Education</h2><div className="grid-2">{eduRows.map(x=><div className="card" key={x.id}><h3>{x.degree}</h3><p><strong>{x.institution}</strong></p><p className="muted">{x.field_of_study} · {x.start_year}–{x.end_year||'Present'}</p><p>{x.description}</p></div>)}</div></section>
    <section className="section-sm stack-lg"><h2>Skills</h2><div className="grid-3">{skillRows.map(s=><div className="card" key={s.id}><div className="row" style={{justifyContent:'space-between'}}><strong>{s.name}</strong><span>{s.proficiency}%</span></div><p className="muted">{s.category.replaceAll('_',' ')}</p><div className="progress"><span style={{width:`${s.proficiency}%`}}/></div></div>)}</div></section>
  </div>
}
