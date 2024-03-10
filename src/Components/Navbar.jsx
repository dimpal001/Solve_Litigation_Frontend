import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Colors } from './Colors'
import logo from '../assets/logo.svg'

const Navbar = () => {
  return (
    <div>
      <div className='h-[100px] justify-between w-full flex items-center'>
        <div className=''>
          <Link to={'/'}>
            <img style={{ width: '60px' }} src={logo} alt='Logo' />
          </Link>
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
      <div className='flex gap-14 items-center'>
        <Link to={'/'}>Home</Link>
        <Link to={'/services'}>Services</Link>
        <Link to={'/contact-us'}>Contact Us</Link>
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>
          <Button
            variant='outline'
            borderColor={Colors.primary}
            borderWidth={2}
            color={Colors.primary}
            _hover={{
              bgColor: Colors.primary,
              color: 'white',
            }}
          >
            Register
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Navbar
