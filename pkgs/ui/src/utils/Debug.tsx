import tw from 'twin.macro'
import { WithChildren } from './WithChildren'

export default function Debug(p: WithChildren) {
  return (
    <pre
      className="debug"
      css={{
        '& > *': tw`mb-1`,
        '& > :last-child': tw`mb-0`,
        button: {
          ...tw`bg-teal-500/50 px-2`,
          '&:hover': tw`bg-teal-500/70`,
        },
      }}
      tw="p-3 absolute top-10 right-10 bg-teal-500/20 w-[min-content]"
    >
      {p.children}
    </pre>
  )
}
