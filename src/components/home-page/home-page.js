import { Alert, Pagination } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../articles-list'
import { fetchArticles } from '../../redux/articleSlice'

import styles from './home-page.module.scss'

function HomePage() {
  const dispatch = useDispatch()
  const articles = useSelector((state) => state.articles.articlesList)
  const error = useSelector((state) => state.articles.error)
  const storagePagination = JSON.parse(window.localStorage.getItem('pagination'))

  useEffect(() => {
    if (storagePagination && storagePagination !== 0 && storagePagination !== 1) {
      const offset = (Number(storagePagination) - 1) * 5
      dispatch(fetchArticles(offset))
    } else {
      dispatch(fetchArticles())
    }
  }, [])

  function changePage(e) {
    window.localStorage.setItem('pagination', JSON.stringify(e))
    const offset = (Number(e) - 1) * 5
    dispatch(fetchArticles(offset))
  }

  const errorCatch = error ? (
    <Alert className={styles.error} message="Something went wrong" description={error} type="error" />
  ) : null

  const pagination =
    articles.length > 0 ? (
      <Pagination
        className={styles.pagination}
        defaultCurrent={1}
        current={storagePagination}
        total={50}
        onChange={(e) => changePage(e)}
      />
    ) : null

  return (
    <>
      {errorCatch}
      <ArticlesList articles={articles} />
      {pagination}
    </>
  )
}

export default HomePage
