// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { Default_Expand, default as component } from './AppShell'
import { within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import {
  Back_debug,
  Back_normal,
  Children,
  Children_long,
  SideBar,
} from './AppShell.stories.args'

export default {
  title: 'appShell',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    Back: {
      defaultValue: 'Back_debug',
      options: ['Back_normal', 'Back_debug'],
      mapping: {
        Back_normal: Back_normal,
        Back_debug: Back_debug,
      },
      control: {
        type: 'radio',
        option: ['Back_normal', 'Back_debug'],
      },
    },
    SideBar: {
      defaultValue: 'SideBar_normal',
      options: ['SideBar_normal'],
      mapping: {
        SideBar_normal: SideBar,
      },
      control: {
        type: 'select',
      },
    },
    children: {
      defaultValue: 'Children_normal',
      options: ['Children_normal', 'Children_long'],
      mapping: {
        Children_normal: Children,
        Children_long: Children_long,
      },
      control: {
        type: 'select',
      },
    },
    Expand: {
      defaultValue: 'Expand_default',
      options: ['Expand_default'],
      mapping: {
        Expand_default: Default_Expand,
      },
      control: {
        type: 'select',
      },
    },
  },
  args: {
    Back: Back_debug,
    SideBar: SideBar,
    children: Children,
    Expand: Default_Expand,
    bp_1st: 600,
    bp_2nd: 800,
  },
  component,
} satisfies _m<typeof component>

export const Primary = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const toggle = canvas.getByText('toggle sidebar')

    expect(toggle.checkVisibility({ checkOpacity: true })).toBe(true)
  },
} satisfies _s<typeof component>

export const LongContent = {
  args: {
    children: Children_long,
  },
}
