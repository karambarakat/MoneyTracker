import { LinkProps, useLocation } from 'react-router-dom'
import { Link as NativeLink } from 'react-router-dom'

export default function Link({
  as_modal,
  ...props
}: LinkProps & { as_modal?: boolean }) {
  const location = useLocation()
  location.state?.from
  return (
    <NativeLink
      state={{
        ...(props.state || {}),
        from: location.state?.from
          ? location.state.from
          : as_modal
          ? location
          : undefined,
      }}
      {...props}
    >
      {props.children}
    </NativeLink>
  )
}
