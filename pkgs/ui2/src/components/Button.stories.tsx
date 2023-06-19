// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Button'
import { colors } from '../utils/tw-helper'

const meta = {
  title: 'Button',
  component,
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
} satisfies _m<typeof component>

export default meta

export const Green = {
  args: {
    color: 'green',
  },
} satisfies _s<typeof component>

export const Sky = {
  args: {
    color: 'sky',
  },
} satisfies _s<typeof component>

export const Slate = {
  args: {
    color: 'slate',
  },
} satisfies _s<typeof component>

export const Red = {
  args: {
    color: 'red',
  },
} satisfies _s<typeof component>

export const Yellow = {
  args: {
    color: 'yellow',
  },
} satisfies _s<typeof component>

export const Teal = {
  args: {
    color: 'teal',
  },
}

export const Filled = {
  args: {
    variant: 'filled',
  },
} satisfies _s<typeof component>

export const Light = {
  args: {
    variant: 'light',
  },
} satisfies _s<typeof component>

export const Outline = {
  args: {
    variant: 'outline',
  },
} satisfies _s<typeof component>

export const Subtle = {
  args: {
    variant: 'subtle',
  },
} satisfies _s<typeof component>

export const Disabled_Filled = {
  args: {
    variant: 'filled',
    disabled: true,
  },
} satisfies _s<typeof component>

export const Disabled_Light = {
  args: {
    variant: 'light',
    disabled: true,
  },
} satisfies _s<typeof component>

export const Disabled_Outline = {
  args: {
    variant: 'outline',
    disabled: true,
  },
} satisfies _s<typeof component>

export const Disabled_Subtle = {
  args: {
    variant: 'subtle',
    disabled: true,
  },
} satisfies _s<typeof component>

export const Small = {
  args: {
    size: 'sm',
  },
} satisfies _s<typeof component>

export const Medium = {
  args: {
    size: 'md',
  },
} satisfies _s<typeof component>

export const Large = {
  args: {
    size: 'lg',
  },
} satisfies _s<typeof component>
