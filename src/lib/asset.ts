export function publicUrl(path: string) {
  const base = (import.meta as any).env?.BASE_URL || '/'
  const cleanBase = base.endsWith('/') ? base.slice(0, -1) : base
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${cleanBase}/${cleanPath}`
}
