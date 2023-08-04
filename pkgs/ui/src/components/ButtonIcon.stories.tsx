import { Edit } from 'tabler-icons-react'
import ButtonIcon from './ButtonIcon'
import 'twin.macro'
import meta from './Button.stories'

export default {
  title: 'ButtonIcon',
  component: ButtonIcon,
  tags: ['autodocs'],
  argTypes: {
    ...meta.argTypes,
    children: {
      table: {
        disable: true,
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: <Edit />,
    size: 'md',
    color: 'green',
    variant: 'outline',
    label: 'Storybook Example',
  },
} satisfies SB.Meta<typeof ButtonIcon>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies SB.Story<typeof ButtonIcon>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies SB.Story<typeof ButtonIcon>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies SB.Story<typeof ButtonIcon>
