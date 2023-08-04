import React from 'react'
import 'twin.macro'

import EmailField from './EmailField'
import { userEvent, within } from '@storybook/testing-library'

export default {
  title: 'forms/EmailField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: EmailField,
} satisfies SB.Meta<typeof EmailField>

export const Default = {} satisfies SB.Story<typeof EmailField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof EmailField>

export const Long = {
  parameters: {
    form: {
      asField: {
        value:
          'field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, field is filled, ',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof EmailField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        name: 'email',
        value: 'invalid @ email com',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const elem = await canvas.findByLabelText('Email')
    await userEvent.click(elem)
    await userEvent.keyboard('{Enter}')
  },
} satisfies SB.Story<typeof EmailField>
