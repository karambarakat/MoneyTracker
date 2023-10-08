import { PropsOf } from '@emotion/react'
import React from 'react'
import { FieldRoot, useFieldContext } from './_Field'
import { WithChildren } from '../../utils/WithChildren'
import { useId } from '@mantine/hooks'

/**
 * for the purposes of accessability, and form
 * submission there props are required for every strategy
 */
type StrategySubProps = {
  label: string
  value: string | undefined
}

export type Strategy = (props: StrategyProps) => JSX.Element

export type SubComponent<subProps extends StrategySubProps = StrategySubProps> =
  (props: subProps) => JSX.Element

type StrategyProps<subProps extends StrategySubProps = StrategySubProps> = {
  multiSelect?: boolean
  data: subProps[]
  SubComponent: SubComponent<subProps>
}

function SelectField<subProps extends StrategySubProps>({
  Strategy,
  SubComponent,
  multiSelect,
  data,
  ...formProps
}: Omit<PropsOf<typeof FieldRoot>, 'children'> &
  StrategyProps<subProps> & {
    Strategy?: Strategy
  }) {
  const Strategy_ = Strategy || ListBoxStrategy
  return (
    <FieldRoot {...formProps}>
      <Strategy_
        data={data}
        // @ts-expect-error
        SubComponent={SubComponent}
        multiSelect={multiSelect}
      />
    </FieldRoot>
  )
}

function ListBoxStrategy<subProps extends StrategySubProps>(
  props: StrategyProps<subProps>,
) {
  const ctx = useFieldContext()

  return (
    <ul
      aria-label={ctx.meta_ext.title}
      role="listbox"
      aria-multiselectable={props.multiSelect}
      tabIndex={0}
      data-select-root
    >
      {props.data.map(supProps => {
        return (
          <li
            key={supProps.value}
            data-key={supProps.value}
            onClick={() => ctx.actions.setValue(supProps.value)}
            role="option"
            aria-label={supProps.label}
            aria-selected={ctx.meta.value === supProps.value && 'true'}
            data-select-option
          >
            <props.SubComponent {...supProps} />
          </li>
        )
      })}
    </ul>
  )
}

// react component that I can pass a ref to
const ListBoxStrategyNoReactivity = ({ label }: { label: string }) =>
  React.forwardRef<HTMLUListElement, StrategyProps>((props, ref) => {
    return (
      <ul
        aria-label={label}
        role="listbox"
        aria-multiselectable={props.multiSelect}
        tabIndex={0}
        data-select-root
        ref={ref}
      >
        {props.data.map(supProps => {
          return (
            <li
              key={supProps.value}
              data-value={supProps.value}
              role="option"
              aria-label={supProps.label}
              data-select-option
            >
              <props.SubComponent {...supProps} />
            </li>
          )
        })}
      </ul>
    )
  })

SelectField.ListBoxStrategy = ListBoxStrategy
SelectField.ListBoxStrategyNoReactivity = ListBoxStrategyNoReactivity

export default SelectField
