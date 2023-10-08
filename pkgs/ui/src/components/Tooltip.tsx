import 'twin.macro'
import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
} from '@radix-ui/react-tooltip'
import { WithChildren } from '../utils/WithChildren'
import { css } from 'twin.macro'
import { useId } from '@mantine/hooks'
import { Slot } from '@radix-ui/react-slot'

interface Props {
  content: string
}

export default function Tooltip(props: WithChildren<Props>) {
  // const Component = Slot
  return (
    <Provider>
      <Root>
        <Trigger asChild>
          <Slot role="tooltip" aria-label={props.content}>
            {props.children}
          </Slot>
        </Trigger>
        <Portal>
          <Content
            css={styles}
            tw="text-sm dark:bg-gray-600 bg-gray-800 text-white rounded px-2 py-1 shadow-sm select-none z-[9999]"
            sideOffset={10}
            asChild
          >
            <span>{props.content}</span>
          </Content>
        </Portal>
      </Root>
    </Provider>
  )
}

const styles = css`
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;

  &[data-state='delayed-open'][data-side='top'] {
    animation-name: slideDownAndFade;
  }

  &[data-state='delayed-open'][data-side='right'] {
    animation-name: slideLeftAndFade;
  }

  &[data-state='delayed-open'][data-side='bottom'] {
    animation-name: slideUpAndFade;
  }

  &[data-state='delayed-open'][data-side='left'] {
    animation-name: slideRightAndFade;
  }

  @keyframes slideUpAndFade {
    from {
      opacity: 0;
      transform: translateY(2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideRightAndFade {
    from {
      opacity: 0;
      transform: translateX(-2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideDownAndFade {
    from {
      opacity: 0;
      transform: translateY(-2px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideLeftAndFade {
    from {
      opacity: 0;
      transform: translateX(2px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`
