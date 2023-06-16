/// <reference types="@types/testing-library__jest-dom" />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { Default_Expand, default as component } from './AppShell'
import { userEvent, within } from '@storybook/testing-library'
import {
  Back_debug,
  Back_normal,
  Children,
  Children_long,
  SideBar,
  SideBar_long,
} from './AppShell.stories.args'

export default {
  title: 'appShell/Layout',
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
    bp_sm: 639,
    bp_md: 767,
  },
  component,
} satisfies _m<typeof component>

export const WithBasicConfiguration = {} satisfies _s<typeof component>

export const ExtraSmallView = {
  parameters: {
    viewport: {
      defaultViewport: 'xs',
    },
  },
} satisfies _s<typeof component>

export const ExtraSmallViewOpened = {
  parameters: ExtraSmallView.parameters,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = await canvas.findByText('sidebar: ', { exact: false })
    toggle.textContent?.includes('sidebar: closed') && toggle.click()
    const clear = await canvas.findByText('sidebar: opened')
    clear.click()
  },
} satisfies _s<typeof component>

export const SmallView = {
  parameters: {
    viewport: {
      defaultViewport: 'sm',
    },
  },
} satisfies _s<typeof component>

export const SmallViewOpened = {
  parameters: SmallView.parameters,
  play: async ({ canvasElement, ...more }) => {
    await ExtraSmallViewOpened.play({ canvasElement, ...more })
  },
} satisfies _s<typeof component>

export const SmallViewExpanded = {
  parameters: SmallView.parameters,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = await canvas.findByText('expand: ', { exact: false })
    toggle.textContent?.includes('expand: 0') && toggle.click()
    const clear = await canvas.findByText('expand: 1')
    clear.click()
  },
} satisfies _s<typeof component>

export const SmallViewExpandedOpened = {
  parameters: SmallView.parameters,
  play: async ({ canvasElement, ...more }) => {
    await SmallViewOpened.play({ canvasElement, ...more })

    await SmallViewExpanded.play({ canvasElement, ...more })

    // should not allow to open
    const canvas = within(canvasElement)
    canvas.findByText('sidebar: closed')
  },
} satisfies _s<typeof component>

export const MediumView = {
  parameters: {
    viewport: {
      defaultViewport: 'md',
    },
  },
} satisfies _s<typeof component>
export const HoverEffect = {
  parameters: SmallView.parameters,

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // setup to prevent flanky test:
    const expand = await canvas.findByText('expand: ', { exact: false })

    expand.textContent?.includes('expand: 1') &&
      userEvent.click(await canvas.findByText('expand: ', { exact: false }))
    const toggle = await canvas.findByText('sidebar: ', { exact: false })
    toggle.textContent?.includes('opened') && userEvent.click(toggle)
    await new Promise(r => setTimeout(r, 500))

    // actual test:
    const hover = await canvas.findByText('···')
    userEvent.hover(hover)
    await canvas.findByText('sidebar: closed')
    await new Promise(r => setTimeout(r, 1000))
    await canvas.findByText('sidebar: opened')

    userEvent.unhover(hover)
    await new Promise(r => setTimeout(r, 1000))
    await canvas.findByText('sidebar: closed')
  },
} satisfies _s<typeof component>

export const LargeView = {
  parameters: {
    viewport: {
      defaultViewport: 'lg',
    },
  },
} satisfies _s<typeof component>

export const LongContent = {
  args: {
    children: Children_long,
  },
}

export const LognSideBar = {
  args: {
    SideBar: SideBar_long,
  },
}
