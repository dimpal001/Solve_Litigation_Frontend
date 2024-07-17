import { useNavigate } from 'react-router-dom'
import { SLButton } from '../../Components/Customs'
import { enqueueSnackbar } from 'notistack'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { api } from '../../Components/Apis'

const LegalAdvice = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  const userString = encodeURIComponent(JSON.stringify(user))
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleLogout = () => {
    if (user) {
      setUser(null)
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('user')
      navigate('/')
      enqueueSnackbar('Session Expired! Please Login again', {
        variant: 'error',
      })
    }
  }

  useEffect(() => {
    handleCheckAuth()
  }, [])

  const handleCheckAuth = async () => {
    try {
      await axios.get(`${api}/api/solve_litigation/check-auth`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
    }
  }

  const redirectToChat = () => {
    if (
      user &&
      user.userType === 'guest' &&
      user.selectedService.includes('legalAdvice')
    ) {
      // const url = `http://localhost:5174/?token=${token}&user=${userString}`
      // const url = `http://192.168.1.24:5174/?token=${token}&user=${userString}`
      const url = `https://chat.solvelitigation.com/?token=${token}&user=${userString}`
      window.open(url, '_blank')
    } else {
      navigate('/login')
    }
  }

  return (
    <div className='container mx-auto min-h-[calc(100vh-150px)] flex items-center lg:px-[250px] px-4 py-8'>
      <div>
        <h1 className='text-4xl text-primary font-bold mb-4'>Features</h1>
        <p className='text-lg mb-6 text-justify'>
          Self tailored to your specific situation and navigate the complexities
          of the legal system with confidence to merged with system of paperies
          system of judiciary. Now available to your doorstep, spend less time
          to focus on craft your arguments.
        </p>
        <div>
          <SLButton
            onClick={redirectToChat}
            title={'Chat with Lawyer'}
            variant={'primary'}
          />
        </div>
      </div>
    </div>
  )
}

export default LegalAdvice
