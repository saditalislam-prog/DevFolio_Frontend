export default function Skeleton({ count = 3 }) {
  return <div className="grid-3">{Array.from({ length: count }, (_, i) => <div className="skeleton" key={i} />)}</div>
}
