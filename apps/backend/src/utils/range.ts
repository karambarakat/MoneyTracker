export default function* range(to?: number, steps?: number, start?: number): Generator<number, number, number> {
  for (let index = (start || 0); index < (to || 10); index += (steps || 1)) {
    const jump = yield index
  }
  return to || 10
}