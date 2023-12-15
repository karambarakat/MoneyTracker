// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect } from 'react'
import ToggleColorTheme from './ToggleColorTheme'
import 'twin.macro'
import { useDarkMode } from 'storybook-dark-mode'
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
} satisfies SB.Meta<typeof component>

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

export const Toggle = {} satisfies SB.Story<typeof component>

function component() {
  const { mode, isSystem } = useColorMode()

  return (
    <div>
      <div tw="pb-2">current mode is: {mode}</div>

      <div tw="pb-2">system prefers is turned {isSystem ? 'on' : 'off'}</div>

      <div>
        <ToggleColorTheme label="toggle color schema" />
      </div>
    </div>
  )
}
