import { Alert } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import ArticlesList from '../articles-list'
import { fetchArticles } from '../../redux/articleSlice'

import styles from './home-page.module.scss'

function HomePage() {
  const dispatch = useDispatch()
  const error = useSelector((state) => state.articles.error)

  useEffect(() => {
    dispatch(fetchArticles())
  }, [])

  const errorCatch = error ? (
    <Alert className={styles.error} message="Something went wrong" description={error} type="error" />
  ) : null

  return (
    <>
      {errorCatch}
      <ArticlesList />
    </>
  )
}

export default HomePage
