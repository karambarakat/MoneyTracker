// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import ToggleColorTheme from './ToggleColorTheme'
import 'twin.macro'
import { addons } from '@storybook/addons'
import { UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { useColorMode } from './provider'

export default {
  title: 'colorMode',
  component,
} satisfies _m<typeof component>

export const Toggle = {} satisfies _s<typeof component>

export const FromLight = {
  decorators: [
    Story => {
      useEffect(() => {
        if (document.documentElement.classList.contains('dark')) {
          addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
        }
      }, [])
      return <Story />
    },
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const mode = canvas
      .getByText(current(''), { exact: false })
      .textContent?.replace('current mode is: ', '')

    if (!mode) throw new Error()
    const other = mode === 'dark' ? 'light' : 'dark'

    userEvent.click(canvas.getByLabelText(change(mode)))

    expect(canvas.getByText(current(other)).textContent).toBeDefined()

    // return to normal
    userEvent.click(canvas.getByLabelText(change(''), { exact: false }))
  },
} satisfies _s<typeof component>

export const FromDark = {
  decorators: [
    Story => {
      useEffect(() => {
        if (!document.documentElement.classList.contains('dark')) {
          addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
        }
      }, [])
      return <Story />
    },
  ],

  play: async ({ canvasElement, ...more }) => {
    FromLight.play({ canvasElement, ...more })
  },
} satisfies _s<typeof component>

function current(m: string) {
  return `current mode is: ${m}`
}

function change(m: string) {
  return `change to ${m === 'dark' ? 'light' : m === 'light' ? 'dark' : m}`
}

function component() {
  const [mode, setMode] = useColorMode()
  return (
    <div>
      <div tw="pb-2">{current(mode)}</div>

      <div
        aria-label={change(mode)}
        onClick={() => {
          addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
          mode === 'dark' && setMode('light')
          mode === 'light' && setMode('dark')
        }}
      >
        <ToggleColorTheme />
      </div>
    </div>
  )
}
