import { MdPlace } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { SLButton } from './Customs'
import { useRef, useEffect } from 'react'
import { Colors } from './Colors'

const ProfileMenu = ({
  user,
  handleProfileSettingsClick,
  handleLogout,
  isMenuOpen,
  setIsMenuOpen,
  onClick,
}) => {
  const menuRef = useRef()
  onClick

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [setIsMenuOpen])

  return (
    <div className='relative' ref={menuRef}>
      <Link to={'/profile-settings'} className='md:hidden'>
        <button
          className='flex items-center'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className='w-10 text-white flex justify-center items-center rounded-full font-bold h-10 bg-primary'>
            {user.fullName.charAt(0)}
          </div>
        </button>
      </Link>
      {isMenuOpen && (
        <div className='absolute right-0 mt-4 w-64 p-3 border-primary border rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
          <div className='flex flex-col gap-3 p-4'>
            <div className='flex items-center gap-3'>
              <div className='w-10 text-white flex justify-center items-center rounded-full font-bold h-10 bg-primary'>
                {user.fullName.charAt(0)}
              </div>
              <div className='flex flex-col justify-center'>
                <p className='text-lg font-extrabold'>{user.fullName}</p>
                <p className='text-sm flex'>
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
                <SLButton
                  title={'Profile Settings'}
                  variant={'secondary'}
                  width={'full'}
                />
              </Link>
            </div>
            {user.userType !== 'admin' && (
              <div title='Logout' className='flex justify-center'>
                <SLButton
                  variant={'error'}
                  onClick={handleLogout}
                  width={'100%'}
                  title={'Logout'}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
