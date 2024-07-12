import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import ProfileMenu from '../../Components/ProfileMenu'
import LeftArrow from '../../assets/leftArrow.svg'
import RightArrow from '../../assets/rightArrow.svg'
import UserImg from '../../assets/profile.svg'

const AdminHeader = ({ showSidebar, setShowSidebar }) => {
  const { user } = useContext(UserContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleProfileSettingsClick = () => {
    setIsMenuOpen(false)
  }
  return (
    <div className='w-full'>
      <div>
        <div className='flex p-3 pb-5 justify-between'>
          <div className='flex items-center gap-3'>
            <img
              title={showSidebar ? 'Close Sidebar' : 'Open Sidebar'}
              src={showSidebar ? LeftArrow : RightArrow}
              onClick={() => setShowSidebar(!showSidebar)}
              className='w-7 cursor-pointer'
              alt=''
            />
            <img src={UserImg} className='w-10' alt='' />
            <p className='text-2xl font-semibold'>{user.fullName}</p>
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
        <div className='h-[1px] w-full bg-zinc-400' />
      </div>
    </div>
  )
}

export default AdminHeader
