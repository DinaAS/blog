import { useDispatch, useSelector } from 'react-redux'
import { createId } from '@paralleldrive/cuid2'
import { Spin, Pagination } from 'antd'

import ArticleHeader from '../article-header'
import { fetchArticles } from '../../redux/articleSlice'

import styles from './articles-list.module.scss'

function ArticlesList() {
  const articles = useSelector((state) => state.articles.articlesList)
  const loading = useSelector((state) => state.articles.loading)

  const dispatch = useDispatch()

  async function changePage(e) {
    const offset = (Number(e) - 1) * 5
    dispatch(await fetchArticles(offset))
  }

  const pagination =
    articles.length > 0 ? (
      <Pagination className={styles.pagination} defaultCurrent={1} total={50} onChange={(e) => changePage(e)} />
    ) : null

  return (
    <>
      {loading && <Spin className={styles.loading} tip="Loading" />}
      <ul className={styles.list}>
        {articles.map((article) => {
          const idKey = createId()
          return <ArticleHeader key={idKey} article={article} />
        })}
      </ul>
      {pagination}
    </>
  )
}

export default ArticlesList
