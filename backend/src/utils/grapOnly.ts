import { merge } from 'lodash'
import isPlain from './isPlain'

type filter = ({
  [key: string]: true | filter
}) | true

function* filter(obj: any, against: filter): any {
  if (typeof against === 'boolean') return yield obj

  if (!isPlain(obj)) return

  for (const key in obj) {
    if (!Object.keys(against).includes(key)) {
      continue
    }

    // yield* { [key]: (from filter(obj[key], against[key])) }
    for (const deep of filter(obj[key], against[key])) {
      yield { [key]: deep }
    }
  }

}
export default function grapOnly(obj: any, against: filter) {
  return Array.from(filter(obj, against))
    .reduce((acc, e) => merge(acc, e), {})
}