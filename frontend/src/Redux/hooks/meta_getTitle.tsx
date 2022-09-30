import { MyDispatch } from '@redux/types'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
/**
 * @deprecated
 */
export default function getTitle$$(title: string) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch<MyDispatch>({ type: 'META_SET_TITLE', title })
  }, [])
}
