/// <reference types="@types/testing-library__jest-dom" />
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import * as AppShell from './AppShell'
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
import { Props } from './AppShell'

interface StoryProps {
  SideBar: JSX.Element
  children: JSX.Element
}

const Components = ({ SideBar, children, ...props }: Props & StoryProps) => {
  return (
    <AppShell.Root {...props}>
      <Debug />
      <AppShell.SideBar>
        {SideBar}
        <AppShell.Expand
          styles={{
            base: tw`absolute bottom-[60px] right-[-10px] w-[20px] h-[20px] rounded-full bg-black`,
            expand_0: tw`bg-red-500`,
            expand_1: tw`bg-green-500`,
            expand_disabled: tw`hidden`,
          }}
        />
      </AppShell.SideBar>
      <AppShell.Overlay
        styles={{
          base: tw`transition-opacity`,
          open: tw`opacity-50 bg-black/50`,
          not_open: tw`opacity-0`,
        }}
      />
      <AppShell.Content>
        <ScrollArea asChild>
          <div tw="h-screen!">{children}</div>
        </ScrollArea>
      </AppShell.Content>
    </AppShell.Root>
  )
}

export default {
  title: 'appShell',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    SideBar: {
      table: {
        disable: true,
      },
    },
    children: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    bp_md: 767,
    bp_sm: 639,
    sidebar_sm: '64px',
    sidebar_md: '250px',
  },
  component: Components,
} satisfies _m<typeof Components>

export const NormalContent = {
  args: {
    children: Children,
    SideBar: SideBar,
  },
} satisfies _s<typeof Components>

export const LongContent = {
  args: {
    children: Children_long,
    SideBar: SideBar_long,
  },
} satisfies _s<typeof Components>
