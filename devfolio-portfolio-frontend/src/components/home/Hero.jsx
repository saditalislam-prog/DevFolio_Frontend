import { Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import './home.css'
export default function Hero({ profile }){
  if(!profile) return null
  return <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">Portfolio + Blog</span><h1>{profile.full_name}</h1><h2 className="hero-headline">{profile.headline}</h2><p className="hero-copy">{profile.bio?.split('\n').filter(Boolean).slice(0,2).join(' ')}</p><div className="row actions"><Link className="button" to="/projects">View Projects</Link>{profile.resume && <a className="button secondary" href={profile.resume} target="_blank" rel="noreferrer">Download Resume</a>}</div><div className="row hero-social">{profile.github_url&&<a href={profile.github_url} target="_blank" rel="noreferrer" aria-label="GitHub"><Github/></a>}{profile.linkedin_url&&<a href={profile.linkedin_url} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin/></a>}</div></div><div className="hero-photo-wrap">{profile.avatar&&<img className="hero-photo" src={profile.avatar} alt={`${profile.full_name} portrait`} />}</div></div></section>
}
