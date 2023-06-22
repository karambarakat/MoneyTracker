import React, { Fragment, createContext, useContext } from 'react'
import { useCallback } from 'react'
import AddLogButton from '@src/components/AddLogButton'
// import { Accordion, Divider, Stack } from '@mantine/core'
import Divider, { DividerWithLabel } from 'ui/src/components/Divider'
import dispatch from '@src/redux/dispatch'
import { useEffect, useRef, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState, UserState } from '@src/redux/types'
import moment from 'moment'
import segregate from 'src/utils/segregate'
import LogAccordion from '@src/components/LogAccordion'
import MyPaper from '@src/components/MyPaper'
import { setTitle } from '@src/components/ReactRoute/index'
import EmptyLogs from '@src/components/alternates/EmptyLogs'
import { create_log, find_log, find_one_log } from '@src/api'
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
import tw from 'twin.macro'
import { OutputOfAction, RequestInfo, query } from '@src/utils/fetch_'
import { OneStateProvider } from '@src/utils/OneOpenAtATime'
import { Field, Form, Formik, useFormik, useFormikContext } from 'formik'
import HttpError from 'types/src/httpErrors_default'
import AddLog from '../component/forms/AddLog'
import LogEntry from '@src/component/LogEntry'

function Index_Page_Component() {
  setTitle('Home')

  const { data } = useQuery({
    queryKey: ['logs'],
    queryFn: query(find_log()),
  })

  if (!data) throw new Error('suspense option should be enabled ?')

  const logs = useMemo(() => {
    const s = segregate(
      data.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ),
      log => moment(log.createdAt).format('l'),
    )

    return s.map(subList => {
      if (!subList[0]) return { key: '', subList }
      const m = moment(subList[0].createdAt)
      const c = m.calendar()
      const f1s = !Number.parseInt(c) ? c : m.format('dddd')

      return {
        key: f1s.replace(/ (at \d).*/, '') + m.format(', MMM Do, YYYY'),
        subList,
      }
    })
  }, [data])

  return (
    <OneStateProvider>
      <div css={{ '&>*': tw`mt-4` }}>
        <AddLog />
        {logs.map((logs_, i) => (
          <Fragment key={logs_.key}>
            <div key={logs_.key}>
              <DividerWithLabel labelPosition={'left'}>
                {logs_.key}
              </DividerWithLabel>
            </div>
            {logs_.subList.map(log => (
              <LogEntry key={log._id} log={log} />
            ))}
          </Fragment>
        ))}
      </div>
    </OneStateProvider>
  )
}

export default Index_Page_Component
