import { Outlet } from 'react-router-dom'

import Header from '../header'

import styles from './layout.module.scss'

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  )
}

export default Layout
