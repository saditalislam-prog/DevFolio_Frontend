export default function Button({ variant = '', className = '', children, ...props }) {
  return <button className={`button ${variant} ${className}`.trim()} {...props}>{children}</button>
}
