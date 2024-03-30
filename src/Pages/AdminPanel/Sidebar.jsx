import { Link, useLocation } from 'react-router-dom'
import { LinkButton, PrimaryButton } from '../../Components/Customs'
import { Divider } from '@chakra-ui/react'
import { Colors } from '../../Components/Colors'
import ConfirmLogout from '../../Components/ConfirmLogout'
import { useState } from 'react'
import Logo from '../../assets/logo.svg'

const Sidebar = () => {
  const location = useLocation()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const isPageActive = (pathname) => {
    return location.pathname === `/admin-dashboard/${pathname}`
  }

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  return (
    <div>
      <div className='flex flex-col h-full fixed bg-slate-900 p-3 w-60 text-white'>
        <div className='flex flex-col items-center py-5 justify-center'>
          {/* <p className='font-extrabold text-2xl'>Solve Litigation</p> */}
          <img src={Logo} width={'50px'} alt='' />
          <p className='text-sm text-primary font-extrabold'>Admin Panel</p>
        </div>
        <Divider />
        <div className='flex-1 pt-5 gap-y-4 flex flex-col'>
          <Link to={'/admin-dashboard/'}>
            <LinkButton
              title={'Dashboard'}
              width={'100%'}
              bgColor={isPageActive('') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/review-citation'}>
            <LinkButton
              title={'Review Citation'}
              width={'100%'}
              bgColor={isPageActive('review-citation') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/create-citation'}>
            <LinkButton
              title={'Create Citation'}
              width={'100%'}
              bgColor={isPageActive('create-citation') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/edit-citation'}>
            <LinkButton
              title={'Edit Citation'}
              width={'100%'}
              bgColor={isPageActive('edit-citation') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/create-staff'}>
            <LinkButton
              title={'Create Staff'}
              width={'100%'}
              bgColor={isPageActive('create-staff') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/citation-activity'}>
            <LinkButton
              title={'Citation Activity'}
              width={'100%'}
              bgColor={isPageActive('citation-activity') ? Colors.primary : ''}
            />
          </Link>
        </div>
        <div>
          <PrimaryButton
            width={'100%'}
            onClick={handleLogout}
            title={'Logout'}
          />
        </div>
        {isLogoutModalOpen && (
          <ConfirmLogout
            isOpen={true}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Sidebar
