import { useId, useState } from 'react'
import format from 'date-fns/format'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { truncate } from 'lodash'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import { deleteFavorite, postFavorite } from '../../redux/favoriteSlice'
import { fetchOneArticle } from '../../redux/articleSlice'

import styles from './article-header.module.scss'

function ArticleHeader({ article }) {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const userState = useSelector((state) => state.user)
  const favoritesArticles = useSelector((state) => state.favorite.favoritesArticles)
  const { title, favoritesCount, tagList, author, createdAt, description, slug } = article
  const isFavorite = favoritesArticles.find((art) => art === slug)

  const [like, setLike] = useState(favoritesCount)

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

  const onToggleFavorite = (e) => {
    e.preventDefault()

    if (!userState.userData) {
      setMessage(
        <span className={styles.error_message}>
          You must be logged in. Don’t have an account? <Link to="/sign-up">Sign Up</Link> Already have an account?{' '}
          <Link to="/sign-in">Sign In.</Link>
        </span>
      )
    } else if (isFavorite) {
      dispatch(deleteFavorite(slug))
      setLike(like - 1)
    } else {
      dispatch(postFavorite(slug))
      setLike(like + 1)
    }
  }

  const iconLikeStyle = cn({
    [styles.icon_like]: true,
    [styles.icon_like_active]: isFavorite && userState,
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left_info}>
          <div className={styles.title_left}>
            <Link to={`articles/${slug}`} className={styles.title} onClick={onClickArticle}>
              {truncate(title, { length: 30, separator: ' ', omission: '...' })}
            </Link>
            <button className={styles.btn_likes} type="button" onClick={(e) => onToggleFavorite(e)}>
              {isFavorite && <HeartFilled className={iconLikeStyle} />}
              {!isFavorite && <HeartOutlined className={iconLikeStyle} />}
            </button>
            <span className={styles.count_likes}>{like}</span>
          </div>
          {message}
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
