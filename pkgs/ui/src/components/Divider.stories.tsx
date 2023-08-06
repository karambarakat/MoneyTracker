// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import 'twin.macro'
import Divider, { DividerWithLabel, default as component } from './Divider'
import { fakerEN } from '@faker-js/faker'
import tw from 'twin.macro'

export default {
  title: 'Divider',
  component,
} satisfies SB.Meta<typeof component>

export const Column = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div css={{ '&>*': tw`mt-3`, '&>*:first-child': tw`mt-0` }}>
        <div>{fakerEN.lorem.words(10)}</div>
        <Divider {...args} />
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>

export const ColumnWithMargin = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div tw="flex mx-5 gap-3 flex-col">
        <div>{fakerEN.lorem.words(10)}</div>
        <Divider {...args} tw="-mx-5" />
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>

export const Row = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div tw="flex gap-3">
        <div>{fakerEN.lorem.words(10)}</div>
        <Divider {...args} />
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>

export const WithLabelCenter = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div tw="flex gap-3 flex-col">
        <div>{fakerEN.lorem.words(10)}</div>
        <DividerWithLabel {...args}>{fakerEN.lorem.words(2)}</DividerWithLabel>
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>

export const WithLabelLeft = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div tw="flex gap-3 flex-col">
        <div>{fakerEN.lorem.words(10)}</div>
        <DividerWithLabel {...args} labelPosition="left">
          {fakerEN.lorem.words(2)}
        </DividerWithLabel>
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>

export const WithLabelRight = {
  render: args => {
    fakerEN.seed(1)
    return (
      <div tw="flex gap-3 flex-col">
        <div>{fakerEN.lorem.words(10)}</div>
        <DividerWithLabel {...args} labelPosition="right">
          {fakerEN.lorem.words(2)}
        </DividerWithLabel>
        <div>{fakerEN.lorem.words(10)}</div>
      </div>
    )
  },
} satisfies SB.Story<typeof component>
