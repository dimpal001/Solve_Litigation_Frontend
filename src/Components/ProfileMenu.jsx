import { Avatar, Button, Menu, MenuButton, MenuList } from '@chakra-ui/react'
import { Colors } from './Colors'
import { MdPlace } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { PrimaryOutlineButton } from './Customs'

const ProfileMenu = ({
  user,
  handleProfileSettingsClick,
  handleLogout,
  isMenuOpen,
  setIsMenuOpen,
}) => {
  return (
    <div>
      <Menu
        size={'lg'}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Avatar bgColor={Colors.primary} size={'sm'} name={user.fullName} />
        </MenuButton>
        <MenuList>
          <div className='flex flex-col gap-3 p-4'>
            <div className='flex gap-3'>
              <Avatar name={user.fullName} size={'lg'} />
              <div className='flex flex-col justify-center'>
                <p className='text-lg font-extrabold'>{user.fullName}</p>
                <p className='text-sm flex'>
                  {' '}
                  <span>
                    <MdPlace color={Colors.primary} className='mt-[3px]' />
                  </span>
                  {user.state && user.state}, {user.district && user.district}
                </p>
              </div>
            </div>
            {user.userType === 'admin' && (
              <div>
                <p className='text-center'>
                  Login as{' '}
                  <span className='font-extrabold text-primary'>Admin</span>
                </p>
              </div>
            )}
            <div className='flex justify-center'>
              <Link
                onClick={handleProfileSettingsClick}
                className='w-full'
                to={
                  user.userType === 'admin'
                    ? '/admin-dashboard/profile-settings'
                    : '/profile-settings'
                }
                title='Profile Settings'
              >
                <Button borderRadius={'sm'} width={'100%'}>
                  Profile Settings
                </Button>
              </Link>
            </div>
            {user.userType !== 'admin' && (
              <div title='Logout' className='flex justify-center'>
                <PrimaryOutlineButton
                  onClick={handleLogout}
                  width={'100%'}
                  title={'Logout'}
                />
              </div>
            )}
          </div>
        </MenuList>
      </Menu>
    </div>
  )
}

export default ProfileMenu
