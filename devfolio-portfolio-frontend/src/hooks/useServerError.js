export default function useServerError(error) {
  const data = error?.response?.data
  if (!data) return error?.message || 'Something went wrong.'
  if (typeof data === 'string') return data
  if (data.detail) return data.detail
  return Object.values(data).flat().join(' ')
}
