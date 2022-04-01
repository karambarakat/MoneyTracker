import { useElementSize } from '@mantine/hooks'
import s from './nextStage.module.scss'
import _ from 'classnames'
import {
  CSSProperties,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react'
import { CSSTransition, TransitionStatus } from 'react-transition-group'
import CssVars from '@components/CssVars'

interface Props {
  nextStage: boolean
  children: [ReactNode, ReactNode]
  /**
   * in millisecond
   */
  duration?: number
}

function NextStage({ children, nextStage, duration = 750 }: Props) {
  const [height, setHeight] = useState(0)
  const [height2, setHeight2] = useState(0)
  const [internal, setInternal] = useState(nextStage)
  const zeroHeight: () => boolean = () => height === 0 && height2 === 0

  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    //@ts-ignore
    setHeight(root.current?.children[0].offsetHeight || 0)
    //@ts-ignore
    setHeight2(root.current?.children[1].offsetHeight || 0)
    setInternal(nextStage)
  }, [nextStage])

  return (
    <CssVars
      obj={{
        transition: duration + 'ms ease-in-out',
        height: height + 'px',
        height2: height2 + 'px',
      }}
    >
      <CSSTransition classNames={s.anim} timeout={duration} in={internal}>
        <div
          className={_(
            s.root,
            zeroHeight() ? 'noHeight' : 'withHeight',
            internal ? 'lvl2' : 'lvl1'
          )}
          ref={root as RefObject<HTMLDivElement>}
        >
          <div>{children[0]}</div>
          <div>{children[1]}</div>
        </div>
      </CSSTransition>
    </CssVars>
  )
}

export default NextStage
