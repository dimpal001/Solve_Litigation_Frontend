import { navigate } from 'react-router-dom'

export const handleLogout = (setUser, toast) => {
  setUser(null)
  sessionStorage.removeItem('jwtToken')
  sessionStorage.removeItem('user')
  navigate('/')
  toast({
    title: 'Logged out successfully',
    status: 'success',
    duration: 3000,
    isClosable: true,
    position: 'top',
  })
}
