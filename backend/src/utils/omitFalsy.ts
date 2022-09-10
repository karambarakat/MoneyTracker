export default function omitFalsy(obj: { [key: string]: any }): {
  [key: string]: any
} {
  return Object.keys(obj)
    .filter((key) => Boolean(obj[key]))
    .reduce<{ [key: string]: any }>((acc, key) => {
      acc[key] = obj[key]
      return acc
    }, {})
}
