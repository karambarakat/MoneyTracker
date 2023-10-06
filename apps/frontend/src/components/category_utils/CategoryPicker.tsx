import { BsFillCircleFill } from 'react-icons/bs'
import tw from 'twin.macro'
import Hoverable from 'ui/src/components/Hoverable'
import SelectField from 'ui/src/components/forms/SelectField'
import { useFieldContext } from 'ui/src/components/forms/_Field'
import { CategoryIconSVG, colors } from './CategoryIcon'
import { iconSVGQuery } from './fetch'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import { useField } from 'formik'
import ScrollArea from 'ui/src/components/ScrollArea'
import { useEffect, useRef } from 'react'
import { find_category } from '../../api/queries'
import { queryKeys } from '../../api'
import Text from 'ui/src/components/Text'

const selected = tw`bg-slate-200 dark:bg-slate-700`

const Category = (props: any) => (
  <Hoverable asChild>
    <span>{JSON.stringify(props)}hiimlsdf</span>
  </Hoverable>
)

export default function CategoryPicker(props: { name: string }) {
  const [_, color] = useField(props.name)

  const categories = useQuery({
    queryFn: find_category,
    queryKey: ['find_category'] satisfies queryKeys,
    suspense: false,
    useErrorBoundary: false,
  })

  if (categories.error)
    return (
      <Text
        size="subtle"
        tw="min-h-[72px] text-center grid place-content-center"
      >
        failed to load all your categories, please try again <br />
        <button type="button" onClick={() => categories.refetch()}>
          retry
        </button>
      </Text>
    )

  if (!categories.data)
    return (
      <div tw="min-h-[72px] text-center grid place-content-center">
        <AiOutlineLoading3Quarters />
      </div>
    )

  return (
    <div
      css={{
        ['[data-select-root]']: tw`flex gap-2`,
      }}
    >
      <div
        tw="h-48 mt-2"
        css={{
          ['[data-select-root]']: tw`flex-wrap`,
          ['svg']: [
            tw`rounded p-[3px]`,
            {
              ['--category-color']:
                colors.find(e => e.name === color.value)?.color ||
                color.value ||
                colors[1].color,
              fill: 'var(--category-color)',
            },
          ],

          ['li']: [tw`rounded`, { '&[aria-selected="true"]': selected }],
        }}
      >
        <ScrollArea>
          <div>
            <SelectField
              name={props.name}
              SubComponent={Category}
              data={categories.data}
            />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
