import tw, { stylable } from 'twin.macro'

import { WithChildren } from '../utils/WithChildren'

const DividerStyles = tw`min-w-[1px] min-h-[1px] self-stretch bg-slate-300/40 dark:bg-slate-700/70`

export default function Divider(props: WithChildren) {
  return <div css={DividerStyles} {...props} />
}

export const DividerWithLabel = function ({
  children,
  labelPosition,
  styles, // ...props
}: WithChildren<{
  labelPosition?: 'left' | 'center' | 'right'
  styles: {
    root: stylable
    divider: stylable
  }
}>) {
  return (
    <div tw="flex gap-3" css={styles.root}>
      {labelPosition !== 'left' && (
        <Divider css={styles.divider} tw="flex-1 self-center" />
      )}
      <div>{children}</div>
      {labelPosition !== 'right' && (
        <Divider css={styles.divider} tw="flex-1 self-center" />
      )}
    </div>
  )
}
