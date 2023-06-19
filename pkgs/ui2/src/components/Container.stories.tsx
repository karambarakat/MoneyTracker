// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Container'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'Container',
  component,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <div tw="flex flex-col gap-3">
        <div>{(fakerEN.seed(1), fakerEN.lorem.paragraph())}</div>
        <div>{(fakerEN.seed(2), fakerEN.lorem.paragraph())}</div>
        <div>{(fakerEN.seed(3), fakerEN.lorem.paragraph())}</div>
        <div>{(fakerEN.seed(4), fakerEN.lorem.paragraph())}</div>
        <div>{(fakerEN.seed(5), fakerEN.lorem.paragraph())}</div>
      </div>
    ),
  },
} satisfies _m<typeof component>

export const WithBasicConfiguration = {} satisfies _s<typeof component>
