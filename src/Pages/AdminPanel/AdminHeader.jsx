import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import ProfileMenu from '../../Components/ProfileMenu'
import ConfirmLogout from '../../Components/ConfirmLogout'
import { FiMenu } from 'react-icons/fi'
import { useLocation } from 'react-router-dom'

const AdminHeader = ({ showSidebar, setShowSidebar }) => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [pageName, setPageName] = useState('')

  const location = useLocation()

  useEffect(() => {
    if (
      location.pathname === '/admin-dashboard/' ||
      location.pathname === '/admin-dashboard'
    ) {
      setPageName('Dashboard')
    }
    if (location.pathname === '/admin-dashboard/review-citation') {
      setPageName('Review Judgments')
    }
    if (location.pathname.includes('/admin-dashboard/detailed-citation')) {
      setPageName('Detailed Citation')
    }
    if (location.pathname === '/admin-dashboard/review-acts') {
      setPageName('Review Acts')
    }
    if (location.pathname === '/admin-dashboard/create-citation') {
      setPageName('Create Citation')
    }
    if (location.pathname === '/admin-dashboard/study-materials') {
      setPageName('Study Materials')
    }
    if (location.pathname === '/admin-dashboard/manage-topic') {
      setPageName('Manage Topics')
    }
    if (location.pathname === '/admin-dashboard/create-material') {
      setPageName('Create Study Material')
    }
    if (location.pathname === '/admin-dashboard/view-material') {
      setPageName('View Materials')
    }
    if (location.pathname === '/admin-dashboard/manage-users') {
      setPageName('Manage Users')
    }
    if (location.pathname === '/admin-dashboard/manage-users/users-list') {
      setPageName('Users List')
    }
    if (location.pathname === '/admin-dashboard/manage-users/create-staff') {
      setPageName('Create Staff')
    }
    if (location.pathname === '/admin-dashboard/all-notifications') {
      setPageName('Manage Notifications')
    }
    if (location.pathname === '/admin-dashboard/contact-forms') {
      setPageName('Contact Forms')
    }
  }, [location.pathname])

  const handleProfileSettingsClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className='w-full'>
      <div>
        <div className='flex p-3 pb-5 justify-between'>
          <div className='flex items-center gap-3'>
            <FiMenu
              size={35}
              className='cursor-pointer hover:text-primary'
              onClick={() => setShowSidebar(!showSidebar)}
            />
            <p className='text-2xl font-bold'>{pageName}</p>
          </div>
          <div>
            <ProfileMenu
              user={user}
              handleProfileSettingsClick={handleProfileSettingsClick}
              isMenuOpen={isMenuOpen}
              handleLogout={() => setIsLogoutModalOpen(true)}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
        <div className='h-[1px] w-full bg-zinc-400' />
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

export default AdminHeader
