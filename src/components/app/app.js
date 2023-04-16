import { Routes, Route, Navigate } from 'react-router-dom'

import HomePage from '../home-page/home-page'
import NotFoundPage from '../not-found-page/not-found-page'
import Layout from '../layout'
import ArticleBody from '../article-body'
import SignupPage from '../signup-page'
import LoginPage from '../login-page'
import RequireAuth from '../../hoc/requierAuth'
import EditProfilePage from '../edit-profile-page'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="articles" element={<Navigate to="/" />} />
        <Route path="articles/:slug" element={<ArticleBody />} />
        <Route path="sign-in" element={<LoginPage />} />
        <Route path="sign-up" element={<SignupPage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <EditProfilePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
