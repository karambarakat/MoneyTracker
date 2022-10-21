import { notification } from '@myHooks/notifications'

export interface actionModule<A extends { type: string }, R> {
  type: A['type']

  action: (args: Omit<A, 'type'>) => Promise<R>
  offline?: (args: Omit<A, 'type'>) => Promise<R>

  pushNotification?: (args: R) => notification
}

import { obj as logUPD } from './log/update.action'

export type actions = logUPD //| logCRT
