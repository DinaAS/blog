import { logOutUser, loginUser, clearSuccess } from './userSlice'
import { getArticle, clearPostSuccess, clearDeleteSuccess, clearUpdateSuccess } from './articleSlice'

const actions = {
  user: {
    logOutUser,
    loginUser,
    clearSuccess,
  },
  articles: {
    getArticle,
    clearPostSuccess,
    clearDeleteSuccess,
    clearUpdateSuccess,
  },
}

export default actions
