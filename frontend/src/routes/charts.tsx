import CategoryIcon from '@components/category/CategoryIcon'
import PieChart from '@components/d3/PieChart'
import MyPaper from '@components/MyPaper'
import { Progress, Stack, Text } from '@mantine/core'
import log_find from '@redux/api/log_find'
import { LogsState, RootState } from '@redux/types'
import React from 'react'
import { useSelector } from 'react-redux'
import segregate from 'src/utils/segregate'

function Charts_Page_Component() {
  const logs = useSelector<RootState, LogsState>((s) => s.logs)
  React.useEffect(() => {
    log_find()
  }, [])
  const cats = React.useMemo(() => {
    var lists = segregate(
      logs.sort((a, b) =>
        (a.category?._id || '').localeCompare(b.category?._id || '')
      ),
      (log) => log.category?._id
    )
      .map((subList) => ({
        key: subList[0]?.category?._id || '',
        title: subList[0]?.category?.title || 'Not Categorized',
        total: subList.reduce((acc, e) => acc + e.amount, 0),
        cat: subList[0]?.category,
      }))
      .sort((a, b) => b.total - a.total)

    return lists
  }, [logs])

  const clipped = React.useMemo(() => {
    // @todo: not tested
    const end = 5
    const clipped_ = [...cats]
    if (cats.length > end) {
      const nth = clipped_.slice(end - 1).reduce((a, b) => ({
        key: 'others',
        title: 'Others',
        total: a.total + b.total,
        cat: undefined,
      }))

      clipped_[end - 1] = nth
    }

    return {
      list: clipped_.slice(0, end),
      // max: clipped_.reduce((a, b) => (a.total > b.total ? a : b)).total,
      end,
    }
  }, [cats])

  // const meta = React.useMemo(() => {
  //   return {
  //     max: logs.reduce((a, b) => (a.total > b.total ? a : b)).total,
  //   }
  // }, [logs])

  return (
    <Stack sx={{ gap: 18 }}>
      <MyPaper>
        <PieChart data={clipped.list.map((e) => ({ label: e.title }))} />
      </MyPaper>
      {cats.map((log) => {
        return (
          <MyPaper key={log.key} p={16}>
            <Stack sx={{ flexFlow: 'row' }} align="start" spacing={'md'}>
              <CategoryIcon cat={log.cat}></CategoryIcon>
              <div style={{ flex: 1 }}>
                <Stack sx={{ flexFlow: 'row' }} mb={8}>
                  <Text sx={{ flex: 1 }}>{log.title}</Text>
                  <Text>{log.total}</Text>
                </Stack>
                <Progress
                  size={'sm'}
                  value={(100 * log.total) / cats[0].total}
                />
              </div>
            </Stack>
          </MyPaper>
        )
      })}
    </Stack>
  )
}

export default Charts_Page_Component
