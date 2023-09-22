import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
} from '@radix-ui/react-tooltip'
import { WithChildren } from '../utils/WithChildren'

interface Props {
  content: JSX.Element
}

export default function Tooltip(props: WithChildren<Props>) {
  return (
    <Provider>
      <Root>
        <Trigger asChild>
          <button className="IconButton">props.children</button>
        </Trigger>
        <Portal>
          <Content className="TooltipContent" sideOffset={5}>
            {props.content}
          </Content>
        </Portal>
      </Root>
    </Provider>
  )
}
