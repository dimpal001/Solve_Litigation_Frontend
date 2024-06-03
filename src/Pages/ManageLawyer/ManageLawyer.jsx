import { SLButton } from '../../Components/Customs'
import { Link } from 'react-router-dom'

const ManageLawyer = () => {
  return (
    <div>
      <p className='text-center text-4xl p-3 font-bold'>Manage Lawyers</p>
      <div className='flex justify-center gap-3 pt-5'>
        <Link to={'/admin-dashboard/lawyer-list'}>
          <SLButton title={'Lawyer List'} variant={'primary'} />
        </Link>
        <Link to={'/admin-dashboard/create-lawyer'}>
          <SLButton title={'New Lawyer'} variant={'primary'} />
        </Link>
      </div>
    </div>
  )
}

export default ManageLawyer
