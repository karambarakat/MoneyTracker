import 'twin.macro'
// import 'ui/src/tailwind.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouteObject,
  Routes,
} from 'react-router-dom'
import AppShellLayout from '@src/routes/_Layout'
import MantineSetUp from '@src/components/MantineSetUp'
import { Provider as Redux } from 'react-redux'
import { store } from '@src/redux/index'
import GoogleCallback from '@src/routes/auth/GoogleCallback'
import { Routes as ModalRoutes } from '@src/components/ReactRoute/index'

import Auth from '@src/routes/auth/Auth'
import Profile, { ProfileIndex } from '@src/routes/profile/profile'
import ProfileUpdate from '@src/components/Forms/Profile_update'
import Profile_SetPassword from '@src/components/Forms/Profile_SetPassword'
import Profile_ChangePassword from '@src/components/Forms/Profile_changePassword'
// import { Page as MetaContext } from '@src/components/ReactRoute/index'
import MetaContext from '@src/routes/_MetaContext'
import Loading from '@src/routes/_Loading'

import Notification from '@src/components/Notifications'
import { NavigateController } from '@src/redux/actions/app/navigate.action'
import GlobalStyles from 'ui/src/GlobalStyles'
import { ColorModeProvider } from 'ui/src/colorMode/provider'
import QueryClientProvider from './routes/_QueryClient'

const AddLog = lazy(() => import('@src/components/Forms/Log_add'))
const EditLog = lazy(() => import('@src/components/Forms/Log_edit'))
const AddCategory = lazy(() => import('@src/components/Forms/Category_add'))
const EditCategory = lazy(() => import('@src/components/Forms/Category_edit'))

const Index = lazy(() => import('@src/routes/index'))
const Categories = lazy(() => import('@src/routes/categories'))
const Charts = lazy(() => import('@src/routes/charts'))
const About = lazy(() => import('@src/routes/about'))
const Export = lazy(() => import('@src/routes/export'))
const Setting = lazy(() => import('@src/routes/setting'))
const RateUs = lazy(() => import('@src/routes/rateUs'))
const E404 = lazy(() => import('@src/routes/_E404'))

import { ErrorBoundary } from 'react-error-boundary'
import Error from './routes/_Error'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Signup from './component/forms/Signup'
import Login from './component/forms/Login'

function App() {
  return (
    // <MantineSetUp>
    <ColorModeProvider>
      <MetaContext>
        <QueryClientProvider>
          <BrowserRouter>
            <Suspense fallback={<Loading />}>
              <ErrorBoundary FallbackComponent={Error}>
                {/* <ModalRoutes> */}
                <Routes>
                  <Route element={<AppShellLayout />}>
                    <Route index element={<Index />} />
                    <Route path="categories" element={<Categories />} />

                    {/* <Route path="charts" element={<Charts />} /> */}
                  </Route>
                  {/* // todo : next */}
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
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MetaContext>
    </ColorModeProvider>
    // </MantineSetUp>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)
