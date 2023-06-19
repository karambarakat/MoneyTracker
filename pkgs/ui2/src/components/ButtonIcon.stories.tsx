import { Edit } from 'tabler-icons-react'
import ButtonIcon from './ButtonIcon'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
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
  },
} satisfies _m<typeof ButtonIcon>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies _s<typeof ButtonIcon>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies _s<typeof ButtonIcon>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies _s<typeof ButtonIcon>
