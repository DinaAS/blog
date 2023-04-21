import cn from 'classnames'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import { registerNewUser } from '../../redux/userSlice'
import actions from '../../redux/actions'

import styles from './signup-page.module.scss'

function SignupPage() {
  const userState = useSelector((state) => state.user)
  const isSuccess = useSelector((state) => state.user.successRegistration)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
  })

  useEffect(() => {
    dispatch(actions.user.clearSuccess())
  }, [])

  useEffect(() => {
    if (isSuccess && !userState.loading && !userState.error) {
      navigate('/sign-in')
    }
  }, [isSuccess])

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
    const { username, email, password } = data

    const user = {
      username,
      email,
      password,
    }
    dispatch(registerNewUser({ user }))
  }

  const errorMessage = userState.error ? (
    <div className={styles.error_message}>
      <p>{userState.error}</p>
    </div>
  ) : null

  const checkSubscribe = cn({
    [styles.checkbox]: true,
    [styles.checked]: watch('subscribe'),
  })

  return (
    <div className={styles.container}>
      <span className={styles.title}>Create new account</span>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          {...register('username', {
            required: 'The field is required',
            minLength: {
              value: 3,
              message: 'Your username needs to be at least 3 characters.',
            },
            maxLength: {
              value: 20,
              message: 'Your username must be no more than 20 characters.',
            },
          })}
          className={cn(errors?.username && styles.err)}
          placeholder="Username"
        />

        {errors?.username && (
          <div className={styles.error_message}>
            <p>{errors?.username?.message || 'Please write correct username'}</p>
          </div>
        )}

        <label htmlFor="email">Email address</label>
        <input
          {...register('email', {
            required: 'The field is required',
            validate: handleEmailValidation,
          })}
          placeholder="Email address"
          className={cn(errors?.email && styles.err)}
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
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your username must be no more than 40 characters.',
            },
          })}
          placeholder="Password"
          className={cn(errors?.password && styles.err)}
        />

        {errors?.password && (
          <div className={styles.error_message}>
            <p>{errors?.password?.message || 'Please write correct password'}</p>
          </div>
        )}

        <label htmlFor="confirm_password">Repeat Password</label>
        <input
          {...register('confirm_password', {
            required: 'The field is required',
            validate: (val) => {
              if (watch('password') !== val) {
                return 'Passwords must match'
              }
              return undefined
            },
          })}
          placeholder="Repeat Password"
          className={cn(errors?.confirm_password && styles.err)}
        />

        {errors?.confirm_password && (
          <div className={styles.error_message}>
            <p>{errors?.confirm_password?.message || 'Please write correct password'}</p>
          </div>
        )}

        <hr />
        <div className={styles.subscribe}>
          <input
            {...register('subscribe', {
              validate: (val) => {
                if (!val) {
                  return 'You must be agree to the processing of information'
                }
                return undefined
              },
            })}
            type="checkbox"
            className={checkSubscribe}
          />
          <label htmlFor="subscribe">I agree to the processing of my personal information</label>
        </div>
        {errors?.subscribe && (
          <div className={styles.error_message}>
            <p>{errors?.subscribe?.message}</p>
          </div>
        )}
        {errorMessage}
        <button type="submit">Create</button>
      </form>
      <span className={styles.desrcription}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </span>
    </div>
  )
}

export default SignupPage
