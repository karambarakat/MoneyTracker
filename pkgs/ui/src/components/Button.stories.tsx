// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { default as Base } from './Button'
import { colors } from '../utils/tw-helper'

function Component(
  props: React.ComponentProps<typeof Base> & { onClick: () => void },
) {
  return (
    <Base {...props} asChild>
      <button onClick={props.onClick} children={props.children} />
    </Base>
  )
}

const meta = {
  title: 'Button',
  component: Component,
  tags: ['autodocs'],
  args: {
    children: 'Button, Click me!',
    color: 'green',
    variant: 'light',
    size: 'md',
  },
  argTypes: {
    variant: {
      options: ['filled', 'light', 'outline', 'subtle'],
      control: {
        type: 'select',
      },
    },
    onClick: {
      action: 'clicked',
      table: {
        disable: true,
      },
    },
    color: {
      defaultValue: 'green',
      options: colors,
      control: {
        type: 'select',
      },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: {
        type: 'select',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
  },
} satisfies SB.Meta<typeof Component>

export default meta

export const Green = {
  args: {
    color: 'green',
  },
} satisfies SB.Story<typeof Component>

export const Sky = {
  args: {
    color: 'sky',
  },
} satisfies SB.Story<typeof Component>

export const Slate = {
  args: {
    color: 'slate',
  },
} satisfies SB.Story<typeof Component>

export const Red = {
  args: {
    color: 'red',
  },
} satisfies SB.Story<typeof Component>

export const Yellow = {
  args: {
    color: 'yellow',
  },
} satisfies SB.Story<typeof Component>

export const Teal = {
  args: {
    color: 'teal',
  },
}

export const Filled = {
  args: {
    variant: 'filled',
  },
} satisfies SB.Story<typeof Component>

export const Light = {
  args: {
    variant: 'light',
  },
} satisfies SB.Story<typeof Component>

export const Outline = {
  args: {
    variant: 'outline',
  },
} satisfies SB.Story<typeof Component>

export const Subtle = {
  args: {
    variant: 'subtle',
  },
} satisfies SB.Story<typeof Component>

export const Disabled_Filled = {
  args: {
    variant: 'filled',
    disabled: true,
  },
} satisfies SB.Story<typeof Component>

export const Disabled_Light = {
  args: {
    variant: 'light',
    disabled: true,
  },
} satisfies SB.Story<typeof Component>

export const Disabled_Outline = {
  args: {
    variant: 'outline',
    disabled: true,
  },
} satisfies SB.Story<typeof Component>

export const Disabled_Subtle = {
  args: {
    variant: 'subtle',
    disabled: true,
  },
} satisfies SB.Story<typeof Component>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies SB.Story<typeof Component>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies SB.Story<typeof Component>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies SB.Story<typeof Component>
