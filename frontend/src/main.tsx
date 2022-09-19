import React, { PropsWithChildren, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { lazy, Suspense } from 'react'
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import MainLayout from '@routes/_Layout'
import MantineSetUp from '@components/MantineSetUp'
import Authenticate from '@routes/_Auth'
import { Provider as Redux } from 'react-redux'
import { store } from '@redux/index'
import GoogleCallback from '@routes/auth/GoogleCallback'
import { Routes as ModalRoutes } from '@components/ReactRouter'
import Auth from '@routes/auth/Auth'
import Profile, { ProfileIndex } from '@routes/profile/profile'
import ProfileUpdate from '@components/Forms/Profile_update'
import Profile_SetPassword from '@components/Forms/Profile_SetPassword'
import Profile_ChangePassword from '@components/Forms/Profile_changePassword'

const Index = lazy(() => import('@routes/index'))
const Categories = lazy(() => import('@routes/categories'))
// @ts-ignore
const Charts = lazy(() => import('@routes/Charts'))
const AddLog = lazy(() => import('@components/Forms/Log_add'))
const EditLog = lazy(() => import('@components/Forms/Log_edit'))
const AddCategory = lazy(() => import('@components/Forms/Category_add'))
const EditCategory = lazy(() => import('@components/Forms/Category_edit'))
const About = lazy(() => import('@routes/about'))
const E404 = lazy(() => import('@routes/_E404'))

function App() {
  return (
    <MantineSetUp>
      <Redux store={store}>
        <BrowserRouter>
          <Suspense fallback={<>waiting</>}>
            <ModalRoutes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="charts" element={<Charts />} />
                <Route path="categories" element={<Categories />} />
              </Route>

              <Route path="about" element={<About />} />
              <Route path="addLog" element={<AddLog />} />
              <Route path="editLog/:id" element={<EditLog />} />
              <Route path="addCategory" element={<AddCategory />} />
              <Route path="editCategory/:id" element={<EditCategory />} />

              <Route path="profile" element={<Profile />}>
                <Route index element={<ProfileIndex />} />
                <Route path="update" element={<ProfileUpdate />} />
                <Route path="setPassword" element={<Profile_SetPassword />} />
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
            </ModalRoutes>
          </Suspense>
        </BrowserRouter>
      </Redux>
    </MantineSetUp>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
