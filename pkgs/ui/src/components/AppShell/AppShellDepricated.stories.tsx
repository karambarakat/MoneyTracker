/// <reference types="@types/testing-library__jest-dom" />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import AppShell, {
  Default_Expand,
  default as component,
} from './AppShellDeprecated'
import * as AppShell2 from './AppShellDeprecated'
import { userEvent, within } from '@storybook/testing-library'
import {
  Back_debug,
  Back_normal,
  Children,
  Children_long,
  SideBar,
  SideBar_long,
  Debug,
} from './AppShell.stories.args'
import tw from 'twin.macro'
import { css } from '@emotion/react'
import ScrollArea from '../ScrollArea'

export default {
  title: 'appShell_Deprecated',
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
} satisfies _s<typeof component>

export const SmallView = {
  parameters: {
    viewport: {
      defaultViewport: 'sm',
    },
  },
} satisfies _s<typeof component>

export const SmallViewOpened = {
  ...SmallView,
} satisfies _s<typeof component>

export const SmallViewExpanded = {
  ...SmallView,
} satisfies _s<typeof component>

export const SmallViewExpandedOpened = {
  ...SmallView,
} satisfies _s<typeof component>

export const MediumView = {
  parameters: {
    viewport: {
      defaultViewport: 'md',
    },
  },
} satisfies _s<typeof component>
export const HoverEffect = {
  ...SmallView,
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
