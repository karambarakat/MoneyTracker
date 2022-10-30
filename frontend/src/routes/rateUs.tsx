import FiveStar from '@components/FiveStar'
import { setTitle } from '@components/ReactRoute'
import { Text } from '@mantine/core'
import { store } from '@redux/index'
import { MetaState, RootState } from '@redux/types'
import { useSelector } from 'react-redux'

function Export_Page_Component() {
  setTitle('Rate Us')

  const { rating } = useSelector<RootState, MetaState>((s) => s.meta)

  return (
    <div>
      <Text pb={12}>How Do You Like This App</Text>
      <FiveStar
        value={rating}
        onChange={(rating) =>
          store.dispatch({ type: 'META_RATING', pl: { rating } })
        }
      />
    </div>
  )
}

export default Export_Page_Component
