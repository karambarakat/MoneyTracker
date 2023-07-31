import 'twin.macro'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { Field } from './Form'
import { useField } from 'formik'

interface Props {
  /**
   * name of the field could be nested or not
   * @example 'email', 'address.street' or 'friends[0].name
   */
  name: string
  /**
   * displayed title
   */
  title?: string
  /**
   * placeholder text
   */
  placeholder?: string
}

export default function TextField(props: Props) {
  return <Field fieldName={props.name} title={props.title} />
}

export function HiddenField(props: Props) {
  return (
    <div tw="hidden">
      <Field fieldName={props.name} asChild>
        <input type="hidden" />
      </Field>
    </div>
  )
}

export function NumberField(props: Props) {
  return (
    <Field
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        if (value && !/^\d+$/.test(value)) {
          return 'Invalid number'
        }
      }}
    />
  )
}

export function EmailField(props: Props) {
  return (
    <Field
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        console.log('todo: uncomment when done')
        // if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)) {
          return 'Invalid email address'
        }
      }}
    ></Field>
  )
}

export function PasswordField(props: Props) {
  return (
    <Field
      fieldName={props.name}
      title={props.title}
      validate={(value: string) => {
        console.log('todo: uncomment when done')
        // if (value && value.length < 8) {
        if (value && value.length < 2) {
          return 'Password must be at least 8 characters'
        }
      }}
      asChild
    >
      <input type="password" />
    </Field>
  )
}

// refactored into OptionField and figure out a way to render special ui
export function CategoryField({
  name,
  title,
  options,
  asChild,
}: WithAsChild<
  Props & { options: ({ label?: string; value: string } | string)[] }
>) {
  const [f_props, meta, helpers] = useField(name)

  const Component = asChild ? Slot : 'input'

  // useFormikContext()
  return (
    <div tw="flex flex-col gap-2">
      <label>{title || capitalCase(name)}</label>
      <div tw="flex gap-2 flex-wrap">
        {options.map(v => {
          const value = typeof v === 'string' ? v : v.value
          const label = typeof v === 'string' ? v : v.label
          return (
            <label key={value} tw="flex items-center gap-2">
              <Component
                tw="rounded min-h-[2.25rem] p-2 dark:bg-gray-600/10 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-primary-200 border dark:border-gray-500/50"
                {...f_props}
                type="radio"
                checked={f_props.value === value}
                value={value}
              />
              <div>{label}</div>
            </label>
          )
        })}
      </div>
      {meta.touched && meta.error && <div>{meta.error}</div>}
    </div>
  )
}
