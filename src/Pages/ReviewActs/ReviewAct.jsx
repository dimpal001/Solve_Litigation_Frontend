import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { Avatar, CustomInput, SLButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const ReviewAct = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [pendingActs, setpendingActs] = useState([])
  const [approvedActs, setapprovedActs] = useState([])
  const [filterActs, setfilterActs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [actType, setactType] = useState('pending')

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchPendingActs = async () => {
    try {
      setfilterActs([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/act/pending-acts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setpendingActs(response.data.pendingActs)
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.log(error)
    }
  }

  const fetchApprovedActs = async () => {
    try {
      setfilterActs([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/act/approved-acts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setapprovedActs(response.data.approvedActs)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeActType = (type) => {
    console.log(type)
    setactType(type)
    if (type === 'pending') {
      fetchPendingActs()
      setapprovedActs([])
    } else {
      fetchApprovedActs()
      setpendingActs([])
    }
  }

  useEffect(() => {
    fetchPendingActs()
  }, [])

  return (
    <div>
      <div>
        {/* <p className='text-3xl text-center font-extrabold'>Review Acts</p> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between'>
              <div className='flex gap-3'>
                <div className='relative'>
                  <SLButton
                    className={`${
                      actType === 'pending'
                        ? 'bg-primary text-white border border-primary'
                        : 'bg-white text-primary border border-primary'
                    }`}
                    title={'Pending Acts'}
                    onClick={() => handleChangeActType('pending')}
                  />
                  {pendingActs && pendingActs.length > 0 && (
                    <span className='absolute -top-3 -right-2 text-sm bg-orange-700 text-white font-extrabold w-8 h-8 flex justify-center items-center border rounded-full'>
                      {pendingActs && pendingActs.length}
                    </span>
                  )}
                </div>

                {user && user.userType === 'admin' && (
                  <div className='relative'>
                    <SLButton
                      className={`${
                        actType === 'approved'
                          ? 'bg-primary text-white border border-primary'
                          : 'bg-white text-primary border border-primary'
                      }`}
                      title={'Approved Acts'}
                      onClick={() => handleChangeActType('approved')}
                    />
                    {approvedActs && approvedActs.length > 0 && (
                      <span className='absolute -top-3 -right-2 text-sm bg-green-700 text-white font-extrabold w-8 h-8 flex justify-center items-center border rounded-full'>
                        {approvedActs && approvedActs.length}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div>
                <div>
                  <CustomInput type='text' placeholder='Search here...' />
                </div>
              </div>
            </div>
            {actType === 'pending' && pendingActs.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            {actType === 'approved' && approvedActs.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            <div className='grid grid-cols-2 gap-5'>
              {filterActs &&
                filterActs.map((data, index) => (
                  <div key={index}>
                    <Act data={data} />
                  </div>
                ))}
              {pendingActs &&
                pendingActs.map((data, index) => (
                  <div key={index}>
                    <Act data={data} />
                  </div>
                ))}
              {approvedActs &&
                approvedActs.map((data, index) => (
                  <div key={index}>
                    <Act data={data} />
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const Act = ({ data }) => {
  return (
    <div>
      <div className='p-2 max-sm:px-5 z-[1] border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
        <Link to={`/admin-dashboard/detailed-citation/${data._id}`}>
          <div className='flex items-center'>
            <div>
              <Avatar />
            </div>
            <div className='px-2'>
              <p className='text-base capitalize'>{data.institutionName}</p>
              <p className='text-xs'>
                Last modified :{' '}
                {new Date(data.lastModifiedDate).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div>
            <p className='text-primary py-1'>{data.title}</p>
          </div>
          <div className='flex gap-2 py-1'>
            <div
              className={`${
                data.status === 'pending' ? 'bg-orange-500' : 'bg-green-600'
              } text-sm capitalize font-bold py-1 px-2 text-white rounded-sm`}
            >
              {data.status}
            </div>
            <div
              className={`bg-primary text-sm capitalize text-white font-bold py-1 px-2 rounded-sm`}
            >
              {data.type}
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ReviewAct
