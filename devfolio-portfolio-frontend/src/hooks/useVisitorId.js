const KEY = 'devfolio_visitor_id'

export function getVisitorId() {
  let id = localStorage.getItem(KEY)
  if (!id) {
    id = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`
    localStorage.setItem(KEY, id)
  }
  return id
}

export default function useVisitorId() {
  return getVisitorId()
}
