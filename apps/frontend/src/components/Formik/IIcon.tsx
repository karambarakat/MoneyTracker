import { ActionIcon, Box, Input, ScrollArea } from '@mantine/core'
import { Field, FieldProps, useFormikContext } from 'formik'
import * as AllIcons from '@components/category/CategoryAllIcons'

import { IconProps } from 'tabler-icons-react'
import CategoryIcon from '@components/category/CategoryIcon'

interface Props {
  /**
   * name provided at `initialValues` in Formik provider
   */
  formikName: string
  label: string
  description?: string
  required?: boolean
}

function MyIconInput({ formikName, required, label, description }: Props) {
  const formikProps = useFormikContext<{ color?: string }>()

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
              styles={{ input: { height: '200px' } }}
              component="div"
              size="sm"
            >
              <ScrollArea
                offsetScrollbars
                style={{ height: '200px', overflowX: 'hidden' }}
              >
                <Box
                  py={12}
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(36px, 1fr))',
                    gap: '12px',
                    justifyItems: 'center',
                    alignItems: 'center'
                  }}
                >
                  {CategoryIcon.collection.allIcons.map(({ key }) => {
                    return (
                      <div
                        key={key}
                        onClick={() => {
                          formikProps.setFieldValue(formikName, key)
                        }}
                      >
                        <CategoryIcon.Hoverable>
                          <CategoryIcon
                            on={field.value === key}
                            size={38}
                            variant={field.value === key ? 'filled' : 'subtle'}
                            cat={{
                              icon: key,
                              color: formikProps.values.color || 'gray'
                            }}
                          />
                        </CategoryIcon.Hoverable>
                      </div>
                    )
                  })}
                </Box>
              </ScrollArea>
            </Input>
          </Input.Wrapper>
        )
      }}
    </Field>
  )
}

export default MyIconInput
