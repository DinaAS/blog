import { useSelector } from 'react-redux'
import { useLocation, Navigate } from 'react-router-dom'

function RequireAuth({ children }) {
  const location = useLocation()
  const auth = useSelector((state) => state.user.userData)

  if (!auth) {
    return <Navigate to="/sign-up" state={{ from: location }} />
  }
  return children
}

export default RequireAuth
