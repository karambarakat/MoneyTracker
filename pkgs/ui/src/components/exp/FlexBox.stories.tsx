import { styled } from 'twin.macro'
import FlexBox_ from './FlexBox'
import React from 'react'
import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { PropsOf } from '@emotion/react'
import { HTMLProps, useState } from 'react'
import { acceptStyled } from '../../utils/Styled'
import { WithChildren } from '../../utils/WithChildren'
import { useListState } from '@mantine/hooks'
import useListForTesting from '../../utils/useListForTesting'

function FlexBox({
  Children = p => (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <p.Child key={index}>element {index}</p.Child>
      ))}
    </>
  ),
  Root = styled.div``,
  Child = styled.div``,
  Post = styled.div``,
}: PropsOf<typeof FlexBox_> & {
  Children?: (p: { Child: (p: WithChildren) => JSX.Element }) => JSX.Element
  Child?: acceptStyled
  Root?: acceptStyled
  Post?: acceptStyled
}) {
  return (
    <Root>
      <FlexBox_ tw="outline outline-2 outline-red-500/50">
        <div tw="p-2">
          <Children
            Child={p => (
              <FlexBox_ tw="outline outline-2 outline-red-500/50">
                <Child tw="p-3">{p.children}</Child>
              </FlexBox_>
            )}
          />
        </div>
      </FlexBox_>
      <Post>post element</Post>
    </Root>
  )
}

export default {
  title: 'exp/FlexBox',
  component: FlexBox,
  tags: ['autodocs'],
  argTypes: {
    Children: { table: { disable: true } },
    children: { table: { disable: true } },
    Child: { table: { disable: true } },
    Root: { table: { disable: true } },
    Post: { table: { disable: true } },
    animation: { type: 'string', defaultValue: '0.5s ease-in-out' },
    x: { type: 'boolean', control: { type: 'radio' } },
    y: { type: 'boolean', control: { type: 'radio' } },
  },
  args: {
    Children: p => {
      const list = useListForTesting()
      return (
        <>
          {list.map((_, index) => (
            <p.Child key={_}>element {index}</p.Child>
          ))}
        </>
      )
    },
  },
} satisfies _m<typeof FlexBox>

export const Column = {} satisfies _s<typeof FlexBox>
export const Row = {
  args: {
    Children: p => {
      const list = useListForTesting()
      return (
        <div tw="flex">
          {list.map((_, index) => (
            <p.Child key={_}>element {index}</p.Child>
          ))}
        </div>
      )
    },
    Child: () => <div tw="w-[90px] p-2">element</div>,
  },
} satisfies _s<typeof FlexBox>
