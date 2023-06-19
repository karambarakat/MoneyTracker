// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as Prototype_ } from './index'
import { PropsOf } from '@emotion/react'
import { useTimeout } from '@mantine/hooks'

function Prototype(
  p: PropsOf<typeof Prototype_> & {
    augmentChildren: (t: JSX.Element) => JSX.Element
  },
) {
  return (
    <Prototype_ {...p}>
      {style => {
        return p.augmentChildren(p.children(style))
      }}
    </Prototype_>
  )
}

const scaleY = {
  in: { opacity: 1, transform: 'scaleY(1)' },
  out: { opacity: 0, transform: 'scaleY(0)' },
  common: { transformOrigin: 'top' },
  transitionProperty: 'transform, opacity',
}

export default {
  title: 'Transition',
  component: Prototype,
  argTypes: {
    onEnter: { action: 'onEnter', table: { disable: true } },
    onEntered: { action: 'onEntered', table: { disable: true } },
    onExit: { action: 'onExit', table: { disable: true } },
    onExited: { action: 'onExited', table: { disable: true } },
    augmentChildren: { table: { disable: true } },
  },
  args: {
    transition: scaleY,
    mounted: false,
    duration: 500,
    children: style => <div style={style}>transitioning element</div>,
    augmentChildren: s => s,
  },
} satisfies _m<typeof Prototype>

export const OutToIn = {
  decorators: [
    (Story, ctx) => {
      const [mounted, setMounted] = useState(ctx.args.mounted)
      useTimeout(() => setMounted(s => !s), 500).start()
      return <Story args={{ ...ctx.args, mounted }} />
    },
  ],
} satisfies _s<typeof Prototype>

export const InToOut = {
  decorators: [OutToIn.decorators[0]],
  args: {
    mounted: true,
  },
} satisfies _s<typeof Prototype>

export const WithSiblings = {
  decorators: [OutToIn.decorators[0]],
  args: {
    mounted: false,
    keepMounted: true,
    augmentChildren: main => (
      <div>
        <div>pre Element</div>
        {main}
        <div>post Element</div>
      </div>
    ),
  },
} satisfies _s<typeof Prototype>

export const WithSiblingsRow = {
  decorators: [OutToIn.decorators[0]],
  args: {
    mounted: false,
    keepMounted: true,
    augmentChildren: main => (
      <div tw="flex gap-2">
        <div>pre Element</div>
        {main}
        <div>post Element</div>
      </div>
    ),
  },
} satisfies _s<typeof Prototype>
