import { NavLink, useLocation } from 'react-router-dom'
import { Button } from '@chakra-ui/react'
import { Colors } from './Colors'
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div>
      <div className='h-[100px] justify-between w-full flex items-center'>
        <div className=''>
          <NavLink title='Solve Litigation' to={'/'}>
            <img style={{ width: '60px' }} src={logo} alt='Logo' />
          </NavLink>
        </div>
        <div className=''>
          <NavItems />
        </div>
      </div>
    </div>
  )
}

const NavItems = () => {
  return (
    <>
      <div className='flex gap-14 text-base items-center'>
        <NavItem title='Home Page' to={'/'}>
          Home
        </NavItem>
        <NavItem title='Service Page' to={'/services'}>
          Services
        </NavItem>
        <NavItem title='Contact Page' to={'/contact-us'}>
          Contact Us
        </NavItem>
        <NavItem title='Login Page' to={'/login'}>
          Login
        </NavItem>
        <NavItem title='Register Page' to={'/register'}>
          <StyledButton>Register</StyledButton>
        </NavItem>
      </div>
    </>
  )
}

const NavItem = ({ to, title, children }) => {
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <NavLink
      title={title}
      to={to}
      className={`hover:text-primary ${isActive ? 'text-primary' : ''}`}
    >
      {children}
    </NavLink>
  )
}

const StyledButton = ({ children }) => {
  const location = useLocation()
  const isActive = location.pathname === '/register'

  return (
    <Button
      variant='outline'
      borderColor={Colors.primary}
      borderWidth={2}
      color={isActive ? 'white' : Colors.primary}
      bgColor={isActive ? Colors.primary : 'transparent'}
      _hover={{
        bgColor: Colors.primary,
        color: 'white',
      }}
    >
      {children}
    </Button>
  )
}

export default Navbar
