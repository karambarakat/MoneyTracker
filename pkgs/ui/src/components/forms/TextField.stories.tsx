import React from 'react'
import 'twin.macro'

import TextField from './TextField'

export default {
  title: 'forms/TextField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: TextField,
} satisfies SB.Meta<typeof TextField>

export const Default = {} satisfies SB.Story<typeof TextField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof TextField>

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
} satisfies SB.Story<typeof TextField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        value: 'filled with error',
        failed: true,
      },
    },
  },
} satisfies SB.Story<typeof TextField>
