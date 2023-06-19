// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { default as component } from './Divider'
import { fakerEN } from '@faker-js/faker'

export default {
  title: 'Divider',
  component,
} satisfies _m<typeof component>

export const WithNormalConfiguration = {} satisfies _s<typeof component>
