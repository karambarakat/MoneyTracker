/// <reference path="../types/SB.d.ts" />
import { useDarkMode } from 'storybook-dark-mode'
import { ColorModeProvider } from '../src/colorMode/provider'
import React, { useEffect, useMemo } from 'react'
import 'twin.macro'
import { useFormikContext } from 'formik'
import { Global, PropsOf } from '@emotion/react'
import { Form } from '../src/components/forms/_Form'
import { action } from '@storybook/addon-actions'
import { colors } from '../src/utils/tw'
import GlobalStyles from '../src/GlobalStyles'

export const DarkModeDecorator: SB.Decorator = (Story, ctx) => {
  const sbMode = useDarkMode() ? 'dark' : 'light'

  const paramMode = ctx.parameters.mode

  const mode = paramMode || sbMode

  return (
    <ColorModeProvider mode={mode}>
      {/* <Global
        styles={{
          '.docs-story': { background: colors.slate[50] },
          '.dark .docs-story': {
            background: colors.slate[700],
            color: colors.white,
          },
        }}
      /> */}
      {Story()}
    </ColorModeProvider>
  )
}

export const TwDecoration: SB.Decorator = Story => {
  return (
    <>
      <GlobalStyles />
      <Story />
    </>
  )
}

export const FormDecorator: SB.Decorator = (Story, ctx) => {
  const form = ctx.parameters.form as SB._Parameter['form']

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
}
