// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { useColorMode } from './provider'
import 'twin.macro'
import { addons } from '@storybook/addons'
import { UPDATE_DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'

export default {
  title: 'colorMode',
  component
} satisfies _m<typeof component>

export const Mode = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    const mode = canvas
      .getByText(current(''), { exact: false })
      .textContent?.replace('current mode is: ', '')

    if (!mode) throw new Error()
    const other = mode === 'dark' ? 'light' : 'dark'

    const changeButton = canvas.getByText(change(mode))
    userEvent.click(changeButton)
    expect(canvas.getByText(current(other)).textContent).toBeDefined()

    // return to normal
    userEvent.click(canvas.getByText(change(''), { exact: false }))
  }
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
      <div>{current(mode)}</div>
      <button
        onClick={() => {
          addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
          mode === 'dark' && setMode('light')
          mode === 'light' && setMode('dark')
        }}
      >
        {change(mode)}
      </button>
    </div>
  )
}
