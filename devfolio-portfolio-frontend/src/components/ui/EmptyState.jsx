export default function EmptyState({ title = 'Nothing found', text = 'Try changing your filters.' }) {
  return <div className="empty"><h3>{title}</h3><p className="muted">{text}</p></div>
}
