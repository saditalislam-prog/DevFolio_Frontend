import Button from './Button'
export default function ConfirmModal({ open, title = 'Confirm deletion', text = 'This action cannot be undone.', onCancel, onConfirm, pending }) {
  if (!open) return null
  return <div className="modal-backdrop" role="presentation" onMouseDown={onCancel}>
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-title" onMouseDown={(e) => e.stopPropagation()}>
      <h3 id="confirm-title">{title}</h3><p className="muted">{text}</p>
      <div className="row actions"><Button variant="secondary" onClick={onCancel} disabled={pending}>Cancel</Button><Button variant="danger" onClick={onConfirm} disabled={pending}>{pending ? 'Deleting…' : 'Delete'}</Button></div>
    </div>
  </div>
}
