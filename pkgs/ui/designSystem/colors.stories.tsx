import React from 'react'
import { Meta as _m, StoryObj as _s } from '@storybook/react'
import tw from 'twin.macro'
import { colors } from '../src/utils/tw'
import Display from './_Display'

const getColor = (
  key: Exclude<
    keyof typeof colors,
    'white' | 'black' | 'transparent' | 'inherit'
  >,
) => {
  return {
    args: { name: key, colors: Object.values(colors[key]) as any },
  } satisfies _s<typeof Display>
}

export default {
  title: 'Design System/Colors',
  component: Display,
} satisfies _m<typeof Display>

export const Primary = getColor('primary')
export const slate = getColor('slate')
export const gray = getColor('gray')
export const zinc = getColor('zinc')
export const neutral = getColor('neutral')
export const stone = getColor('stone')
export const red = getColor('red')
export const orange = getColor('orange')
export const amber = getColor('amber')
export const yellow = getColor('yellow')
export const lime = getColor('lime')
export const green = getColor('green')
export const emerald = getColor('emerald')
export const teal = getColor('teal')
export const cyan = getColor('cyan')
export const sky = getColor('sky')
export const blue = getColor('blue')
export const indigo = getColor('indigo')
export const violet = getColor('violet')
export const purple = getColor('purple')
export const fuchsia = getColor('fuchsia')
export const pink = getColor('pink')
export const rose = getColor('rose')
