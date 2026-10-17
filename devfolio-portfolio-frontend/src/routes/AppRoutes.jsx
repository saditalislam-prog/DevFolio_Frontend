import { Route, Routes } from 'react-router-dom'
import PublicLayout from '../components/layout/PublicLayout'
import DashboardLayout from '../components/dashboard/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import Home from '../pages/Home'
import About from '../pages/About'
import Projects from '../pages/Projects'
import ProjectDetail from '../pages/ProjectDetail'
import Blog from '../pages/Blog'
import BlogDetail from '../pages/BlogDetail'
import Contact from '../pages/Contact'
import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import DashboardOverview from '../pages/dashboard/DashboardOverview'
import PostsAdmin from '../pages/dashboard/PostsAdmin'
import PostEditor from '../pages/dashboard/PostEditor'
import ProjectsAdmin from '../pages/dashboard/ProjectsAdmin'
import ProjectEditor from '../pages/dashboard/ProjectEditor'
import SkillsAdmin from '../pages/dashboard/SkillsAdmin'
import ExperienceAdmin from '../pages/dashboard/ExperienceAdmin'
import TaxonomyAdmin from '../pages/dashboard/TaxonomyAdmin'
import CommentsAdmin from '../pages/dashboard/CommentsAdmin'
import MessagesAdmin from '../pages/dashboard/MessagesAdmin'
import ProfileAdmin from '../pages/dashboard/ProfileAdmin'

export default function AppRoutes(){
  return <Routes>
    <Route element={<PublicLayout/>}>
      <Route path="/" element={<Home/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="/blog" element={<Blog/>}/><Route path="/blog/:slug" element={<BlogDetail/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<NotFound/>}/>
    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout/></ProtectedRoute>}>
      <Route index element={<DashboardOverview/>}/><Route path="posts" element={<PostsAdmin/>}/><Route path="posts/new" element={<PostEditor/>}/><Route path="posts/:slug/edit" element={<PostEditor/>}/><Route path="projects" element={<ProjectsAdmin/>}/><Route path="projects/new" element={<ProjectEditor/>}/><Route path="projects/:slug/edit" element={<ProjectEditor/>}/><Route path="skills" element={<SkillsAdmin/>}/><Route path="experience" element={<ExperienceAdmin/>}/><Route path="taxonomy" element={<TaxonomyAdmin/>}/><Route path="comments" element={<CommentsAdmin/>}/><Route path="messages" element={<MessagesAdmin/>}/><Route path="profile" element={<ProfileAdmin/>}/>
    </Route>
  </Routes>
}
