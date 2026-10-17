import { Menu, Moon, Sun, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { profileApi } from '../../api/endpoints'
import { useTheme } from '../../context/ThemeContext'
import './layout.css'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { data: profile } = useQuery({ queryKey: ['profile'], queryFn: profileApi.get, retry: false })
  const links = [['/about','About'],['/projects','Projects'],['/blog','Blog'],['/contact','Contact']]
  return <header className="site-header"><div className="container nav-inner">
    <Link className="brand" to="/">{profile?.full_name || 'DevFolio'}</Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.map(([to,label]) => <NavLink key={to} to={to}>{label}</NavLink>)}</nav>
    <div className="nav-actions"><button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button><button className="icon-button menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X/> : <Menu/>}</button></div>
  </div>{open && <nav className="mobile-nav container" aria-label="Mobile navigation">{links.map(([to,label]) => <NavLink key={to} to={to} onClick={() => setOpen(false)}>{label}</NavLink>)}</nav>}</header>
}
