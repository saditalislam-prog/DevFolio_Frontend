import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { profileApi, skillsApi, experienceApi, projectsApi, postsApi } from '../api/endpoints'
import Hero from '../components/home/Hero'
import PostCard from '../components/blog/PostCard'
import Skeleton from '../components/ui/Skeleton'
import ErrorState from '../components/ui/ErrorState'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { formatDate } from '../utils/formatDate'

export default function Home(){
  useDocumentTitle('Home')
  const profile=useQuery({queryKey:['profile'],queryFn:profileApi.get,retry:false})
  const skills=useQuery({queryKey:['skills','home'],queryFn:()=>skillsApi.list({ordering:'display_order'})})
  const experience=useQuery({queryKey:['experience','home'],queryFn:()=>experienceApi.list()})
  const projects=useQuery({queryKey:['projects','featured'],queryFn:()=>projectsApi.list({is_featured:true,ordering:'display_order'})})
  const posts=useQuery({queryKey:['posts','latest'],queryFn:()=>postsApi.list({ordering:'-published_at'})})
  if(profile.isLoading) return <div className="container section"><Skeleton count={2}/></div>
  if(profile.isError) return <div className="container section"><ErrorState message="Create your real Profile row in Django admin before opening the portfolio." onRetry={profile.refetch}/></div>
  const skillRows=skills.data?.results||skills.data||[]
  const expRows=experience.data?.results||experience.data||[]
  const projectRows=(projects.data?.results||projects.data||[]).slice(0,3)
  const postRows=(posts.data?.results||posts.data||[]).slice(0,3)
  const grouped=skillRows.reduce((a,s)=>{(a[s.category] ||= []).push(s);return a},{})
  return <>
    <Hero profile={profile.data}/>
    <section className="section-sm"><div className="container grid-2"><div><span className="eyebrow">About</span><h2>A little more about me</h2></div><div><p>{profile.data.bio}</p><Link to="/about">More about me →</Link></div></div></section>
    <section className="section"><div className="container stack-lg"><div><span className="eyebrow">Skills</span><h2>What I work with</h2></div>{skills.isLoading?<Skeleton count={3}/>:<div className="grid-3">{Object.entries(grouped).map(([category,items])=><div className="card skill-group" key={category}><h3>{category.replaceAll('_',' ')}</h3>{items.map(s=><div className="skill-row" key={s.id}><strong>{s.name}</strong><div className="progress"><span style={{width:`${s.proficiency}%`}}/></div><span>{s.proficiency}%</span></div>)}</div>)}</div>}</div></section>
    <section className="section"><div className="container stack-lg"><div><span className="eyebrow">Experience</span><h2>Where I have learned and worked</h2></div><div className="timeline">{expRows.slice(0,4).map(item=><div className="timeline-item" key={item.id}><h3>{item.role}</h3><p><strong>{item.company}</strong> · {formatDate(item.start_date,{year:'numeric',month:'short'})} – {item.is_current?'Present':formatDate(item.end_date,{year:'numeric',month:'short'})}</p><p className="muted">{item.description}</p></div>)}</div></div></section>
    <section className="section"><div className="container stack-lg"><div className="row" style={{justifyContent:'space-between'}}><div><span className="eyebrow">Projects</span><h2>Featured work</h2></div><Link to="/projects">See all projects →</Link></div>{projects.isLoading?<Skeleton/>:<div className="grid-3">{projectRows.map(p=><article className="card stack" key={p.slug}>{p.cover_image&&<img className="card-image" src={p.cover_image} alt={`${p.title} screenshot`} loading="lazy"/>}<span className="badge">{p.category}</span><h3><Link to={`/projects/${p.slug}`}>{p.title}</Link></h3><p className="muted">{p.summary}</p></article>)}</div>}</div></section>
    <section className="section"><div className="container stack-lg"><div className="row" style={{justifyContent:'space-between'}}><div><span className="eyebrow">Writing</span><h2>Latest blog posts</h2></div><Link to="/blog">Read the blog →</Link></div>{posts.isLoading?<Skeleton/>:<div className="grid-3">{postRows.map(p=><PostCard key={p.slug} post={p}/>)}</div>}</div></section>
    <section className="section-sm"><div className="container card" style={{textAlign:'center',padding:48}}><h2>Have a project or opportunity in mind?</h2><p className="muted">Send a message and I will get back to you.</p><Link className="button" to="/contact">Contact me</Link></div></section>
  </>
}
