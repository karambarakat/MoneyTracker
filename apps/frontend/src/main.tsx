import 'twin.macro'
// import 'ui/src/tailwind.css'
import React from 'react'
import ReactDOM from 'react-dom'

import { lazy, Suspense } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import MainLayout from '@src/routes/_Layout'
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
import { Page } from '@src/components/ReactRoute/index'

import Notification from '@src/components/Notifications'
import { NavigateController } from '@src/redux/actions/app/navigate.action'
import GlobalStyles from 'ui/src/GlobalStyles'
import { ColorModeProvider } from 'ui/src/colorMode/provider'

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

function App() {
  return (
    <MantineSetUp>
      <ColorModeProvider mode="light">
        <Redux store={store}>
          <BrowserRouter>
            {/* <NavigateController /> */}
            <Suspense fallback={<>waiting</>}>
              <ModalRoutes>
                <Route element={<Page />}>
                  <Route element={<MainLayout />}>
                    <Route index element={<Index />} />
                    <Route path="charts" element={<Charts />} />
                    <Route path="categories" element={<Categories />} />
                  </Route>

                  <Route path="about" element={<About />} />
                  <Route path="export" element={<Export />} />
                  <Route path="setting" element={<Setting />} />
                  <Route path="rate-us" element={<RateUs />} />
                  <Route path="addLog" element={<AddLog />} />
                  <Route path="editLog/:id" element={<EditLog />} />
                  <Route path="addCategory" element={<AddCategory />} />
                  <Route path="editCategory/:id" element={<EditCategory />} />

                  <Route path="profile" element={<Profile />}>
                    <Route index element={<ProfileIndex />} />
                    <Route path="update" element={<ProfileUpdate />} />
                    <Route
                      path="setPassword"
                      element={<Profile_SetPassword />}
                    />
                    <Route
                      path="changePassword"
                      element={<Profile_ChangePassword />}
                    />
                  </Route>

                  <Route path="/auth" element={<Auth />} />
                  <Route
                    path="/auth/google/callback"
                    element={<GoogleCallback />}
                  />

                  <Route path={'*'} element={<E404 />} />
                </Route>
              </ModalRoutes>
              <Notification />
            </Suspense>
          </BrowserRouter>
        </Redux>
      </ColorModeProvider>
    </MantineSetUp>
  )
}

ReactDOM.render(
  <React.StrictMode>
    {/* <Test /> */}
    <App />
    <GlobalStyles />
  </React.StrictMode>,
  document.getElementById('root'),
)
