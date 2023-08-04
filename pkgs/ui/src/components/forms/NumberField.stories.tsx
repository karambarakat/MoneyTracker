import React from 'react'
import 'twin.macro'

import NumberField from './NumberField'
import { userEvent, within } from '@storybook/testing-library'

export default {
  title: 'forms/NumberField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: NumberField,
} satisfies SB.Meta<typeof NumberField>

export const Default = {} satisfies SB.Story<typeof NumberField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 2,
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof NumberField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        name: 'number',
        value: '000 xx 000',
        // failed: true,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const elem = await canvas.findByLabelText('Number')
    await userEvent.click(elem)
    await userEvent.keyboard('{Enter}')
  },
} satisfies SB.Story<typeof NumberField>
