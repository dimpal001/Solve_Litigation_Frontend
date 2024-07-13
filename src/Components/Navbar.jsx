import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import ProfileMenu from './ProfileMenu'
import ConfirmLogout from './ConfirmLogout'
import { CgMenuRight } from 'react-icons/cg'
import { Colors } from './Colors'
import { SLButton } from './Customs'

const Navbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false)
  const { user } = useContext(UserContext)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen)
  }

  return (
    <div>
      <div
        className={`h-[100px] bg-white ${
          user && 'border-b'
        } px-5 lg:px-32 justify-between w-full flex items-center`}
      >
        <div className=''>
          <NavLink
            title='Solve Litigation'
            onClick={() => setIsNavbarOpen(false)}
            to={'/'}
          >
            <img style={{ width: '80px' }} src={logo} alt='Logo' />
          </NavLink>
        </div>

        {isLogoutModalOpen && (
          <ConfirmLogout
            isOpen={true}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        )}
        <div className='md:hidden flex gap-5'>
          {!user ? (
            <Link to={'/login'}>
              <SLButton
                className={'text-base py-[5px]'}
                variant={'primary'}
                title={'Login'}
                onClick={() => setIsNavbarOpen(false)}
              />
            </Link>
          ) : (
            <SLButton
              className={'text-base py-[5px]'}
              variant={'error'}
              onClick={handleLogout}
              title={'Logout'}
            />
          )}
          <CgMenuRight
            size={35}
            color={Colors.primary}
            onClick={toggleNavbar}
          />
        </div>

        <div className='max-md:hidden'>
          <NavItems />
        </div>
      </div>
      <div
        className={`md:hidden transition-all duration-1000 delay-500 ${
          isNavbarOpen
            ? 'h-full overflow-hidden px-5 pt-5 transition-all delay-500 duration-1000'
            : 'h-0 hidden transition-all duration-1000 delay-500'
        }`}
      >
        <div className='py-3 rounded-sm bg-gray-200'>
          <NavItems onClose={() => setIsNavbarOpen(false)} />
        </div>
      </div>
    </div>
  )
}

const NavItems = ({ onClose }) => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    console.log('Logout call')
    setIsLogoutModalOpen(true)
  }

  const handleProfileSettingsClick = () => {
    setIsMenuOpen(false)
  }

  const redirectToChat = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const userString = encodeURIComponent(JSON.stringify(user))

    const url = `https://chat.solvelitigation.com/?token=${token}&user=${userString}`
    // const url = `http://localhost:5174/?token=${token}&user=${userString}`
    window.open(url, '_blank')
  }

  return (
    <>
      <div className='flex max-md:flex-col gap-5 lg:gap-8 text-base items-center'>
        <NavItem onClick={onClose} title='Home Page' to={'/'}>
          Home
        </NavItem>
        {user && user.userType === 'lawyer' && (
          <p className='cursor-pointer' onClick={redirectToChat}>
            Chats
          </p>
        )}
        {user &&
          user.isVerified &&
          user.userType === 'guest' &&
          user.selectedService.includes('judgements') && (
            <NavItem onClick={onClose} title='Home Page' to={'/citations'}>
              Judgements
            </NavItem>
          )}
        {/* {user &&
          user.userType === 'guest' &&
          user.selectedService.includes('legalAdvice') && (
            <NavItem onClick={onClose} title='Legal Advice' to={'/legal-advice'}>
              Legal Advice
            </NavItem>
          )} */}
        <NavItem onClick={onClose} title='Legal Advice' to={'/legal-advice'}>
          Legal Advice
        </NavItem>
        {user &&
          user.userType === 'guest' &&
          user.selectedService.includes('studyResources') && (
            <NavItem onClick={onClose} title='Home Page' to={'/study-material'}>
              Study Material
            </NavItem>
          )}
        {user && (
          <NavItem
            onClick={onClose}
            title='Prepare Argument'
            to={'/prepare-argument'}
          >
            Prepare Argument
          </NavItem>
        )}
        <NavItem onClick={onClose} title='Service Page' to={'/services'}>
          Services
        </NavItem>

        <NavItem onClick={onClose} title='Contact Page' to={'/contact-us'}>
          Contact
        </NavItem>
        {!user ? (
          <>
            <NavItem onClick={onClose} title='Login Page' to={'/login'}>
              Login
            </NavItem>
            <NavItem onClick={onClose} title='Register Page' to={'/register'}>
              <SLButton variant={'primary'} title={'Register'} />
            </NavItem>
          </>
        ) : (
          <ProfileMenu
            user={user}
            handleProfileSettingsClick={handleProfileSettingsClick}
            handleLogout={handleLogout}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        )}
      </div>
      <div>
        {isLogoutModalOpen && (
          <ConfirmLogout
            isOpen={true}
            onClose={() => setIsLogoutModalOpen(false)}
          />
        )}
      </div>
    </>
  )
}

const NavItem = ({ to, title, children, onClick }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <NavLink
      title={title}
      to={to}
      className={`hover:text-primary ${isActive ? 'text-primary' : ''}`}
      onClick={onClick}
    >
      {children}
    </NavLink>
  )
}

export default Navbar
