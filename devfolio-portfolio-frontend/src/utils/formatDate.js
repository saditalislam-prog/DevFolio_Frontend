export function formatDate(value, options = { year: 'numeric', month: 'short', day: 'numeric' }) {
  if (!value) return 'Present'
  return new Intl.DateTimeFormat('en', options).format(new Date(value))
}
