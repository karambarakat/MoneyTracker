import { useQuery, useQueryClient } from '@tanstack/react-query'
import { rest } from 'msw'
import 'twin.macro'

const def =
  'm38.49,32h-14.49V8h24v18h-6.04l-3.46,6Zm-18.49,4v-14c-7.73,0-14,6.27-14,14s6.27,14,14,14,14-6.27,14-14h-14Zm27.73-6h-3.46l-12.12,21c.77,1.33.96,1.67,1.73,3h24.25c.77-1.33.96-1.67,1.73-3l-12.12-21Z'

function Component() {
  const { data, status, fetchStatus } = useQuery({
    queryFn: async () => {
      // @ts-expect-error
      const res = await import('./icons')
      return res.default.split('\n') as string[]
    },
    suspense: false,
    queryKey: ['icons'],
  })

  if (status === 'loading') return <div>loading</div>

  return (
    <div tw="flex flex-wrap gap-2">
      {data?.map((value, key) => {
        return (
          <div tw="min-w-[24px] min-h-[24px] fill-green-700">
            <svg
              viewBox="0 0 64 64"
              key={key}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d={value} />
            </svg>
          </div>
        )
      })}
    </div>
  )
}

export default {
  title: 'Experimental/Icons',
  component: Component,
  parameters: {
    query: true,
    msw: [
      rest.get('/icons', async (req, res, ctx) => {
        await new Promise(() => {
          /* sleep */
        })
        return res(ctx.json({ data: 'hello' }))
      }),
    ],
  },
  decorators: [
    (Story: any, ctx: any) => {
      useQueryClient().clear()

      return <Story />
    },
  ],
} satisfies SB.Meta<typeof Component>

export const Base = {} satisfies SB.Story<typeof Component>
