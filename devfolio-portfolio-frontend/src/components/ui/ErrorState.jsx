import Button from './Button'
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return <div className="error-box"><h3>Unable to load</h3><p className="muted">{message}</p>{onRetry && <Button onClick={onRetry}>Retry</Button>}</div>
}
