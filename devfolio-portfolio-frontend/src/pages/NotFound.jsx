import { Link } from 'react-router-dom'
import useDocumentTitle from '../hooks/useDocumentTitle'
export default function NotFound(){useDocumentTitle('404');return <div className="container section"><div className="empty"><span className="eyebrow">404</span><h1>Page not found</h1><p className="muted">The page you requested does not exist.</p><Link className="button" to="/">Back home</Link></div></div>}
