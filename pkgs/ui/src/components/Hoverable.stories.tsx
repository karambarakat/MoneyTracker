import 'twin.macro'
import component from './Hoverable'
import { AiFillCheckCircle } from 'react-icons/ai'

export default {
  title: 'Hoverable',
  component,
  decorators: [
    S => (
      <div tw="w-[30px] h-[30px]">
        <AiFillCheckCircle />
        <S>
          <AiFillCheckCircle />
        </S>
      </div>
    ),
  ],
} satisfies SB.Meta<typeof component>

export const Basic = {} satisfies SB.Story<typeof component>
