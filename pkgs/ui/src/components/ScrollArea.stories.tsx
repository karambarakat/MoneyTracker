// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import ScrollArea, { default as component } from './ScrollArea'
import 'twin.macro'
import { fakerEN } from '@faker-js/faker'
import tw from 'twin.macro'

export default {
  title: 'ScrollArea',
  parameters: {
    layout: 'centered',
  },
  component,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
  },
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph(150)),
  },
} satisfies _m<typeof component>

export const Default = {
  render: args => (
    <div tw="h-72 w-72">
      <ScrollArea asChild>
        <div tw="p-3">{args.children}</div>
      </ScrollArea>
    </div>
  ),
} satisfies _s<typeof component>

export const XAndY = {
  render: args => (
    <div tw="h-72 w-72">
      <ScrollArea asChild>
        <div tw="p-3 w-[400px]">{args.children}</div>
      </ScrollArea>
    </div>
  ),
} satisfies _s<typeof component>
