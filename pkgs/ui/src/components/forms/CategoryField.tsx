import 'twin.macro'
import { capitalCase } from 'change-case'
import { WithAsChild } from '../../utils/WithChildren'
import { Slot } from '@radix-ui/react-slot'
import { useField, useFormik, useFormikContext } from 'formik'

interface Props {
  /**
   * name of the field could be nested or not
   * @example 'email', 'address.street' or 'friends[0].name
   */
  name: string
  /**
   * displayed title, if not provided will be generated from name
   */
  title?: string
}

// refactored into OptionField and figure out a way to render special ui
export default function CategoryField({
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
