import { useForm } from 'react-hook-form'
import cn from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

import { updateUser } from '../../redux/userSlice'

import styles from './edit-profile-page.module.scss'

function EditProfilePage() {
  const dispatch = useDispatch()
  const { userData } = useSelector((state) => state.user)
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: userData.username,
      email: userData.email,
      newPassword: '',
    },
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

  const onSubmit = async (data, e) => {
    e.preventDefault()
    const { username, email, newPassword, avatar } = data
    let user
    if (newPassword === '' || newPassword === ' ') {
      user = {
        email,
        username,
        image: avatar,
      }
    } else {
      user = {
        email,
        password: newPassword,
        username,
        image: avatar,
      }
    }
    dispatch(await updateUser({ user }))
  }

  return (
    <div className={styles.container}>
      <span className={styles.title}>Edit Profile</span>
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
          placeholder="Username"
          className={cn(errors?.username && styles.err)}
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

        <label htmlFor="newPassword">New password</label>
        <input
          {...register('newPassword', {
            minLength: {
              value: 6,
              message: 'Your password needs to be at least 6 characters.',
            },
            maxLength: {
              value: 40,
              message: 'Your username must be no more than 40 characters.',
            },
          })}
          placeholder="New password"
          className={cn(errors?.new_password && styles.err)}
        />

        {errors?.newPassword && (
          <div className={styles.error_message}>
            <p>{errors?.newPassword?.message || 'Please write correct password'}</p>
          </div>
        )}

        <label htmlFor="avatar">Avatar image (url)</label>
        <input
          {...register('avatar', {
            // eslint-disable-next-line no-useless-escape
            pattern: /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?([jpg | png])$/,
          })}
          placeholder="Avatar image"
          className={cn(errors?.avatar && styles.err)}
        />

        {errors?.avatar && (
          <div className={styles.error_message}>
            <p>{errors?.avatar?.message || 'Please select correct image'}</p>
          </div>
        )}
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default EditProfilePage
