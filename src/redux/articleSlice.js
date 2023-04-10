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
      return rejectWithValue(error.message)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        const data = action.payload.articles
        return {
          ...state,
          loading: false,
          articles: data,
        }
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        return {
          ...state,
          error: action.error,
          loading: false,
        }
      })
  },
})

export default articlesSlice.reducer
