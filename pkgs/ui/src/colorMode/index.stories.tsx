// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'

import { StoryObj as _s, Meta as _m } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import ToggleColorTheme from './ToggleColorTheme'
import 'twin.macro'
import { addons } from '@storybook/addons'
import { UPDATE_DARK_MODE_EVENT_NAME, useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider, useColorMode } from './provider'

export default {
  title: 'colorMode',
  decorators: [
    Story => {
      const sbMode = useDarkMode() ? 'dark' : 'light'
      return (
        <ColorModeProvider mode={sbMode}>
          <WithSb>
            <Story />
          </WithSb>
        </ColorModeProvider>
      )
    },
  ],
  component,
} satisfies _m<typeof component>

function WithSb({ children }: { children: React.ReactNode }) {
  const { mode, isSystem } = useColorMode()
  useEffect(() => {
    // if (isSystem) return
    // mode === 'dark' &&
    //   !document.documentElement.classList.contains('dark') &&
    //   addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
    // mode === 'light' &&
    //   document.documentElement.classList.contains('dark') &&
    //   addons.getChannel().emit(UPDATE_DARK_MODE_EVENT_NAME)
  }, [mode])

  return <>{children}</>
}

export const Toggle = {} satisfies _s<typeof component>

function component() {
  const { mode, isSystem } = useColorMode()

  return (
    <div>
      <div tw="pb-2">current mode is: {mode}</div>

      <div tw="pb-2">system prefers is turned {isSystem ? 'on' : 'off'}</div>

      <div>
        <ToggleColorTheme />
      </div>
    </div>
  )
}
