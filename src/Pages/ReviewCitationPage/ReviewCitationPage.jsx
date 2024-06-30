import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { Avatar, SLButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {
  InputGroup,
  InputLeftElement,
  Badge,
  Input,
  InputRightElement,
} from '@chakra-ui/react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import FilterCitationModal from './FilterCitationModal'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const ReviewCitationPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [pendingjudgements, setpendingjudgements] = useState([])
  const [approvedjudgements, setapprovedjudgements] = useState([])
  const [filterjudgements, setfilterjudgements] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [judgementType, setjudgementType] = useState('pending')
  const [date, setDate] = useState(new Date())
  const [searching, setSearching] = useState(false)

  const onChange = (date) => {
    setDate(date)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchPendingjudgements = async () => {
    try {
      setfilterjudgements([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/pending-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setpendingjudgements(response.data.pendingCitations)
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.log(error)
    }
  }

  const fetchApprovedjudgements = async () => {
    try {
      setfilterjudgements([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/approved-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setapprovedjudgements(response.data.approvedCitations)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const searchByDate = async () => {
    try {
      setSearching(true)
      setfilterjudgements([])
      setapprovedjudgements([])
      setpendingjudgements([])
      const token = localStorage.getItem('token')
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate() + 1
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/search-by-date/${year}/${month}/${day}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setjudgementType('')
      setfilterjudgements(response.data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    } finally {
      setSearching(false)
    }
  }

  const handleChangejudgementType = (type) => {
    console.log(type)
    setjudgementType(type)
    if (type === 'pending') {
      fetchPendingjudgements()
      setapprovedjudgements([])
    } else {
      fetchApprovedjudgements()
      setpendingjudgements([])
    }
  }

  useEffect(() => {
    fetchPendingjudgements()
  }, [])

  return (
    <div>
      <div>
        <p className='text-3xl text-center font-extrabold'>Review Judgements</p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between gap-3'>
              <div className='lg:w-3/4'>
                <div className='flex gap-3'>
                  <SLButton
                    className={`${
                      judgementType === 'pending'
                        ? 'bg-primary text-white border border-primary'
                        : 'bg-white text-primary border border-primary'
                    }`}
                    title={'Pending Judgements'}
                    onClick={() => handleChangejudgementType('pending')}
                  />
                  <SLButton
                    className={`${
                      judgementType === 'approved'
                        ? 'bg-primary text-white border border-primary'
                        : 'bg-white text-primary border border-primary'
                    }`}
                    title={'Approved Judgements'}
                    onClick={() => handleChangejudgementType('approved')}
                  />
                  {/* <SLButton
                  onClick={() => setIsFilterModalOpen(true)}
                  variant={'success'}
                  title={'Filter Judgements'}
                /> */}
                </div>
                <div className='grid grid-cols-2 pt-5 gap-5'>
                  {filterjudgements &&
                    filterjudgements.map((data, index) => (
                      <div key={index}>
                        <Citation data={data} />
                      </div>
                    ))}
                  {pendingjudgements &&
                    pendingjudgements.map((data, index) => (
                      <div key={index}>
                        <Citation data={data} />
                      </div>
                    ))}
                  {approvedjudgements &&
                    approvedjudgements.map((data, index) => (
                      <div key={index}>
                        <Citation data={data} />
                      </div>
                    ))}
                </div>
              </div>
              <div className='lg:w-1/4'>
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
                <div className='p-5'>
                  <Calendar onChange={onChange} value={date} />
                  <div>
                    <p className='text-center p-2'>
                      {date.toLocaleDateString()}
                    </p>
                  </div>
                  <SLButton
                    isLoading={searching}
                    iconColor={'white'}
                    loadingText={'Searching...'}
                    onClick={searchByDate}
                    title={`Search by Date of Order`}
                    variant={'primary'}
                    width={5}
                  />
                </div>
              </div>
            </div>
            {isFilterModalOpen && (
              <FilterCitationModal
                setjudgementType={setjudgementType}
                setapprovedjudgements={setapprovedjudgements}
                setpendingjudgements={setpendingjudgements}
                setfilterjudgements={setfilterjudgements}
                isOpen={true}
                onClose={() => setIsFilterModalOpen(false)}
              />
            )}
            {judgementType === 'pending' && pendingjudgements.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            {judgementType === 'approved' &&
              approvedjudgements.length === 0 && (
                <p className='text-center text-lg'>No data to show</p>
              )}
          </div>
        )}
      </div>
    </div>
  )
}

const Citation = ({ data }) => {
  return (
    <div>
      <div className='p-2 relative max-sm:px-5 border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
        <Link to={`/admin-dashboard/detailed-citation/${data._id}`}>
          <div className='flex items-center'>
            <div>
              <Avatar />
            </div>
            <div className='px-2'>
              <p className='text-base capitalize'>{data.citationNo}</p>
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

export default ReviewCitationPage
