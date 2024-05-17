import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { enqueueSnackbar } from 'notistack'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)

  if (user && localStorage.getItem('jwtToken')) {
    // console.log(children)
    return children
  } else {
    enqueueSnackbar('Unauthorized! Access denied', { variant: 'error' })
    return <Navigate to='/' />
  }
}

export default ProtectedRoute
