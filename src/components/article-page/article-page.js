import { useDispatch, useSelector } from 'react-redux'
import { Spin, Popconfirm, Alert } from 'antd'
import Markdown from 'markdown-to-jsx'
import { useNavigate, Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import ArticleHeader from '../article-header'
import { deleteArticle } from '../../redux/articleSlice'
import actions from '../../redux/actions'

import styles from './article-page.module.scss'

function ArticlePage() {
  const { slug } = useParams()

  const loading = useSelector((state) => state.articles.loading)
  const articleData = useSelector((state) => state.articles.article)
  const articlesState = useSelector((state) => state.articles)
  const userState = useSelector((state) => state.user)
  const isSuccess = useSelector((state) => state.articles.deleteArticleSuccess)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.articles.clearDeleteSuccess())
    const article = window.localStorage.getItem('article')
    if (!articleData && JSON.parse(article)) {
      dispatch(actions.articles.getArticle(JSON.parse(article)))
    }
  }, [])

  useEffect(() => {
    if (isSuccess && !articlesState.loading && !articlesState.error) {
      navigate('/')
    }
  }, [isSuccess])

  const onClickDelete = (e) => {
    e.preventDefault()
    dispatch(deleteArticle(slug))
  }

  const header = !loading && articleData ? <ArticleHeader article={articleData} /> : null
  const btnGroup =
    !loading && articleData && userState.userData ? (
      <div>
        <Popconfirm
          title="Are you sure to delete this article?"
          placement="right"
          onConfirm={onClickDelete}
          onCancel={() => {}}
          okText="Yes"
          cancelText="No"
        >
          <button type="button" className={styles.btn_delete}>
            Delete
          </button>
        </Popconfirm>
        <Link to={`/articles/${slug}/edit`} className={styles.btn_edit}>
          Edit
        </Link>
      </div>
    ) : null

  const body =
    !loading && articleData ? (
      <div className={styles.body_wrapper}>{articleData.body && <Markdown>{articleData.body}</Markdown>}</div>
    ) : null

  const catchError = articlesState.error ? <Alert type="error" message={articlesState.error} banner /> : null

  return (
    <div className={styles.container}>
      {loading && <Spin className={styles.loading} tip="Loading" />}
      {header}
      {catchError}
      {btnGroup}
      {body}
    </div>
  )
}

export default ArticlePage
