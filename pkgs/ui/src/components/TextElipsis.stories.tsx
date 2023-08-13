// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { default as Component_ } from './TextEllipsis'
import 'twin.macro'
import { fakerEN } from '@faker-js/faker'
import { css } from 'twin.macro'
import { WithAsChild } from '../utils/WithChildren'

const Component = ({ width, ...props }: WithAsChild<{ width: number }>) => {
  return (
    <Component_
      css={[
        width &&
          css`
            width: ${width}px;
          `,
      ]}
      {...props}
    />
  )
}

export default {
  title: 'TextEllipsis',
  component: Component,
  argTypes: {
    width: { control: 'number' },
    children: { control: 'text' },
  },
  args: {
    children: (fakerEN.seed(1), fakerEN.lorem.paragraph()),
  },
  decorators: [
    Story => (
      <div tw="border-2 max-w-full w-[fit-content]">
        <Story />
      </div>
    ),
  ],
} satisfies SB.Meta<typeof Component>

export const WithBasicConfiguration = {} satisfies SB.Story<typeof Component>
export const Short = { args: { width: 170 } } satisfies SB.Story<
  typeof Component
>
