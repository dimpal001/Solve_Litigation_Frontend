import { Link } from 'react-router-dom'
import { SLButton } from '../../Components/Customs'

const StudyMaterialDashboard = () => {
  return (
    <div>
      <div className='px-7'>
        {/* <p className='text-3xl font-extrabold pb-5 text-center'>
          Study Materials
        </p> */}
        <div className='flex gap-5'>
          <Link to={'/admin-dashboard/manage-topic'}>
            <SLButton title={'Manage Topic & Chapter'} variant={'primary'} />
          </Link>
          <Link to={'/admin-dashboard/manage-QA'}>
            <SLButton title={'Manage QA'} variant={'primary'} />
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
