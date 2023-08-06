import 'twin.macro'
import {
  CancelFieldValue,
  FieldBase,
  FieldError,
  FieldInfo,
  FieldProps,
  FieldRoot,
  Input,
  Label,
} from './_Field'

type Props = FieldProps

export default function EmailField(props: Props) {
  return (
    <FieldRoot
      {...props}
      validate={(value: string) => {
        if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)) {
          return 'Invalid email address'
        }
      }}
    >
      <div>
        <FieldBase>
          <div tw="flex gap-3 items-center">
            <div tw="flex-1">
              <Label />
              <Input />
            </div>
            <CancelFieldValue />
          </div>
        </FieldBase>
        <FieldError />
        <FieldInfo>hello</FieldInfo>
      </div>
    </FieldRoot>
  )
}
