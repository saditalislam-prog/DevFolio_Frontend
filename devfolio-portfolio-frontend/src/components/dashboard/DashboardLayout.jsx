import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './dashboard.css'
export default function DashboardLayout(){ return <div className="dashboard-shell"><Sidebar/><main className="dashboard-content"><Outlet/></main></div> }
