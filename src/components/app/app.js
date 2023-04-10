import { Routes, Route } from 'react-router-dom'
// import { useSelector } from 'react-redux'

import HomePage from '../home-page/home-page'
import NotFoundPage from '../not-found-page/not-found-page'
import Layout from '../layout'
import ArticleBody from '../article-body'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="articles" element={<HomePage />} />
        <Route path="articles/:slug" element={<ArticleBody />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
