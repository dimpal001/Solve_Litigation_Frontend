import { Link, useLocation } from 'react-router-dom'
import { LinkButton, SLButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import ConfirmLogout from '../../Components/ConfirmLogout'
import { useContext, useState } from 'react'
import Logo from '../../assets/logo.svg'
import { UserContext } from '../../UserContext'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useContext(UserContext)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const isPageActive = (pathname) => {
    return location.pathname === `/admin-dashboard/${pathname}`
  }

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  return (
    <div>
      <div className='flex flex-col h-full fixed z-40 bg-slate-900 p-3 w-60 text-white'>
        <div className='flex flex-col items-center py-5 justify-center'>
          <img src={Logo} width={'50px'} alt='' />
          <p className='text-sm capitalize text-primary font-extrabold'>
            {user.userType} Panel
          </p>
        </div>
        <div className='h-[1px] w-full bg-zinc-400' />
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
              title={'Review Judgments'}
              width={'100%'}
              bgColor={isPageActive('review-citation') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/review-acts'}>
            <LinkButton
              title={'Review Acts'}
              width={'100%'}
              bgColor={isPageActive('review-acts') ? Colors.primary : ''}
            />
          </Link>
          <Link to={'/admin-dashboard/create-citation'}>
            <LinkButton
              title={'Create Judgment / Act'}
              width={'100%'}
              bgColor={isPageActive('create-citation') ? Colors.primary : ''}
            />
          </Link>
          {/* <Link to={'/admin-dashboard/edit-citation'}>
            <LinkButton
              title={'Edit Citation'}
              width={'100%'}
              bgColor={isPageActive('edit-citation') ? Colors.primary : ''}
            />
          </Link> */}
          <Link to={'/admin-dashboard/study-materials'}>
            <LinkButton
              title={'Study Materials'}
              width={'100%'}
              bgColor={isPageActive('study-materials') ? Colors.primary : ''}
            />
          </Link>
          {user.userType === 'admin' && (
            <Link to={'/admin-dashboard/manage-users'}>
              <LinkButton
                title={'Manage Users'}
                width={'100%'}
                bgColor={isPageActive('manage-users') ? Colors.primary : ''}
              />
            </Link>
          )}

          {/* {user.userType === 'admin' && (
            <Link to={'/admin-dashboard/legal-advice-requests'}>
              <LinkButton
                title={'Legal Advice Requests'}
                width={'100%'}
                bgColor={
                  isPageActive('legal-advice-requests') ? Colors.primary : ''
                }
              />
            </Link>
          )} */}

          {user.userType === 'admin' && (
            <Link to={'/admin-dashboard/all-notifications'}>
              <LinkButton
                title={'Manage Notifications'}
                width={'100%'}
                bgColor={
                  isPageActive('all-notifications') ? Colors.primary : ''
                }
              />
            </Link>
          )}

          {user.userType === 'admin' && (
            <Link to={'/admin-dashboard/contact-forms'}>
              <LinkButton
                title={'Contact Forms'}
                width={'100%'}
                bgColor={isPageActive('contact-forms') ? Colors.primary : ''}
              />
            </Link>
          )}
          {/* <Link to={'/admin-dashboard/manage-lawyer'}>
            <LinkButton
              title={'Manage Lawyer'}
              width={'100%'}
              bgColor={isPageActive('manage-lawyer') ? Colors.primary : ''}
            />
          </Link> */}
        </div>
        <div>
          <SLButton
            width={'100%'}
            variant={'error'}
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
