import { find_one_log } from '@src/api'
import { useOneState } from '@src/utils/OneOpenAtATime'
import { OutputOfAction } from '@src/utils/fetch_'
import moment from 'moment'
import tw from 'twin.macro'

export default function LogEntry({
  log,
}: {
  log: OutputOfAction<typeof find_one_log>
}) {
  const [expand, setExpand] = useOneState()

  // todo refactoring: better styles
  return (
    <div
      onClick={() => setExpand(s => !s)}
      tw="hover:bg-slate-200/50 dark:hover:bg-slate-600/10 cursor-pointer rounded-md p-3 py-1"
    >
      <div>{log.category?.title || 'no category'}</div>
      <div>{log.title}</div>
      <div>{log.note}</div>
      <div>{log.amount}</div>
      {expand && (
        <div>
          <div>
            last updated:{' '}
            {moment(log.updatedAt || log.createdAt)
              .format('MMM Do, YYYY ___ h:mm a')
              .replace('___', 'at')}
          </div>
          {/* // todo refactoring: when designing the update page */}
          <div>click to edit</div>
        </div>
      )}
    </div>
  )
}
