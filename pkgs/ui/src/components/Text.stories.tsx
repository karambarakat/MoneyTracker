// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Text'
import 'twin.macro'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'Text',
  component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    size: {
      options: ['sm', 'md', 'lg', 'h1', 'h2', 'h3'],
      control: {
        type: 'select',
      },
    },
  },
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph()),
    size: 'md',
  },
} satisfies _m<typeof component>

export const H1 = {
  args: {
    size: 'h1',
  },
} satisfies _s<typeof component>

export const H2 = {
  args: {
    size: 'h2',
  },
} satisfies _s<typeof component>

export const H3 = {
  args: {
    size: 'h3',
  },
} satisfies _s<typeof component>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies _s<typeof component>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies _s<typeof component>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies _s<typeof component>
