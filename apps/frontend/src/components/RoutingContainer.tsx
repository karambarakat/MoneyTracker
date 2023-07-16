import tw from 'twin.macro'
import { WithChildren } from 'ui/src/utils/WithChildren'

export default function RoutingContainer(p: WithChildren) {
  return (
    <div tw="grid place-content-center min-h-[300px] max-h-screen">
      {p.children}
    </div>
  )
}
