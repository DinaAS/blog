import cn from 'classnames'
import { useForm, useFieldArray } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from 'antd'

import { updateArticle } from '../../redux/articleSlice'
import actions from '../../redux/actions'

import styles from './edit-article-page.module.scss'

function EditArticlePage() {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const article = useSelector((state) => state.articles.article)
  const articlesState = useSelector((state) => state.articles)
  const [titleValue, setTitleValue] = useState(article.title)
  const [descriptionValue, setDescriptionValue] = useState(article.description)
  const [bodyValue, setBodyValue] = useState(article.body)
  const isSuccess = useSelector((state) => state.articles.updateArticleSuccess)

  useEffect(() => {
    dispatch(actions.articles.clearUpdateSuccess())
  }, [])

  useEffect(() => {
    if (isSuccess) {
      navigate(`/articles/${slug}`)
    }
  }, [isSuccess])

  const oldTagList = article.tagList
  const newList = oldTagList.map((tag) => {
    return {
      tag: `${tag}`,
    }
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tags: [...newList],
    },
  })

  const onSubmit = (data, e) => {
    e.preventDefault()
    const { title, description, body, tags } = data
    const tagList = tags.map((tag) => tag.tag)
    const articleData = {
      article: {
        title,
        description,
        body,
        tagList,
      },
      slug,
    }
    dispatch(updateArticle(articleData))
  }

  const onChangeTitle = (e) => {
    const { value } = e.target
    setTitleValue(value)
  }

  const onChangeDescription = (e) => {
    const { value } = e.target
    setDescriptionValue(value)
  }

  const onChangeBody = (e) => {
    const { value } = e.target
    setBodyValue(value)
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  })

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

  const catchError = articlesState.error ? <Alert type="error" message={articlesState.error} banner /> : null

  return (
    <div className={styles.container}>
      <span className={styles.title}>Edit article</span>
      {catchError}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label>
        <input
          {...register('title', {
            required: 'The field is required',
          })}
          placeholder="Title"
          value={titleValue}
          onChange={onChangeTitle}
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
          onChange={onChangeDescription}
          value={descriptionValue}
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
          value={bodyValue}
          onChange={onChangeBody}
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
                      minLength: {
                        value: 3,
                        message: 'Your tag needs to be at least 3 characters.',
                      },
                      maxLength: {
                        value: 10,
                        message: 'Tag too long. Use less than 10 characters',
                      },
                    })}
                    placeholder="Tag"
                    className={styles.tag_input}
                  />

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

export default EditArticlePage
