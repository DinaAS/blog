import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const postFavorite = createAsyncThunk(
  'favorite/postFavorite',

  async (slug, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user.userData

      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).catch((err) => {
        throw new Error(err)
      })
      const resData = response.json()

      return resData
    } catch (err) {
      return rejectWithValue(err.respons)
    }
  }
)

export const deleteFavorite = createAsyncThunk(
  'favorite/deleteFavorite',

  async (slug, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().user.userData

      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json;charset=utf-8',
        },
      }).catch((err) => {
        throw new Error(err)
      })
      const resData = response.json()

      return resData
    } catch (err) {
      return rejectWithValue(err.respons)
    }
  }
)

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    favoritesArticles: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFavorite.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(postFavorite.fulfilled, (state, action) => {
        const newFavorite = action.meta.arg
        const oldArr = JSON.parse(window.localStorage.getItem('favoritesUserArticles'))
        const newList = [...oldArr, newFavorite]
        window.localStorage.setItem('favoritesUserArticles', JSON.stringify(newList))
        return {
          ...state,
          favoritesArticles: newList,
          loading: false,
          error: null,
        }
      })
      .addCase(postFavorite.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(deleteFavorite.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(deleteFavorite.fulfilled, (state, action) => {
        const favoritesArticles = JSON.parse(window.localStorage.getItem('favoritesUserArticles'))
        const newList = favoritesArticles.filter((slug) => slug !== action.meta.arg)
        window.localStorage.setItem('favoritesUserArticles', JSON.stringify(newList))
        return {
          ...state,
          favoritesArticles: newList,
          loading: false,
          error: null,
        }
      })
      .addCase(deleteFavorite.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
  },
})

export default favoriteSlice.reducer
