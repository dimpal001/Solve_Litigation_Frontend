import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Logout = ({ title }) => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  setUser(null)
  sessionStorage.removeItem('token')
  sessionStorage.removeItem('user')
  navigate('/')
  toast({
    title: title,
    status: 'error',
    duration: 4000,
    isClosable: true,
    position: 'top',
  })
  return null
}

export default Logout
