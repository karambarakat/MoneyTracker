import { useRef } from 'react'
import { WithChildren } from '../../utils/WithChildren'
import useObserver from '../../hooks/useObserver'
import { PropsOf } from '@emotion/react'
import { css, styled } from 'twin.macro'

interface Props {
  /**
   * to Be used in css transition value
   * @default 0.5s ease-in-out
   */
  animation?: string
  /**
   * extending in x direction
   * @default true
   */
  x?: boolean
  /**
   * extending in y direction
   * @default true
   */
  y?: boolean
}

const Root = styled.div<Props>`
  transition: width ${p => p.animation}, height ${p => p.animation};
`

export default function ({
  animation = '0.5s ease-in-out',
  x = true,
  y = true,
  ...props
}: PropsOf<typeof Root> & Props) {
  const ref = useRef<HTMLDivElement>(null)
  const flex = useRef<HTMLDivElement>(null)

  useObserver(ref, entry => {
    if (!flex.current || !ref.current) return
    // console.log(entry.contentRect, (flex.current.style.display = 'none'))
    const box = entry.contentRect
    x && flex.current.style.setProperty('width', String(box.width) + 'px') //= String(box.width) + 'px'
    y && flex.current.style.setProperty('height', String(box.height) + 'px')
  })

  return (
    <Root
      ref={flex}
      animation={animation}
      css={[x && xCss, y && yCss]}
      {...props}
    >
      <div ref={ref} css={[x && xCss, y && yCss]}>
        {props.children}
      </div>
    </Root>
  )
}

const xCss = css`
  width: fit-content;
`
const yCss = css`
  height: fit-content;
`
