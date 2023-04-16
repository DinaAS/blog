import { Outlet } from 'react-router-dom'

import Header from '../header'

import styles from './layout.module.scss'

function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
