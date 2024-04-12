import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import { UserContext } from '../UserContext'

const Logout = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  const logoutUser = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/login')
    toast({
      title: 'Session expired',
      description: 'Please login again',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  return logoutUser
}

export default Logout
