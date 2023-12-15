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

const selected = tw`bg-slate-200 dark:bg-slate-700`

function selectNearestLiElement(e: HTMLElement) {
  if (e.nodeName === 'LI') return e as HTMLLIElement
  if (e.parentElement) return selectNearestLiElement(e.parentElement)
  return null
}

const Cmp = SelectField.ListBoxStrategyNoReactivity({ label: 'category' })

const CategoryStrategy = (props: any) => {
  const ref = useRef<HTMLUListElement>()
  const alreadySelected = useRef<HTMLLIElement>()
  const field = useFieldContext()

  useEffect(() => {
    const fn = (e: Event) => {
      const target = selectNearestLiElement(e.target as HTMLElement)
      const value = target?.getAttribute('data-value')
      if (target && value) {
        field.actions.setValue(value)
        alreadySelected.current?.removeAttribute('aria-selected')
        alreadySelected.current = target
        target.setAttribute('aria-selected', 'true')
      }
    }

    ref.current?.addEventListener('click', fn)

    return () => {
      ref.current?.removeEventListener('click', fn)
    }
  }, [ref.current])

  return <Cmp ref={ref} {...props} />
}

const Category = (props: { label: string; value: string; path: string }) => (
  <Hoverable asChild>
    <CategoryIconSVG tw="cursor-pointer" path={props.path} />
  </Hoverable>
)

export default function CategoryThemePicker(props: {
  names: { color: string; icon: string }
}) {
  const icons = useQuery({
    queryFn: iconSVGQuery,
    queryKey: ['icons'],
    suspense: false,
    cacheTime: Infinity,
  })

  const [_, color] = useField(props.names.color)

  if (!icons.data)
    return (
      <div>
        <AiOutlineLoading3Quarters />
      </div>
    )

  return (
    <div
      css={{
        ['[data-select-root]']: tw`flex gap-2`,
      }}
    >
      <div>
        <SelectField
          name={props.names.color}
          SubComponent={Color}
          data={colors.map(e => ({
            label: e.name,
            value: e.name,
            color: e.color,
          }))}
        />
      </div>

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
          <SelectField
            Strategy={CategoryStrategy}
            name={props.names.icon}
            SubComponent={Category}
            data={icons.data.map((e, i) => ({
              label: 'icon-' + i,
              value: String(i),
              path: e,
            }))}
          />
        </ScrollArea>
      </div>
      {/* <IconPicker name="icon" /> */}
    </div>
  )
}

const Color = ({ color, label }: { label: string; color: string }) => {
  const ctx = useFieldContext()
  return (
    <Hoverable
      css={[
        tw`rounded p-2 cursor-pointer`,
        ctx.meta.value === label && selected,
      ]}
    >
      <BsFillCircleFill color={color} size={16} />
    </Hoverable>
  )
}
