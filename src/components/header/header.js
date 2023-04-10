import { Link } from 'react-router-dom'

import styles from './header.module.scss'

function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link to="/">
          <h1>Realworld Blog</h1>
        </Link>
        <div className={styles.btn_group}>
          <button type="button">Sign In</button>
          <button type="button" className={styles.sign_up}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
