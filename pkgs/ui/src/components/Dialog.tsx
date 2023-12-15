import 'twin.macro'
import React from 'react'
import {
  DialogProps,
  Root,
  Content,
  Trigger,
  Portal,
  Close,
  Overlay,
} from '@radix-ui/react-dialog'
import { WithChildren } from '../utils/WithChildren'

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
          {/* <div tw="fixed inset-0 z-40 bg-gray-950/20" /> */}

          {content}
        </Portal>
      </Root>
    </>
  )
}

Dialog.Close = Close

Dialog.Floating = function ({ children, ...props }: WithChildren) {
  return (
    <div
      tw="z-50 fixed inset-0 m-auto h-fit shadow-2xl w-[550px] max-w-[80vw]"
      {...props}
    >
      <Content>{children}</Content>
    </div>
  )
}

Dialog.NormalContent = Content

export default Dialog
