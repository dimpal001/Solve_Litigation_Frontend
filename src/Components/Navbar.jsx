import { Link, NavLink, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { useContext, useRef, useState } from 'react'
import { UserContext } from '../UserContext'
import ProfileMenu from './ProfileMenu'
import ConfirmLogout from './ConfirmLogout'
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { CgMenuRight } from 'react-icons/cg'
import { Colors } from './Colors'
import { SLButton } from './Customs'

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useContext(UserContext)
  const btnRef = useRef()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    setIsLogoutModalOpen(true)
  }
  return (
    <div>
      <div
        className={`h-[100px] bg-white ${
          user && 'border-b'
        } px-5 lg:px-32 justify-between w-full flex items-center`}
      >
        <div className=''>
          <NavLink title='Solve Litigation' to={'/'}>
            <img style={{ width: '60px' }} src={logo} alt='Logo' />
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
              <SLButton variant={'primary'} title={'Login'} />
            </Link>
          ) : (
            <SLButton
              variant={'error'}
              onClick={handleLogout}
              title={'Logout'}
            />
          )}
          <CgMenuRight
            size={35}
            color={Colors.primary}
            ref={btnRef}
            onClick={onOpen}
          />
          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />

              <DrawerBody>
                <div className='py-10'>
                  <NavItems onClose={onClose} />
                </div>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>

        <div className='max-md:hidden'>
          <NavItems />
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
      <div className='flex max-md:flex-col gap-5 lg:gap-14 text-base items-center'>
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
        {user &&
          user.userType === 'guest' &&
          user.selectedService.includes('legalAdvice') && (
            <NavItem onClick={onClose} title='Home Page' to={'/legal-advice'}>
              Legal Advice
            </NavItem>
          )}
        {user &&
          user.userType === 'guest' &&
          user.selectedService.includes('studyResources') && (
            <NavItem onClick={onClose} title='Home Page' to={'/study-material'}>
              Study Material
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
