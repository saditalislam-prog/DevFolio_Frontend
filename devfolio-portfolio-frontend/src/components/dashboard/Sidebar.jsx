import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../ui/Button'
import './dashboard.css'

const links = [
  ['/dashboard','Overview'],['/dashboard/posts','Posts'],['/dashboard/projects','Projects'],['/dashboard/skills','Skills'],['/dashboard/experience','Experience'],['/dashboard/taxonomy','Taxonomy'],['/dashboard/comments','Comments'],['/dashboard/messages','Messages'],['/dashboard/profile','Profile'],
]
export default function Sidebar(){ const {logout}=useAuth(); return <aside className="dash-sidebar"><div><strong>Owner Dashboard</strong><nav>{links.map(([to,label])=><NavLink end={to==='/dashboard'} key={to} to={to}>{label}</NavLink>)}</nav></div><Button variant="secondary" onClick={logout}>Log out</Button></aside> }
