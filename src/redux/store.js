import { configureStore } from '@reduxjs/toolkit'

import articlesReducer from './articleSlice'
import oneArticleReducer from './oneArticleSlice'

export default configureStore({
  reducer: {
    articles: articlesReducer,
    oneArticle: oneArticleReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articlesApi.middleware),
})
