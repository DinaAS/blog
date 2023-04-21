import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import avatar from '../images/avatar.png'

export const registerNewUser = createAsyncThunk(
  'user/registerUser',

  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw new Error(err)
      })

      const result = response.json()

      return result
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const fetchAuthorizationUser = createAsyncThunk(
  'user/authUser',

  async (data, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      }).catch((err) => {
        throw new Error(err)
      })
      const resData = response.json()
      return resData
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const updateUser = createAsyncThunk('user/updateUser', async (data, { rejectWithValue, getState }) => {
  try {
    const { token } = getState().user.userData

    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
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
  } catch (err) {
    return rejectWithValue(err.response)
  }
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    successRegistration: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearSuccess: (state) => {
      return {
        ...state,
        successRegistration: false,
      }
    },
    loginUser: (state, action) => {
      state.userData = action.payload
    },
    logOutUser: (state) => {
      state.userData = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(registerNewUser.fulfilled, (state, action) => {
        const errors = 'errors'
        if (errors in action.payload) {
          const err = JSON.stringify(action.payload.errors)
          return {
            ...state,
            loading: false,
            error: err,
          }
        }
        return {
          ...state,
          loading: false,
          successRegistration: true,
          error: null,
        }
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(fetchAuthorizationUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(fetchAuthorizationUser.fulfilled, (state, action) => {
        const errors = 'errors'
        if (errors in action.payload) {
          const err = JSON.stringify(action.payload.errors)
          return {
            ...state,
            loading: false,
            error: err,
          }
        }
        const { user } = action.payload
        const img = user.image ? user.image : avatar
        const userData = {
          username: user.username,
          email: user.email,
          token: user.token,
          image: img,
        }
        return {
          ...state,
          userData,
          loading: false,
          error: null,
        }
      })
      .addCase(fetchAuthorizationUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
      .addCase(updateUser.pending, (state) => {
        return {
          ...state,
          loading: true,
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const errors = 'errors'
        if (errors in action.payload) {
          const err = JSON.stringify(action.payload.errors)
          return {
            ...state,
            loading: false,
            error: err,
          }
        }
        const { user } = action.payload
        const img = user.image ? user.image : avatar
        const userData = {
          username: user.username,
          email: user.email,
          token: user.token,
          image: img,
        }
        return {
          ...state,
          userData,
          loading: false,
          error: null,
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: action.payload,
        }
      })
  },
})

export const { logOutUser, loginUser, clearSuccess } = userSlice.actions

export default userSlice.reducer
