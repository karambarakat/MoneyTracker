import { QueryClient } from '@tanstack/react-query'
import { onlineManager } from '@tanstack/react-query'

onlineManager.subscribe(() => {
  console.log('onlineManager', onlineManager.isOnline())
})

export const client = new QueryClient()
