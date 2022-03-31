import { UnstyledButton } from '@mantine/core'
import { PropsWithChildren } from 'react'

function MyButton({ children }: PropsWithChildren<any>) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.md,
        color:
          theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        },
      })}
    >
      {children}
    </UnstyledButton>
  )
}

export default MyButton
