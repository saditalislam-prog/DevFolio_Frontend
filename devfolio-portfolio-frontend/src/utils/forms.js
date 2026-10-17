export function setServerFieldErrors(error, setErrors) {
  const data = error?.response?.data
  if (!data || typeof data !== 'object') return false
  const mapped = {}
  for (const [key, value] of Object.entries(data)) mapped[key] = Array.isArray(value) ? value.join(' ') : String(value)
  setErrors(mapped)
  return true
}

export function toFormData(values, fileKeys = []) {
  const data = new FormData()
  Object.entries(values).forEach(([key, value]) => {
    if (value === undefined || value === null) return
    if (fileKeys.includes(key) && !(value instanceof File)) return
    if (Array.isArray(value)) value.forEach((item) => data.append(key, item))
    else data.append(key, value)
  })
  return data
}
