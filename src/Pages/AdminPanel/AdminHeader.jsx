import { Divider } from '@chakra-ui/react'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import ProfileMenu from '../../Components/ProfileMenu'
import { FaUser } from 'react-icons/fa'

const AdminHeader = () => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleProfileSettingsClick = () => {
    setIsMenuOpen(false)
  }
  return (
    <div className='w-full'>
      <div>
        <div className='flex p-3 pb-5 justify-between'>
          <div className='flex items-baseline gap-3'>
            <FaUser />
            <p className='text-2xl'>{user.fullName}</p>
          </div>
          <div>
            <ProfileMenu
              user={user}
              handleProfileSettingsClick={handleProfileSettingsClick}
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </div>
        </div>
        <Divider />
      </div>
    </div>
  )
}

export default AdminHeader
