import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { fetchAuthorizationUser } from '../../redux/userSlice'

import styles from './login-page.module.scss'

function LoginPage() {
  const userState = useSelector((state) => state.user)
  const userData = useSelector((state) => state.user.userData)
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fromPage = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (userData && !userState.loading && !userState.error) {
      window.localStorage.setItem('userData', JSON.stringify(userData))
      window.localStorage.setItem('favoritesUserArticles', JSON.stringify(['test']))
      navigate(fromPage)
    }
  }, [userData])

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    )

  function handleEmailValidation(email) {
    const isValid = isValidEmail(email)
    return isValid
  }

  const onSubmit = (data, e) => {
    e.preventDefault()
    const user = {
      email: data.email,
      password: data.password,
    }

    dispatch(fetchAuthorizationUser({ user }))
  }

  const errorMessage = userState.error ? (
    <div className={styles.error_message}>
      <p>{userState.error}</p>
    </div>
  ) : null

  return (
    <div className={styles.container}>
      <span className={styles.title}>Sign In</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email address</label>
        <input
          {...register('email', {
            required: 'The field is required',
            validate: handleEmailValidation,
          })}
          className={cn(errors?.email && styles.err)}
          placeholder="Email address"
        />

        {errors?.email && (
          <div className={styles.error_message}>
            <p>{errors?.email?.message || 'Please write correct email'}</p>
          </div>
        )}

        <label htmlFor="password">Password</label>
        <input
          {...register('password', {
            required: 'The field is required',
          })}
          type="password"
          className={cn(errors?.password && styles.err)}
          placeholder="Password"
        />

        {errors?.password && (
          <div className={styles.error_message}>
            <p>{errors?.password?.message}</p>
          </div>
        )}
        {errorMessage}

        <button type="submit">Login</button>
      </form>
      <span className={styles.description}>
        Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
      </span>
    </div>
  )
}

export default LoginPage
