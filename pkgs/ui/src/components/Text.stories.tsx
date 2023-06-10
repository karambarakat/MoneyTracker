// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Text'
import 'twin.macro'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'Text',
  component,
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph()),
  },
} satisfies _m<typeof component>

export const Basic = {} satisfies _s<typeof component>
