import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchOneArticle = createAsyncThunk(
  'article/getOneArticle',

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

const oneArticleSlice = createSlice({
  name: 'article',
  initialState: {
    article: {},
    slug: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOneArticle.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchOneArticle.fulfilled, (state, action) => {
        const { article } = action.payload
        const { slug } = action.payload.article
        return {
          article,
          slug,
          loading: false,
          error: false,
        }
      })
      .addCase(fetchOneArticle.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
  },
})

export default oneArticleSlice.reducer
