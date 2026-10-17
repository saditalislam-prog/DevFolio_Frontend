# DevFolio Frontend

React 18 + Vite frontend for the DevFolio single-owner portfolio + blog assignment.

## Design direction

**A — Minimal Editorial.** Calm, recruiter-friendly layout with generous whitespace, serif headings, sans-serif UI/body text, thin borders, restrained shadows, and a single teal accent. Dark mode uses purpose-built dark surfaces rather than simple black/white inversion.

### Design tokens

| Token group | Values |
|---|---|
| Fonts | Fraunces (headings), DM Sans (body/UI) |
| Type | 12 / 14 / 16 / 20 / 24 / 32 / 48 px |
| Spacing | 8 / 16 / 24 / 32 / 48 / 64 / 96 px |
| Radius | 8 / 16 / 24 px |
| Accent | Teal `#0f766e` in light mode; `#60c7ba` in dark mode |
| Light surfaces | `#fbfaf7`, `#ffffff`, `#f3f4f1` |
| Dark surfaces | `#111614`, `#18201d`, `#202a26` |
| Shadows | one small and one medium shadow scale |

All tokens live in `src/styles/tokens.css`.

## Tech stack

React 18, Vite, react-router-dom v6, Axios, TanStack React Query, Context API, plain CSS, lucide-react, react-markdown, react-hot-toast.

## Setup

```bash
git clone <your-frontend-repo-url>
cd <your-name>-portfolio-frontend
npm install
cp .env.example .env
npm run dev
```

`.env`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

## Routes

### Public

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects + search/filter/sort/pagination |
| `/projects/:slug` | Project detail |
| `/blog` | Blog + debounced search/category/tag/sort/pagination in URL |
| `/blog/:slug` | Article, likes, share, comments, related posts |
| `/contact` | Contact form |
| `/login` | Owner login, deliberately not linked publicly |
| `*` | Styled 404 |

### Protected owner routes

| Route | Page |
|---|---|
| `/dashboard` | Stats |
| `/dashboard/posts` | Post management |
| `/dashboard/posts/new` | New post |
| `/dashboard/posts/:slug/edit` | Edit post |
| `/dashboard/projects` | Project management |
| `/dashboard/projects/new` | New project |
| `/dashboard/projects/:slug/edit` | Edit project |
| `/dashboard/skills` | Skill CRUD |
| `/dashboard/experience` | Experience + education CRUD |
| `/dashboard/taxonomy` | Category + tag CRUD |
| `/dashboard/comments` | Moderation queue |
| `/dashboard/messages` | Contact inbox |
| `/dashboard/profile` | Profile + password |

## Folder structure

```text
src/
  api/              axios.js, endpoints.js
  components/
    layout/         Navbar, Footer, PublicLayout
    ui/             Button, ConfirmModal, ImageUploader, Pagination, Skeleton...
    home/           Hero
    blog/           PostCard, LikeButton, CommentForm, CommentList
    dashboard/      Sidebar, DashboardLayout
  context/          AuthContext.jsx, ThemeContext.jsx
  hooks/            useDebounce.js, useVisitorId.js, useDocumentTitle.js
  pages/            public pages + dashboard pages
  routes/           ProtectedRoute.jsx, AppRoutes.jsx
  utils/            formatDate.js, forms.js
  styles/           tokens.css, global.css
```

## Assignment-specific implementation notes

- Content is never hard-coded into React; portfolio/blog data comes from the API.
- Axios is configured once. It attaches the JWT and `X-Visitor-Id`, and performs a single refresh-token retry on 401.
- React Query handles all reads/writes.
- Public navigation never shows Login, Dashboard, Edit, or Delete controls.
- Blog filters are stored in the URL so refresh/share preserves state.
- Like uses optimistic UI with rollback on error.
- Comment submission explicitly says it is awaiting approval.
- Dashboard image forms preview the image before submit.
- Deletes use a custom modal, not `window.confirm`.
- Light/dark theme is persisted and respects system preference on first visit.
- Four responsive ranges are covered by the CSS (desktop ≥1280 naturally, plus 1024, 768, and 480 breakpoints).

## Screenshots required before submission

After entering your real content, run the site and capture at least: home light, home dark, blog list, blog detail, and dashboard. Put those images in a `screenshots/` folder and embed them here.

## What I would improve with more time

I would add automated component tests, richer Markdown editing, drag-and-drop display ordering, finer-grained skeletons, and production observability.

## Backend

Create the required second public repository from the sibling `devfolio-portfolio-backend` folder and replace this section with its GitHub URL before submission.
