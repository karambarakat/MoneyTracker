import 'twin.macro'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { HTMLProps } from 'react'
import { PropsOf } from '@emotion/react'

export default function SpinningIcon(
  props: PropsOf<typeof AiOutlineLoading3Quarters>,
) {
  return (
    <div tw="animate-spin w-fit">
      <AiOutlineLoading3Quarters {...props} />
    </div>
  )
}

/*
import component from './SpinningIcon'

export default {
  title: 'SpinningIcon',
  component,
} satisfies SB.Meta<typeof component>

export const Basic = {} satisfies SB.Story<typeof component>
*/
