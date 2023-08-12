/// <reference path="../types/SB.d.ts"/>
import '../src/tailwind.css'
import type { Preview } from '@storybook/react'
import React, { useEffect, useMemo } from 'react'
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import GlobalStyles from '../src/GlobalStyles'
import { fakerEN } from '@faker-js/faker'
import { initialize, mswDecorator } from 'msw-storybook-addon'
import { Form } from '../src/components/forms/_Form'
import { action } from '@storybook/addon-actions'

import 'twin.macro'
import { Global, PropsOf } from '@emotion/react'
import { colors } from '../src/utils/tw'
import { useField, useFormik, useFormikContext } from 'formik'
fakerEN.seed(123)

initialize()

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: {
        xs: {
          // 16:9 portrait
          name: 'xs',
          styles: {
            width: '440px',
            height: '824px',
          },
        },
        sm: {
          // 16:9 portrait, sm breakpoint
          name: 'sm',
          styles: {
            width: '640px',
            height: '1140px',
          },
        },
        md: {
          // 16:9 landscape, md breakpoint
          name: 'md',
          styles: {
            width: '768px',
            height: '432px',
          },
        },
        lg: {
          // 16:9 landscape, lg breakpoint
          name: 'lg',
          styles: {
            width: '1024px',
            height: '576px',
          },
        },
      },

      actions: { argTypesRegex: '^on[A-Z].*' },
      controls: {
        matchers: {
          color: /(background|color)$/i,
          date: /Date$/,
        },
      },
    },
    darkMode: {
      current: 'dark',
      darkClass: ['dark', 'dark-mode-plugin-dark'],
      lightClass: ['light', 'dark-mode-plugin-light'],
      classTarget: 'html',
      stylePreview: true,
    },
  },

  decorators: [
    mswDecorator,
    Story => {
      const sbMode = useDarkMode() ? 'dark' : 'light'
      return <ColorModeProvider mode={sbMode}>{Story()}</ColorModeProvider>
    },
    (Story, ctx) => {
      const form = ctx.parameters.form as SB.Parameter['form']

      if (!form) {
        return <Story />
      }

      const StoryField = form.asField?.name || 'StoryField'

      var values: PropsOf<typeof Form>['values'] = []

      if (form.values) values = form.values

      const asField = form.asField ? { name: StoryField } : {}

      if (form.asField?.value) {
        values = { ...values, [StoryField]: form.asField?.value }
      }

      const AutoSubmit = useMemo(() => {
        return ({ submit }: { submit: boolean }) => {
          const f = useFormikContext()
          useEffect(() => {
            submit && f.submitForm()
          }, [])
          return <></>
        }
      }, [])

      return (
        <Form
          values={values}
          validate={
            form.asField?.failed
              ? async () => {
                  return {
                    [StoryField]: 'this is an example error',
                  }
                }
              : async () => {}
          }
          action={async vals => action('submit-form')}
        >
          <AutoSubmit submit={form.asField?.failed || false} />
          <Story args={{ ...ctx.args, ...asField }} />
        </Form>
      )
    },
    Story => {
      return (
        <>
          <GlobalStyles />
          <Global
            styles={{
              '.docs-story': { background: colors.slate[50] },
              '.dark .docs-story': {
                background: colors.slate[700],
                color: colors.white,
              },
            }}
          />
          {Story()}
        </>
      )
    },
  ],
}

export default preview
