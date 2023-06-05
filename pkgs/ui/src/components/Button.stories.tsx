import type { Meta, StoryObj } from '@storybook/react'

import { default as component } from './Button'

const meta: Meta<typeof component> = {
  title: 'Example/component',
  component,
  tags: ['autodocs'],
  args: {
    children: 'hi'
  }
}

export default meta
type Story = StoryObj<typeof component>

export const Primary = {} satisfies Story

export const Secondary = {
  args: {
    variant: 'outline'
  }
} satisfies Story

export const Large = {} satisfies Story

export const Small = {} satisfies Story
