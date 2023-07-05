/**
 * @example
 *
 *
 *
 * @param arr the array to separated
 * @param cb function that returns value in which element are separated based on how similarity
 * @returns arr[]
 */

export default function segregate<T, D = any>(arr: T[], cb: (element: T) => D) {
  if (arr.length === 0) return []

  let current = cb(arr[0])
  return arr.reduce<T[][]>(
    (acc, log) => {
      const newLog = cb(log)
      if (current === newLog) acc[acc.length - 1].push(log)
      else {
        current = newLog
        acc.push([log])
      }
      return acc
    },
    [[]],
  )
}
