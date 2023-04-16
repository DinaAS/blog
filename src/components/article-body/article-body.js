import { useSelector } from 'react-redux'
import { Spin } from 'antd'
import Markdown from 'markdown-to-jsx'

import ArticleHeader from '../article-header'

import styles from './article-body.module.scss'

function ArticleBody() {
  const loading = useSelector((state) => state.oneArticle.loading)
  const article = useSelector((state) => state.oneArticle.article)

  return (
    <div className={styles.container}>
      {loading && <Spin className={styles.loading} tip="Loading" />}
      {!loading && <ArticleHeader article={article} />}
      {!loading && <div className={styles.body_wrapper}>{article.body && <Markdown>{article.body}</Markdown>}</div>}
    </div>
  )
}

export default ArticleBody
