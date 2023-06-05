import CategoryIcon from '@src/components/category/CategoryIcon'
import PieChart from '@src/components/d3/PieChart'
import MyPaper from '@src/components/MyPaper'
import { Box, Progress, Stack, Text, ThemeIcon } from '@mantine/core'
import { setTitle } from '@src/components/ReactRoute/index'
import React from 'react'
import segregate from 'src/utils/segregate'
import Amount from '@src/components/Amount'
import getLogs from '@src/redux/actions/getData/getLogs'
import EmptyCharts from '@src/components/alternates/EmptyCharts'

function Charts_Page_Component() {
  setTitle('Charts')

  const [logs, { empty }] = getLogs()

  const cats = React.useMemo(() => {
    const lists = segregate(
      logs.sort((a, b) =>
        (a.category?._id || '').localeCompare(b.category?._id || '')
      ),
      log => log.category?._id
    )
      .map(subList => ({
        key: subList[0]?.category?._id || '',
        title: subList[0]?.category?.title || 'Not Categorized',
        total: subList.reduce((acc, e) => acc + e.amount, 0),
        cat: subList[0]?.category
      }))
      .sort((a, b) => b.total - a.total)

    return lists
  }, [logs])

  const pieData = React.useMemo(() => {
    // @todo: not tested
    const end = 5
    const clipped_ = [...cats]
    if (cats.length > end) {
      const nth = clipped_.slice(end - 1).reduce((a, b) => ({
        key: 'others',
        title: 'Others',
        total: a.total + b.total,
        cat: undefined
      }))

      clipped_[end - 1] = nth
    }

    return {
      list: clipped_.slice(0, end).map((e, i, l) => {
        const I: number = i % 5
        return {
          color: ['#e25a3e', '#eac271', '#d88436', '#435023', '#dadbd3'][I],
          label: e.title,
          value: e.total
        }
      }),
      max: clipped_.reduce((a, b) => (a.total > b.total ? a : b), {
        total: 0
      }).total,
      end
    }
  }, [cats])

  return empty ? (
    <EmptyCharts />
  ) : (
    <Stack sx={{ gap: 18 }}>
      <MyPaper>
        <Box
          sx={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))'
          }}
        >
          <Box sx={{ minWidth: '230px', justifySelf: 'center' }}>
            <PieChart data={pieData.list} />
          </Box>
          <Box sx={{ display: 'flex', gap: 12, flexDirection: 'column' }}>
            <Text pb={4}>Top Categories:</Text>

            {pieData.list.map((e, i) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                  }}
                >
                  <ThemeIcon color={e.color} size={28}>
                    <Box component="span" sx={{ userSelect: 'none' }}>
                      {i + 1}
                    </Box>
                  </ThemeIcon>
                  <span style={{ flex: 1 }}>{e.label}</span>
                  <Amount a={e.value} />
                </Box>
              )
            })}
          </Box>
        </Box>
      </MyPaper>
      {cats.map(log => {
        return (
          <MyPaper key={log.key} p={16}>
            <Stack sx={{ flexFlow: 'row' }} align="start" spacing={'md'}>
              <CategoryIcon cat={log.cat}></CategoryIcon>
              <div style={{ flex: 1 }}>
                <Stack sx={{ flexFlow: 'row' }} mb={8}>
                  <Text sx={{ flex: 1 }}>{log.title}</Text>
                  <Amount a={log.total} />
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
