import CategoryAllColors from '@components/CategoryAllColors'
import { ActionIcon, Box, Input } from '@mantine/core'
import { Field, FieldProps, useFormikContext } from 'formik'
import { Blur, Circle } from 'tabler-icons-react'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  label: string
  description?: string
  required?: boolean
}

function MyColorInput({ formikName, required, label, description }: Props) {
  const formikProps = useFormikContext()

  return (
    <Field name={formikName}>
      {({ field, meta }: FieldProps) => {
        return (
          <Input.Wrapper
            required={required}
            size="sm"
            label={label}
            description={description}
            error={meta.touched && meta.error}
          >
            <Input
              styles={{ input: { height: 'auto' } }}
              component="div"
              size="sm"
            >
              <Box
                py={12}
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                  gap: '12px',
                  justifyItems: 'center',
                  alignItems: 'center',
                }}
              >
                {CategoryAllColors.map((icon) => {
                  return (
                    <ActionIcon
                      size={38}
                      variant={field.value === icon ? 'light' : 'subtle'}
                      onClick={() => {
                        formikProps.setFieldValue(formikName, icon)
                      }}
                      radius="xl"
                      color={icon}
                    >
                      {field.value !== icon ? <Circle /> : <Blur />}
                    </ActionIcon>
                  )
                })}
              </Box>
            </Input>
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyColorInput
