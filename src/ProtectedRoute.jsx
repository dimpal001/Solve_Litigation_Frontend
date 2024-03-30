import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from './UserContext'
import { useToast } from '@chakra-ui/react'

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserContext)
  const toast = useToast();

  if (user && sessionStorage.getItem('jwtToken')) {
    // console.log(children)
    return children
  } else {
    toast({
      title: `Unauthorized!`,
      description : 'Access Denied.',
      status: "error",
      duration: 1800,
      position: "top",
      isClosable: true,
    });
    return <Navigate to="/" />
  }
}

export default ProtectedRoute
