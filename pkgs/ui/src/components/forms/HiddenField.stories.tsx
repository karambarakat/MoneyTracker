import React from 'react'
import 'twin.macro'

import HiddenField from './HiddenField'

export default {
  title: 'forms/HiddenField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: HiddenField,
} satisfies SB.Meta<typeof HiddenField>

export const Default = {} satisfies SB.Story<typeof HiddenField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof HiddenField>

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
} satisfies SB.Story<typeof HiddenField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        value: 'filled with error',
        failed: true,
      },
    },
  },
} satisfies SB.Story<typeof HiddenField>
