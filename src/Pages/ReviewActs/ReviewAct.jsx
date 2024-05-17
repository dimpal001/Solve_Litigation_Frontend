import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { Avatar, SLButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import {
  InputGroup,
  InputLeftElement,
  Badge,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const ReviewAct = () => {
  const { setUser } = useContext(UserContext)
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
        <p className='text-3xl text-center font-extrabold'>Review Acts</p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between'>
              <div className='flex gap-3'>
                <SLButton
                  className={`${
                    actType === 'pending'
                      ? 'bg-primary text-white border border-primary'
                      : 'bg-white text-primary border border-primary'
                  }`}
                  title={'Pending Judgements'}
                  onClick={() => handleChangeActType('pending')}
                />
                <SLButton
                  className={`${
                    actType === 'approved'
                      ? 'bg-primary text-white border border-primary'
                      : 'bg-white text-primary border border-primary'
                  }`}
                  title={'Approved Judgements'}
                  onClick={() => handleChangeActType('approved')}
                />
              </div>
              <div>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FaSearch color={Colors.primary} />
                  </InputLeftElement>
                  <Input
                    rounded={'sm'}
                    type='text'
                    placeholder='Search here...'
                  />
                  <InputRightElement>
                    <FaArrowRight color={Colors.primary} />
                  </InputRightElement>
                </InputGroup>
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
            <Badge
              bgColor={data.status === 'pending' ? 'orange.300' : 'green.400'}
              color={'white'}
              px={2}
            >
              {data.status}
            </Badge>
            <Badge bgColor={Colors.primary} color={'white'} px={2}>
              {data.type}
            </Badge>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ReviewAct
