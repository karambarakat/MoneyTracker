import FlexBox_ from './FlexBox'
import React from 'react'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { PropsOf } from '@emotion/react'
import useListForTesting, { finalList } from '../../utils/useListForTesting'
import tw from 'twin.macro'
import { Transition } from '../Transition/Transition'
import { fade_from_buttom } from '../Transition/transitions'

function FlexBox(Props: PropsOf<typeof FlexBox_>) {
  return <FlexBox_ {...Props} tw="outline outline-2 outline-red-500/50" />
}

export default {
  title: 'experimental/FlexBox',
  component: FlexBox,
  tags: ['autodocs'],
  argTypes: {
    animation: { type: 'string', defaultValue: '0.5s ease-in-out' },
    no_x: { type: 'boolean', control: { type: 'radio' } },
    no_y: { type: 'boolean', control: { type: 'radio' } },
  },
  args: {},
} satisfies _m<typeof FlexBox>

export const Column = {
  render: args => {
    const list = useListForTesting()
    return (
      <>
        <FlexBox {...args}>
          <div tw="flex flex-col gap-2">
            {list.map((item, i) => (
              <div key={item}>element_{i}</div>
            ))}
          </div>
        </FlexBox>
        <div>post element</div>
      </>
    )
  },
} satisfies _s<typeof FlexBox>

export const Row = {
  render: args => {
    const list = useListForTesting()
    return (
      <div tw="flex gap-2">
        <FlexBox {...args}>
          <div tw="flex gap-2">
            {list.map((item, i) => (
              <div key={item}>element_{i}</div>
            ))}
          </div>
        </FlexBox>
        <div>post element</div>
      </div>
    )
  },
} satisfies _s<typeof FlexBox>

export const RowFromRight = {
  render: args => {
    const list = useListForTesting()
    return (
      <div tw="flex gap-2">
        <div tw="flex-1" />
        <FlexBox {...args}>
          <div tw="flex gap-2">
            {list.map((item, i) => (
              <div key={item}>element_{i}</div>
            ))}
          </div>
        </FlexBox>
        <div>post element</div>
      </div>
    )
  },
} satisfies _s<typeof FlexBox>

export const WithTransitionRow = {
  render: args => {
    const list = useListForTesting()
    return (
      <div tw="flex gap-2">
        <div tw="flex">
          {finalList.map((item, i) => (
            <FlexBox no_y {...args}>
              <Transition
                duration={200}
                mounted={list.includes(item)}
                transition={fade_from_buttom}
                key={item}
              >
                {styles => (
                  <div tw="mx-2" style={styles}>
                    element_{item}
                  </div>
                )}
              </Transition>
            </FlexBox>
          ))}
        </div>
        <div>post element</div>
      </div>
    )
  },
} satisfies _s<typeof FlexBox>

export const WithTransitionColumn = {
  render: args => {
    const list = useListForTesting()
    return (
      <div tw="flex flex-col gap-2">
        <div tw="flex flex-col">
          {finalList.map((item, i) => (
            <FlexBox no_x {...args}>
              <Transition
                duration={200}
                mounted={list.includes(item)}
                transition={fade_from_buttom}
                key={item}
              >
                {styles => (
                  <div tw="py-2" style={styles}>
                    element_{item}
                  </div>
                )}
              </Transition>
            </FlexBox>
          ))}
        </div>
        <div>post element</div>
      </div>
    )
  },
} satisfies _s<typeof FlexBox>

// todo: next
// export const WithTransitionDelay = {}
// the past two stories are not good DE and have funky UI animation

// export const WithTransitionDelayChildren
