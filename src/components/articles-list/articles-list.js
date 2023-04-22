import { useSelector } from 'react-redux'
import { createId } from '@paralleldrive/cuid2'
import { Spin } from 'antd'
// import { useEffect, useState } from 'react'

import ArticleHeader from '../article-header'
// import { fetchArticles } from '../../redux/articleSlice'

import styles from './articles-list.module.scss'

function ArticlesList({ articles }) {
  const loading = useSelector((state) => state.articles.loading)

  return (
    <>
      {loading && <Spin className={styles.loading} tip="Loading" />}
      {!loading && (
        <ul className={styles.list}>
          {articles.map((article) => {
            const idKey = createId()
            return <ArticleHeader key={idKey} article={article} />
          })}
        </ul>
      )}
    </>
  )
}

export default ArticlesList
