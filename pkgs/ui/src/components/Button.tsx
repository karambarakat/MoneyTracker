import { PropsWithChildren } from 'react'

interface Props {
  color?: 'red' | 'blue'
}

function MyButton({ children, color = 'red' }: PropsWithChildren<Props>) {
  return (
    <button>
      tood: {children}, color: {color}
    </button>
  )
}

export default MyButton
