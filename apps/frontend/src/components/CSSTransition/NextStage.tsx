import s from './nextStage.module.scss'
import _ from 'classnames'
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import CssVars from '@src/components/CssVars'

interface Props {
  /**
   * css value to separate the two component
   */
  gap?: string
  nextStage: boolean
  children: [ReactNode, ReactNode]
  /**
   * in millisecond
   */
  duration?: number
}

function NextStage({
  children,
  nextStage,
  duration = 750,
  gap = '0px',
}: Props) {
  const ref_1 = useRef<HTMLDivElement>(null)
  const ref_2 = useRef<HTMLDivElement>(null)
  const [internal, setInternal] = useState(nextStage)
  const [heights, setHeights] = useState([0, 0])

  const observer = useMemo(
    () =>
      typeof window !== 'undefined'
        ? new ResizeObserver(entries => {
            if (entries.length === 2) {
              setHeights(entries.map(v => Math.round(v.contentRect.height)))
              observer?.disconnect()
            }
          })
        : null,
    [],
  )

  useEffect(() => {
    ref_1.current && observer?.observe(ref_1.current)
    ref_2.current && observer?.observe(ref_2.current)
    return () => {
      observer?.disconnect()
    }
  }, [])

  const frameID = useRef(0)
  useEffect(() => {
    setHeights([ref_1, ref_2].map(e => e.current?.offsetHeight || 0))
    frameID.current && cancelAnimationFrame(frameID.current)
    frameID.current = requestAnimationFrame(() => {
      setHeights([ref_1, ref_2].map(e => e.current?.offsetHeight || 0))
      setInternal(nextStage)
    })

    return () => {
      frameID.current && cancelAnimationFrame(frameID.current)
    }
  }, [nextStage])

  return (
    <CssVars
      obj={{
        gap,
        transition: duration + 'ms ease-in-out',
        height: heights[0] + 'px',
        height2: heights[1] + 'px',
      }}
    >
      <CSSTransition
        appear={true}
        classNames={s.anim}
        timeout={duration}
        in={internal}
      >
        <div className={_(s.root)}>
          <div ref={ref_1}>{children[0]}</div>
          <div ref={ref_2}>{children[1]}</div>
        </div>
      </CSSTransition>
    </CssVars>
  )
}

export default NextStage
