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

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchPendingjudgements = async () => {
    try {
      setfilterjudgements([])
      const token = sessionStorage.getItem('token')
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
      const token = sessionStorage.getItem('token')
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
            <div className='flex justify-between'>
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
                <SLButton
                  onClick={() => setIsFilterModalOpen(true)}
                  variant={'success'}
                  title={'Filter Judgements'}
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
            <div className='grid grid-cols-2 gap-5'>
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
        )}
      </div>
    </div>
  )
}

const Citation = ({ data }) => {
  return (
    <div>
      <div className='p-2 max-sm:px-5 border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
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
