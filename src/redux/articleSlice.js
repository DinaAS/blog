import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchArticles = createAsyncThunk(
  'articles/getArticles',

  async (offset, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/?limit=5${offset ? `&offset=${offset}` : ''}`)

      if (!res.ok) {
        throw new Error(`Can't get articles`)
      }
      const data = res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const fetchOneArticle = createAsyncThunk(
  'articles/getOneArticle',

  async (slug, { rejectWithValue }) => {
    try {
      const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`)

      if (!res.ok) {
        throw new Error(`Can't get article`)
      }
      const data = res.json()
      return data
    } catch (error) {
      return rejectWithValue(error.res.data)
    }
  }
)

export const postArticle = createAsyncThunk(
  'articles/postArticle',

  async (data, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user.userData
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw new Error(err)
      })

      const resData = response.json()
      return resData
    } catch (error) {
      return rejectWithValue(error.response)
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',

  async (slug, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user.userData

      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
        },
      }).catch((err) => {
        throw new Error(err)
      })

      if (response.status === 403) {
        throw new Error(`You can't delete other people's articles`)
      }

      return true
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',

  async (articleData, { rejectWithValue, getState, dispatch }) => {
    const { article } = articleData
    const { slug } = articleData
    const jsonArticle = JSON.stringify({ article })

    try {
      const { token } = getState().user.userData

      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: jsonArticle,
      }).catch((err) => {
        throw new Error(err)
      })

      if (response.status === 403) {
        throw new Error(`You can't edit other people's articles`)
      }

      dispatch(fetchOneArticle(slug))

      const resData = response.json()
      return resData
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articlesList: [],
    article: null,
    // pagination : 1,
    postArticleSuccess: false,
    deleteArticleSuccess: false,
    updateArticleSuccess: false,
    loading: false,
    error: null,
  },
  reducers: {
    getArticle: (state, action) => {
      state.article = action.payload
    },
    clearPostSuccess: (state) => {
      return {
        ...state,
        postArticleSuccess: false,
      }
    },
    clearDeleteSuccess: (state) => {
      return {
        ...state,
        deleteArticleSuccess: false,
      }
    },
    clearUpdateSuccess: (state) => {
      return {
        ...state,
        updateArticleSuccess: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const data = action.payload.articles
        return {
          ...state,
          loading: false,
          articlesList: data,
          error: null,
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(fetchOneArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOneArticle.fulfilled, (state, action) => {
        const { article } = action.payload
        window.localStorage.setItem('article', JSON.stringify(article))
        return {
          ...state,
          article,
          loading: false,
          error: null,
        }
      })
      .addCase(fetchOneArticle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(postArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(postArticle.fulfilled, (state) => {
        return {
          ...state,
          postArticleSuccess: true,
          loading: false,
          error: null,
        }
      })
      .addCase(postArticle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        return {
          ...state,
          deleteArticleSuccess: true,
          loading: false,
          error: null,
        }
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        }
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        window.localStorage.setItem('article', JSON.stringify(action.payload))
        return {
          ...state,
          article: action.payload.article,
          updateArticleSuccess: true,
          loading: false,
          error: null,
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload.message,
        }
      })
  },
})

export const { clearPostSuccess, clearDeleteSuccess, clearUpdateSuccess, getArticle } = articlesSlice.actions

export default articlesSlice.reducer
