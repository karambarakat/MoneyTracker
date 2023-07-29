import React from 'react'
import tw from 'twin.macro'
import { Meta as _m, StoryObj as _s } from '@storybook/react'
import { colors } from '../src/utils/tw'

interface Props {
  name: Exclude<
    keyof typeof colors,
    'white' | 'black' | 'transparent' | 'inherit'
  >
  // array of eleven string
  colors: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
  ]
}

export default function Display(props: Props) {
  const { colors = [], name = 'undefined' } = props as Partial<Props>
  return (
    <>
      <div key={name} tw="w-fit m-auto rounded shadow bg-white p-4 mb-4">
        <div
          css={{
            '@media (max-width: 700px)': {
              flexDirection: 'column',
            },
          }}
          tw="flex flex-wrap gap-1"
        >
          {Array.from({ length: 11 })
            .map((_, i) => colors[i] || null)
            .map((x, i) => (
              <div
                key={i}
                css={
                  x && {
                    backgroundColor: x,
                  }
                }
                tw="min-w-[50px] rounded aspect-square shadow"
              >
                {x === null && (
                  <div tw="grid h-full place-content-center pointer-events-none select-none">
                    ⮾
                  </div>
                )}
              </div>
            ))}
        </div>
        <div tw="font-mono text-sm text-gray-500 mt-3">{name}</div>
        {colors.length > 11 && (
          <div tw="font-mono text-sm text-gray-500 mt-3">
            more colors to be defined
          </div>
        )}
      </div>
    </>
  )
}

export function GroupDisplay(props: {
  of: Record<string, { args: Props }>
  children: React.ReactNode
}) {
  return (
    <div tw="flex md_max:flex-wrap md:block gap-4">
      {Object.entries(props.of)
        .filter(([k]) => k !== 'default')
        .map(
          ([k, v]) =>
            v.args && (
              <div key={k} tw="">
                <Display {...v.args} />
              </div>
            ),
        )}
    </div>
  )
}
