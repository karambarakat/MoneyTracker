import 'twin.macro'
import React from 'react'
import {
  DialogProps,
  Root,
  Content,
  Trigger,
  Portal,
  Close,
} from '@radix-ui/react-dialog'

interface Props extends DialogProps {
  content: JSX.Element
  trigger: JSX.Element
}

function Dialog({ content, trigger, ...props }: Props) {
  return (
    <>
      <Root {...props}>
        <Trigger asChild>{trigger}</Trigger>
        <Portal>
          <div tw="fixed inset-0 z-50 bg-gray-950/20" />
          <Content asChild>{content}</Content>
        </Portal>
      </Root>
    </>
  )
}

Dialog.Close = Close

export default Dialog
