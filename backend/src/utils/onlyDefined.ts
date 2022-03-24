export default function (obj: { [key: string]: any }) {
  return Object.keys(obj).reduce(function (acc: any, key: string) {
    if (obj[key]) {
      acc[key] = obj[key]
    }
    return acc
  }, {})
}
