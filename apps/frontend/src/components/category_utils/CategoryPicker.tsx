import tw from 'twin.macro'
import Hoverable from 'ui/src/components/Hoverable'
import SelectField, {
  Strategy,
  SubComponent,
} from 'ui/src/components/forms/SelectField'
import { CategoryIconFromId } from './CategoryIcon'
import { useQuery } from '@tanstack/react-query'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import ScrollArea from 'ui/src/components/ScrollArea'
import { find_category } from '../../api/queries'
import { queryKeys } from '../../api'
import Text from 'ui/src/components/Text'
import { useFieldContext } from 'ui/src/components/forms/_Field'
import TextEllipsis from 'ui/src/components/TextEllipsis'

const selected = tw`bg-slate-200 dark:bg-slate-700`

const Category: SubComponent = props => (
  <div tw="grid place-items-center select-none">
    <CategoryIconFromId id={props.value} />
    <TextEllipsis css={{ 'text-overflow': 'clip' }}>{props.label}</TextEllipsis>
  </div>
)

const CategoryStrategy: Strategy = props => {
  const { actions, meta } = useFieldContext()
  return (
    <ul
      aria-label="categories"
      aria-multiselectable={false}
      role="listbox"
      tabIndex={0}
      tw="grid grid-cols-[repeat(auto-fill,minmax(50px,1fr))] gap-1"
    >
      {props.data.map(e => {
        return (
          <Hoverable asChild>
            <li
              aria-selected={e.value === meta.value}
              css={[
                tw`rounded cursor-pointer p-1`,
                e.value === meta.value && selected,
              ]}
              role="option"
              onClick={() => {
                actions.setValue(e.value)
              }}
            >
              <props.SubComponent {...e} />
            </li>
          </Hoverable>
        )
      })}
    </ul>
  )
}

export default function CategoryPicker(props: { name: string }) {
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
        tw="max-h-[72px] text-center grid place-content-center"
      >
        failed to load all your categories, please try again <br />
        <button type="button" onClick={() => categories.refetch()}>
          retry
        </button>
      </Text>
    )

  if (!categories.data)
    return (
      <div tw="max-h-[72px] text-center grid place-content-center">
        <AiOutlineLoading3Quarters />
      </div>
    )

  return (
    <div tw="h-48 mt-2">
      <ScrollArea>
        <div>
          <SelectField
            name={props.name}
            SubComponent={Category}
            Strategy={CategoryStrategy}
            data={categories.data.map(sub => ({
              label: sub.title,
              value: sub.id,
              ...sub,
            }))}
          />
        </div>
      </ScrollArea>
    </div>
  )
}
