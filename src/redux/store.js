import { configureStore, combineReducers } from '@reduxjs/toolkit'

import articlesReducer from './articleSlice'
import userReducer from './userSlice'
import favoriteReducer from './favoriteSlice'

const rootReducer = combineReducers({
  articles: articlesReducer,
  user: userReducer,
  favorite: favoriteReducer,
})

const store = configureStore({ reducer: rootReducer })
export default store
