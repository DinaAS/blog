import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import actions from '../../redux/actions'

import styles from './header.module.scss'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    const user = window.localStorage.getItem('userData')
    if (!userData && JSON.parse(user)) {
      dispatch(actions.user.loginUser(JSON.parse(user)))
    }
  }, [])

  const handleOnLogOutClick = (e) => {
    e.preventDefault()
    dispatch(actions.user.logOutUser())
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem('favoritesUserArticles')
    navigate('/')
  }

  const inAuthContent = userData ? (
    <div className={styles.auth_group}>
      <Link to="new-article" className={styles.create_article}>
        Create article
      </Link>
      <Link to="profile" className={styles.user_name}>
        {userData.username}
      </Link>
      <Link to="profile">
        <img src={userData.image} alt="avatar" className={styles.user_image} />
      </Link>
      <Link to="/" className={styles.log_out_btn} onClick={handleOnLogOutClick}>
        Log Out
      </Link>
    </div>
  ) : null

  const logOutContent = !userData ? (
    <div className={styles.out_group}>
      <Link to="sign-in">Sign In</Link>
      <Link to="sign-up" className={styles.sign_up}>
        Sign Up
      </Link>
    </div>
  ) : null

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/">
          <h1>Realworld Blog</h1>
        </Link>
        {inAuthContent}
        {logOutContent}
      </div>
    </div>
  )
}

export default Header
