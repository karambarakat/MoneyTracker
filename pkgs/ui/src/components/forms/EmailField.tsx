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

interface Props extends FieldProps {
  info?: string
}

export default function EmailField({ info, ...props }: Props) {
  return (
    <FieldRoot
      {...props}
      // validate={(value: string) => {
      // if (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]+$/i.test(value)) {
      //   return 'Invalid email address'
      // }
      // }}
    >
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
      <FieldInfo>{info}</FieldInfo>
    </FieldRoot>
  )
}
