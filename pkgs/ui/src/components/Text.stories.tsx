// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

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
} satisfies SB.Meta<typeof component>

export const H1 = {
  args: {
    size: 'h1',
  },
} satisfies SB.Story<typeof component>

export const H2 = {
  args: {
    size: 'h2',
  },
} satisfies SB.Story<typeof component>

// export const H3 = {
//   args: {
//     size: 'h3',
//   },
// } satisfies SB.Story<typeof component>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies SB.Story<typeof component>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies SB.Story<typeof component>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies SB.Story<typeof component>
