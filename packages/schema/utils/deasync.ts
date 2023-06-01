import _deasync from 'deasync'

export default function deasyncFn<T extends (...args: any[]) => Promise<any>>(
  fn: T
): T {
  // @ts-ignore
  return ((...args: any[]) => {
    let dummy
    let bool = false
    fn(...args).then((res) => {
      dummy = res
      bool = true
    })
    _deasync.loopWhile(() => !bool)
    return dummy as T
  }) as T
}
