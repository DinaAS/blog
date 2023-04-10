import { useId } from 'react'
import format from 'date-fns/format'
import { HeartOutlined } from '@ant-design/icons'
import { truncate } from 'lodash'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { fetchOneArticle } from '../../redux/oneArticleSlice'

import styles from './article-header.module.scss'

function ArticleHeader({ article }) {
  const dispatch = useDispatch()
  const { title, favoritesCount, tagList, author, createdAt, description, slug } = article

  const date = format(new Date(createdAt), 'MMMM d, yyyy')

  const tagsGroup = tagList.map((tag) => {
    const keyButton = useId()
    return (
      <li key={keyButton}>
        <button className={styles.btn_tag} type="button">
          {truncate(tag, { length: 15, omission: '...' })}
        </button>
      </li>
    )
  })

  const onClickArticle = () => {
    dispatch(fetchOneArticle(slug))
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left_info}>
          <div className={styles.title_left}>
            <Link to={`articles/${slug}`} className={styles.title} onClick={onClickArticle}>
              {truncate(title, { length: 30, separator: ' ', omission: '...' })}
            </Link>
            <button className={styles.btn_likes} type="button">
              <HeartOutlined className={styles.icon_like} />
            </button>
            <span className={styles.count_likes}>{favoritesCount}</span>
          </div>
          <ul className={styles.tags_group}>{tagsGroup}</ul>
        </div>
        <div className={styles.right_info}>
          <div style={{ marginRight: '12px' }}>
            <span className={styles.author_name}>{author.username}</span>
            <span className={styles.date}>{date}</span>
          </div>
          <img className={styles.avatar} src={author.image} alt="avatar" />
        </div>
      </div>
      <div className={styles.description}>
        <span>{truncate(description, { length: 230, separator: ' ', omission: '...' })} </span>
      </div>
    </div>
  )
}

export default ArticleHeader
