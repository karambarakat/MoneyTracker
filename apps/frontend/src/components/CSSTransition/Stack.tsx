import CssVars from '@components/CssVars'
import { useEffect, useState, ReactElement } from 'react'
import { CSSTransition } from 'react-transition-group'
import s from './Stack.module.scss'

interface Props {
  children: ReactElement[]
}
function Stack({ children: chs }: Props) {
  const [children, setChildren] = useState(
    () => new Map(chs.map(child => [child.key, child]))
  )

  const [remove, setRemove] = useState(new Set<string | number | null>())

  useEffect(() => {
    const remove = new Set<string | number | null>(children.keys())

    setChildren(old => {
      chs.forEach(child => {
        if (!old.has(child.key)) {
          old.set(child.key, child)
        } else {
          remove.delete(child.key)
        }
      })

      return old
    })

    setRemove(remove)
  }, [chs])

  return (
    <div className={s.root}>
      {Array.from(children.values()).map(child => (
        <Inner
          keep={!remove.has(child.key)}
          onExited={() => {
            setChildren(old => {
              old.delete(child.key)
              return old
            })
            setRemove(old => {
              old.delete(child.key)
              return old
            })
          }}
          key={child.key}
        >
          {child}
        </Inner>
      ))}
    </div>
  )
}

interface InnerI {
  children: ReactElement
  onExited?: () => void
  keep: boolean
}

function Inner({ children, onExited, keep }: InnerI) {
  const [h, setH] = useState(0)
  const [w, setW] = useState(0)
  const [rect, setRect] = useState<Partial<DOMRect>>({
    bottom: 0,
    right: 0
  })
  return (
    <CssVars
      obj={{
        h: h.toFixed(2) + 'px',
        w: w.toFixed(2) + 'px',
        r1: (rect?.bottom?.toFixed(1) || 0) + 'px',
        r2: (rect?.right?.toFixed(1) || 0) + 'px'
      }}
    >
      <CSSTransition
        onEnter={(e: HTMLElement) => {
          setH(e.scrollHeight)
          setW(e.scrollWidth)
        }}
        onExit={(e: HTMLElement) => {
          setH(e.scrollHeight)
          setW(e.scrollWidth)
        }}
        onExiting={(e: HTMLElement) => {
          const parent = e.parentElement?.parentElement?.getBoundingClientRect()
          const child = e.getBoundingClientRect()

          setRect({
            bottom: (parent?.bottom || 0) - child.bottom,
            right: (parent?.right || 0) - child.right
          })
        }}
        onExited={onExited}
        appear={true}
        classNames={s.elem}
        timeout={250}
        in={keep}
      >
        <div className={s.elem}>
          <div className={s.fade}>{children}</div>
        </div>
      </CSSTransition>
    </CssVars>
  )
}

export default Stack
