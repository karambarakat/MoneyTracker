import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { useColorMode } from './provider'

const current = (m: string) => `current mode is: ${m}`
const change = (m: string) =>
  `change to ${m === 'dark' ? 'light' : m === 'light' ? 'dark' : m}`
function component() {
  const [mode, setMode] = useColorMode()
  return (
    <>
      <div>{current(mode)}</div>
      <button onClick={() => setMode(s => (s === 'dark' ? 'light' : 'dark'))}>
        {change(mode)}
      </button>
    </>
  )
}

export default {
  title: 'colorMode',
  component
} satisfies _m<typeof component>

export const consumer = {
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
