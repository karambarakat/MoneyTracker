export default function getByPropPath(obj: unknown, path: string[]) {
  if (path.length <= 0) return obj

  if (typeof obj === 'object' && obj !== null) {
    const [key, ...rest] = path
    return getByPropPath(obj[key], rest)
  }

  throw new Error(`trying to access a non-object with path: ${path}`)
}
