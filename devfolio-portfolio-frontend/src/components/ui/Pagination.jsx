export default function Pagination({ page, count, pageSize, onPage }) {
  const pages = Math.ceil((count || 0) / pageSize)
  if (pages <= 1) return null
  return <div className="pagination" aria-label="Pagination">
    <button disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
    <button aria-current="page">{page} / {pages}</button>
    <button disabled={page >= pages} onClick={() => onPage(page + 1)}>Next</button>
  </div>
}
