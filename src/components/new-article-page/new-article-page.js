import cn from 'classnames'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Spin } from 'antd'

import { postArticle } from '../../redux/articleSlice'
import actions from '../../redux/actions'

import styles from './new-article-page.module.scss'

function NewArticlePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const articlesState = useSelector((state) => state.articles)
  const isSuccess = useSelector((state) => state.articles.postArticleSuccess)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [{ tag: '' }],
    },
  })

  useEffect(() => {
    dispatch(actions.articles.clearPostSuccess())
  }, [])

  useEffect(() => {
    if (isSuccess && !articlesState.loading && !articlesState.error) {
      navigate('/')
    }
  }, [isSuccess])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

  const onSubmit = (data, e) => {
    e.preventDefault()
    const { title, description, body, tags } = data
    const tagList = tags.map((tag) => tag.tag)
    const article = {
      title,
      description,
      body,
      tagList,
    }
    dispatch(postArticle({ article }))
  }

  const addButton = (
    <button
      type="button"
      onClick={() => {
        append()
      }}
      className={styles.tag_add}
    >
      Add tag
    </button>
  )

  return (
    <div className={styles.container}>
      <span className={styles.title}>Create new article</span>
      {articlesState.loading && <Spin className={styles.spin} />}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          {...register('title', {
            required: 'The field is required',
          })}
          placeholder="Title"
          className={cn(errors?.title && styles.err)}
        />

        {errors?.title && (
          <div className={styles.error_message}>
            <p>{errors?.title?.message}</p>
          </div>
        )}

        <label htmlFor="description">Short description</label>
        <input
          {...register('description', {
            required: 'The field is required',
          })}
          placeholder="Title"
          className={cn(errors?.description && styles.err)}
        />

        {errors?.description && (
          <div className={styles.error_message}>
            <p>{errors?.description?.message}</p>
          </div>
        )}

        <label htmlFor="body">Text</label>
        <textarea
          {...register('body', {
            required: 'The field is required',
          })}
          placeholder="Text"
          className={cn({
            [styles.err]: errors?.body,
            [styles.body_input]: true,
          })}
        />

        {errors?.body && (
          <div className={styles.error_message}>
            <p>{errors?.body?.message}</p>
          </div>
        )}

        <div className={styles.tags_group}>
          <span>Tags</span>
          <ul className={styles.tags_list}>
            {fields.map((item, index) => {
              return (
                <li key={item.id}>
                  <input
                    {...register(`tags.${index}.tag`, {
                      required: true,
                      validate: (value) => value.trim().length > 0,
                      message: 'Tag cannot be empty',
                      minLength: 3,
                      maxLength: 10,
                    })}
                    placeholder="Tag"
                    className={styles.tag_input}
                  />

                  {errors?.tags && (
                    <div className={styles.error_message}>
                      <p>The tag cannot be empty and must be more than three characters, but no more than 10</p>
                    </div>
                  )}

                  <button type="button" onClick={() => remove(index)} className={styles.tag_delete}>
                    Delete
                  </button>
                  {index === fields.length - 1 && addButton}
                </li>
              )
            })}
            {fields.length <= 0 && addButton}
          </ul>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default NewArticlePage
