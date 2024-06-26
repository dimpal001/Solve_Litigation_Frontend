import { Link } from 'react-router-dom'
import { SLButton } from '../../Components/Customs'

const StudyMaterialDashboard = () => {
  return (
    <div>
      <div className='px-7'>
        <p className='text-3xl font-extrabold pb-5 text-center'>
          Study Materials
        </p>
        <div className='flex justify-center gap-5'>
          <Link to={'/admin-dashboard/manage-topic'}>
            <SLButton title={'Manage Topic'} variant={'primary'} />
          </Link>
          <Link to={'/admin-dashboard/create-material'}>
            <SLButton title={'Create Material'} variant={'primary'} />
          </Link>
          <Link to={'/admin-dashboard/view-material'}>
            <SLButton title={'View Material'} variant={'primary'} />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudyMaterialDashboard
