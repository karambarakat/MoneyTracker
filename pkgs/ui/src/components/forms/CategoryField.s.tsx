import React from 'react'
import 'twin.macro'

import CategoryField from './CategoryField'

export default {
  title: 'forms/CategoryField',
  parameters: {
    form: {
      asField: {},
    },
  },
  component: CategoryField,
} satisfies SB.Meta<typeof CategoryField>

export const Default = {} satisfies SB.Story<typeof CategoryField>
export const Filled = {
  parameters: {
    form: {
      asField: {
        value: 'field is filled',
      },
    },
  },
  args: {},
} satisfies SB.Story<typeof CategoryField>

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
} satisfies SB.Story<typeof CategoryField>

export const Errored = {
  parameters: {
    form: {
      asField: {
        value: 'filled with error',
        failed: true,
      },
    },
  },
} satisfies SB.Story<typeof CategoryField>
