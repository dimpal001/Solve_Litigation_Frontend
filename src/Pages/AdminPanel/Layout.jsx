import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader'
import { SLButton } from '../../Components/Customs'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const Layout = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [showSidebar, setShowSidebar] = useState(true)

  useEffect(() => {
    window.document.title = 'Admin Panel - Solve Litigation'
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Logout Successfull', { variant: 'success' })
  }
  return (
    <div>
      <div className='flex max-md:hidden flex-row h-screen'>
        {showSidebar && <Sidebar />}
        <div className={`p-4 ${showSidebar && 'lg:pl-60'} w-full`}>
          <div className='w-full'>
            <AdminHeader
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
            />
          </div>
          <div className='pt-5 px-6'>{<Outlet />}</div>
        </div>
      </div>
      <div className='h-screen lg:hidden flex flex-col gap-5 items-center justify-center'>
        <p className='text-center'>Mobile view is not available</p>
        <SLButton title={'Logout'} onClick={handleLogout} />
      </div>
    </div>
  )
}

export default Layout
