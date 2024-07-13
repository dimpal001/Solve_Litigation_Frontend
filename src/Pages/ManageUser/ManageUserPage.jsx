import { Link } from 'react-router-dom'
import { SLButton } from '../../Components/Customs'

const ManageUserPage = () => {
  return (
    <div data-aos='fade-up' className='px-7'>
      {/* <p className='text-3xl font-extrabold pb-5 text-center'>Manage User</p> */}
      <div className='flex gap-5'>
        <Link to={'/admin-dashboard/manage-users/users-list'}>
          <SLButton variant={'outline'} title={'User List'} />
        </Link>
        <Link to={'/admin-dashboard/manage-users/create-staff'}>
          <SLButton variant={'outline'} title={'Create Staff'} />
        </Link>
      </div>
    </div>
  )
}

export default ManageUserPage
