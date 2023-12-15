import tw from 'twin.macro'
import * as Radix from '@radix-ui/react-scroll-area'
import { WithAsChild } from '../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { css } from '@emotion/react'

const styles = {
  root: tw`overflow-hidden w-full h-full transition-colors duration-[160ms] ease-out`,
  viewport: css`
    ${tw`w-full h-full`}
    & > * {
      ${tw`min-w-full min-h-full`}
    }
  `,
  scrollbar: tw`flex p-0.5 select-none touch-none hover:bg-slate-600/30 dark:hover:bg-slate-500 transition-colors`,
  scrollbar_vertical: tw`w-2.5`,
  scrollbar_horizontal: tw`flex-col h-2.5`,
  thumb_position: css`
    position: relative;
    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      min-width: 44px;
      min-height: 44px;
    }
  `,
  thumb: tw`flex-1 bg-slate-800/80 dark:bg-slate-200/80 rounded-[10px]`,
  corner: tw`bg-slate-600/60`,
}

export default function ScrollArea({
  children,
  asChild,
  ...props
}: WithAsChild<
  Pick<Radix.ScrollAreaProps, 'dir' | 'type' | 'scrollHideDelay'>
>) {
  const Component = asChild ? Slot : 'div'

  return (
    <Radix.Root css={styles.root} {...props}>
      <Radix.Viewport css={styles.viewport}>
        <Component css={tw`h-full`} tabIndex={0}>
          {children}
        </Component>
      </Radix.Viewport>
      <Radix.Scrollbar
        css={[styles.scrollbar, styles.scrollbar_vertical]}
        orientation="vertical"
      >
        <Radix.Thumb css={[styles.thumb, styles.thumb_position]} />
      </Radix.Scrollbar>
      <Radix.Scrollbar
        css={[styles.scrollbar, styles.scrollbar_horizontal]}
        orientation="horizontal"
      >
        <Radix.Thumb css={[styles.thumb, styles.thumb_position]} />
      </Radix.Scrollbar>
      <Radix.Corner css={styles.corner} />
    </Radix.Root>
  )
}
