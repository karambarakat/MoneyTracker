import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Button'

const meta = {
  title: 'Example/component',
  component,
  tags: ['autodocs'],
  args: {
    children: 'hi'
  }
} satisfies _m<typeof component>

export default meta

export const Blue = {
  args: {
    color: 'blue'
  }
} satisfies _s<typeof component>

export const Red = {
  args: {
    color: 'red'
  }
} satisfies _s<typeof component>
