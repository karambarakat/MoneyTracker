import { PropsOf } from '@emotion/react'
import { FieldRoot, useFieldContext } from './_Field'
import { WithChildren } from '../../utils/WithChildren'
import { useId } from '@mantine/hooks'

type Child = {
  label: string
  value: string | number | undefined
  Component: SubComponent
}

export type SubComponent = (props: Omit<Child, 'Component'>) => JSX.Element

type Props = {
  multiSelect?: boolean
  Strategy?: typeof MainStrategy
  Children: Child[]
}

function ListBoxField({
  Children,
  multiSelect,
  Strategy,
  ...props
}: Omit<PropsOf<typeof FieldRoot>, 'children'> & Props) {
  const Strategy_ = Strategy || MainStrategy
  return (
    <FieldRoot {...props}>
      <Strategy_ Children={Children} multiSelect={multiSelect} />
    </FieldRoot>
  )
}

function MainStrategy(props: Omit<Props, 'Strategy'>) {
  const ctx = useFieldContext()

  return (
    <div
      aria-label={ctx.meta_ext.title}
      role="listbox"
      aria-multiselectable={props.multiSelect}
      tabIndex={0}
    >
      {props.Children.map(({ Component, ...props }) => {
        console.log({ Component })
        return (
          <div
            onClick={() => ctx.actions.setValue(props.value)}
            role="option"
            aria-label={props.label}
            aria-selected={ctx.meta.value === props.value && 'true'}
          >
            <Component {...props} />
          </div>
        )
      })}
    </div>
  )
}

ListBoxField.MainStrategy = MainStrategy

export default ListBoxField
