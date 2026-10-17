import { Github, Linkedin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { profileApi } from '../../api/endpoints'
import './layout.css'

export default function Footer() {
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: profileApi.get, retry: false })
  return <footer className="site-footer"><div className="container footer-grid"><div><strong>{profile?.full_name || 'DevFolio'}</strong><p className="muted">{profile?.headline || 'Portfolio + technical blog'}</p></div><div className="footer-links"><Link to="/projects">Projects</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link></div><div className="row">{profile?.github_url && <a aria-label="GitHub" href={profile.github_url} target="_blank" rel="noreferrer"><Github/></a>}{profile?.linkedin_url && <a aria-label="LinkedIn" href={profile.linkedin_url} target="_blank" rel="noreferrer"><Linkedin/></a>}</div></div><div className="container copyright">© {new Date().getFullYear()} {profile?.full_name || 'DevFolio'}.</div></footer>
}
