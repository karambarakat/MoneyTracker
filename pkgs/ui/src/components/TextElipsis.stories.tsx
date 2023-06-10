// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './TextEllipsis'
import 'twin.macro'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'TextEllipsis',
  component,
  argTypes: {
    width: { control: 'number' },
    children: { control: 'text' }
  },
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph())
  },
  decorators: [
    Story => (
      <div tw="border-2 max-w-full w-[fit-content]">
        <Story />
      </div>
    )
  ]
} satisfies _m<typeof component>

export const Basic = {} satisfies _s<typeof component>
export const Short = { args: { width: 170 } } satisfies _s<typeof component>
