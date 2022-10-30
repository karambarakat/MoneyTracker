export default function (key: string, value: null) {
  if (typeof value === 'undefined') {
    return null
  }
  return value
}
