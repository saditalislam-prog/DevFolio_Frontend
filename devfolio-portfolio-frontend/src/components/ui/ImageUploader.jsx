import { useEffect, useState } from 'react'
export default function ImageUploader({ label = 'Image', value, onChange, error }) {
  const [preview, setPreview] = useState(typeof value === 'string' ? value : '')
  useEffect(() => {
    if (!(value instanceof File)) { setPreview(typeof value === 'string' ? value : ''); return }
    const url = URL.createObjectURL(value)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [value])
  return <div className="field"><label>{label}</label><input className="input" type="file" accept="image/png,image/jpeg,image/webp" onChange={(e) => onChange(e.target.files?.[0] || null)} />{preview && <img src={preview} alt={`${label} preview`} style={{maxWidth: 320, aspectRatio:'16/9', objectFit:'cover', borderRadius:8}} />}{error && <span className="field-error">{error}</span>}</div>
}
