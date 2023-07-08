import 'twin.macro'
import React from 'react'
import ReactDOM from 'react-dom'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import MantineSetUp from '@src/components/MantineSetUp'
// import { Provider as Redux } from 'react-redux'
// import { store } from '@src/redux/index'
// import GoogleCallback from '@src/routes/auth/GoogleCallback'
// import { Routes as ModalRoutes } from '@src/components/ReactRoute/index'

// import Profile, { ProfileIndex } from '@src/routes/profile/profile'
// import ProfileUpdate from '@src/components/Forms/Profile_update'
// import Profile_SetPassword from '@src/components/Forms/Profile_SetPassword'
// import Profile_ChangePassword from '@src/components/Forms/Profile_changePassword'
// import { Page as MetaContext } from '@src/components/ReactRoute/index'

// import Notification from '@src/components/Notifications'
// import { NavigateController } from '@src/redux/actions/app/navigate.action'

// const AddLog = lazy(() => import('@src/components/Forms/Log_add'))
// const EditLog = lazy(() => import('@src/components/Forms/Log_edit'))
// const AddCategory = lazy(() => import('@src/components/Forms/Category_add'))
// const EditCategory = lazy(() => import('@src/components/Forms/Category_edit'))

// const Charts = lazy(() => import('@src/routes/charts'))
// const About = lazy(() => import('@src/routes/about'))
// const Export = lazy(() => import('@src/routes/export'))
// const Setting = lazy(() => import('@src/routes/setting'))
// const RateUs = lazy(() => import('@src/routes/rateUs'))
// const E404 = lazy(() => import('@src/routes/_E404'))

import MetaContext from '@src/routes/_MetaContext'
import GlobalStyles from 'ui/src/GlobalStyles'
import { ColorModeProvider } from 'ui/src/colorMode/provider'
import AppShellLayout from '@src/routes/_Layout'

import Loading from '@src/routes/_Loading'
import Auth from '@src/routes/auth/Auth'

const Categories = lazy(() => import('@src/routes/categories'))
const Index = lazy(() => import('@src/routes/index'))

import { ErrorBoundary } from 'react-error-boundary'
import ErrorComponent from './routes/_Error'
import { ReactQueryDevtoolsProduction } from '@src/utils/ReactQueryDevTool'
import Signup from './components/forms/Signup'
import Login from './components/forms/Login'
import Profile from './routes/profile'
import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useProfile } from './utils/localProfile'
import { WithChildren } from 'ui/src/utils/WithChildren'

function Protected({ children }: WithChildren) {
  const profile = useProfile()

  if (!profile) return <Navigate to={'/auth/login'} state={{ goBackTo: '' }} />

  return <>{children}</>
}

function App() {
  return (
    <ColorModeProvider>
      <MetaContext>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={ErrorComponent}>
                <Routes>
                  <Route
                    element={
                      <Protected>
                        <AppShellLayout />
                      </Protected>
                    }
                  >
                    <Route index element={<Index />} />
                    <Route path="categories" element={<Categories />} />

                    <Route path="profile" element={<Profile />} />
                    {/* <Route path="charts" element={<Charts />} /> */}
                  </Route>

                  <Route path="auth" element={<Auth />}>
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<Signup />} />
                  </Route>

                  {/* <Route path="about" element={<About />} /> */}
                  {/* <Route path="export" element={<Export />} /> */}
                  {/* <Route path="setting" element={<Setting />} /> */}
                  {/* <Route path="rate-us" element={<RateUs />} /> */}
                  {/* <Route path="addLog" element={<AddLog />} /> */}
                  {/* <Route path="editLog/:id" element={<EditLog />} /> */}
                  {/* <Route path="addCategory" element={<AddCategory />} /> */}
                  {/* <Route path="editCategory/:id" element={<EditCategory />} /> */}

                  {/* <Route path="profile" element={<Profile />}>
                  <Route index element={<ProfileIndex />} />
                  <Route path="update" element={<ProfileUpdate />} />
                  <Route path="setPassword" element={<Profile_SetPassword />} />
                  <Route
                    path="changePassword"
                    element={<Profile_ChangePassword />}
                  />
                </Route> */}

                  {/* <Route path="/auth" element={<Auth />} /> */}
                  {/* <Route
                  path="/auth/google/callback"
                  element={<GoogleCallback />}
                /> */}

                  {/* <Route path={'*'} element={<E404 />} /> */}
                  {/* </ModalRoutes> */}
                  {/* <Notification /> */}
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <ReactQueryDevtoolsProduction />
        </QueryClientProvider>
      </MetaContext>
    </ColorModeProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
