import { useRef } from 'react'
import useObserver from '../../hooks/useObserver'
import { PropsOf } from '@emotion/react'
import tw, { css, styled } from 'twin.macro'

interface Props {
  /**
   * to Be used in css transition value
   * @default 0.5s ease-in-out
   */
  animation?: string
  /**
   * element is not going to extend in x direction
   * @default false
   */
  no_x?: boolean
  /**
   * element is not going to extend in y direction
   * @default false
   */
  no_y?: boolean
  /**
   * hide the overflow in x direction
   * @default false
   */
  visible_x?: boolean
  /**
   * hide the overflow in y direction
   * @default false
   */
  visible_y?: boolean
}

const Root = styled.div<Props>`
  transition:
    width ${p => p.animation},
    height ${p => p.animation};
`

export default function ({
  animation = '0.5s ease-in-out',
  no_x = false,
  no_y = false,
  visible_x = false,
  visible_y = false,
  ...props
}: PropsOf<typeof Root> & Props) {
  const ref = useRef<HTMLDivElement>(null)
  const flex = useRef<HTMLDivElement>(null)

  useObserver(ref, entry => {
    if (!flex.current || !ref.current) return
    const box = entry.contentRect
    !no_x && flex.current.style.setProperty('width', String(box.width) + 'px') //= String(box.width) + 'px'
    !no_y && flex.current.style.setProperty('height', String(box.height) + 'px')
  })

  return (
    <Root
      ref={flex}
      animation={animation}
      css={[
        !no_x && !visible_x && tw`overflow-x-hidden`,
        !no_y && !visible_y && tw`overflow-y-hidden`,
      ]}
      {...props}
    >
      <div
        ref={ref}
        css={[!no_x && tw`w-[fit-content]`, !no_y && tw`h-[fit-content]`]}
      >
        {props.children}
      </div>
    </Root>
  )
}
