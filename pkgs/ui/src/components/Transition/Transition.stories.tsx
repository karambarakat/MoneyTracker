// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './index'
import { fakerEN } from '@faker-js/faker'

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)', width: '50px' },
  out: { opacity: 0, transform: 'scaleY(0)', width: '0px' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity, width',
}

export default {
  title: 'Transition',
  component,
  argTypes: {
    onEnter: { action: 'onEnter', table: { disable: true } },
    onEntered: { action: 'onEntered', table: { disable: true } },
    onExit: { action: 'onExit', table: { disable: true } },
    onExited: { action: 'onExited', table: { disable: true } },
  },
  args: {
    transition: scaleY,
    mounted: false,
    duration: 1500,
    children: style => <div style={style}>Transition</div>,
  },
} satisfies _m<typeof component>

export const WithNormalConfiguration = {
  decorators: [
    Story => (
      <div tw="flex flex-row">
        <div tw="mr-5">pre element</div>
        <Story />
        <div>post element</div>
      </div>
    ),
  ],
} satisfies _s<typeof component>
