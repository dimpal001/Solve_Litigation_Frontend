import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
import { PrimaryButton } from '../../Components/Customs'
import { useContext, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { UserContext } from '../../UserContext'

const Layout = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    window.document.title = 'Admin Panel - Solve Litigation'
  }, [])

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    toast({
      title: 'Logout Successfull',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }
  return (
    <div>
      <div className='flex max-md:hidden flex-row h-screen'>
        <Sidebar />
        <div className='p-4 lg:pl-60 w-full'>
          <div className='w-full'>
            <AdminHeader />
          </div>
          <div className='pt-5 px-6'>{<Outlet />}</div>
        </div>
      </div>
      <div className='h-screen lg:hidden flex flex-col gap-5 items-center justify-center'>
        <p className='text-center'>Mobile view is not available</p>
        <PrimaryButton title={'Logout'} onClick={handleLogout} />
      </div>
    </div>
  )
}

export default Layout
