import { MutableRefObject, useEffect, useMemo, useRef } from 'react'

type __ResizeObserverEntry<E extends Element> = Omit<
  ResizeObserverEntry,
  'target'
> & {
  target: E
}

export default function useObserver<E extends Element>(
  ref: MutableRefObject<E | null>,
  cb: (entry: __ResizeObserverEntry<E>) => void,
  deps: any[] = [],
) {
  const frameID = useRef(0)

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver(entries => {
            const entry = entries[0]

            if (entries.length > 1)
              throw new Error('against my expectation: entries.length >= 1')

            if (entry) {
              cancelAnimationFrame(frameID.current)

              frameID.current = requestAnimationFrame(() => {
                if (ref.current) {
                  cb(entry as __ResizeObserverEntry<E>)
                }
              })
            }
          })
        : null,
    deps,
  )

  useEffect(() => {
    if (!observer) return void 0

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()

      if (frameID.current) {
        cancelAnimationFrame(frameID.current)
      }
    }
  }, [ref.current])
}
