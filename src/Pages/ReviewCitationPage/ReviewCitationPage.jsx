import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { GreenPrimaryButton, PrimaryOutlineButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import { InputGroup, useToast, InputLeftElement, Badge, Avatar, Input, InputRightElement } from '@chakra-ui/react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import FilterCitationModal from './FilterCitationModal'
import { UserContext } from '../../UserContext'

const ReviewCitationPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()
  const [pendingJudgments, setpendingJudgments] = useState([])
  const [approvedJudgments, setapprovedJudgments] = useState([])
  const [filterJudgments, setfilterJudgments] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [judgmentType, setjudgmentType] = useState('pending')

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    toast({
      title: 'Session Expired !',
      description: 'Please login again',
      status: 'error',
      duration: 10000,
      isClosable: true,
      position: 'top',
    })
  }

  const fetchPendingJudgments = async () => {
    try {
      setfilterJudgments([])
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/pending-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setpendingJudgments(response.data.pendingCitations)
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.log(error)
    }
  }

  const fetchApprovedJudgments = async () => {
    try {
      setfilterJudgments([])
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/approved-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setapprovedJudgments(response.data.approvedCitations)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeJudgmentType = (type) => {
    console.log(type)
    setjudgmentType(type)
    if (type === 'pending') {
      fetchPendingJudgments()
      setapprovedJudgments([])
    } else {
      fetchApprovedJudgments()
      setpendingJudgments([])
    }
  }

  useEffect(() => {
    fetchPendingJudgments()
  }, [])

  return (
    <div data-aos='fade-up'>
      <div>
        <p className='text-3xl text-center font-extrabold'>Review Judgments</p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between'>
              <div className='flex gap-3'>
                <PrimaryOutlineButton
                  bgColor={judgmentType === 'pending' ? Colors.primary : null}
                  color={judgmentType === 'pending' ? 'white' : null}
                  onClick={() => handleChangeJudgmentType('pending')}
                  title={'Pending Judgments'}
                />
                <PrimaryOutlineButton
                  color={judgmentType === 'approved' ? 'white' : null}
                  bgColor={judgmentType === 'approved' ? Colors.primary : null}
                  onClick={() => handleChangeJudgmentType('approved')}
                  title={'Approved Judgments'}
                />
                <div>
                  <GreenPrimaryButton onClick={() => setIsFilterModalOpen(true)} title={'Filter Judgments'} />
                </div>
              </div>
              <div>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FaSearch color={Colors.primary} />
                  </InputLeftElement>
                  <Input rounded={'sm'} type='text' placeholder='Search here...' />
                  <InputRightElement>
                    <FaArrowRight color={Colors.primary} />
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            {isFilterModalOpen && (
              <FilterCitationModal setjudgmentType={setjudgmentType} setapprovedJudgments={setapprovedJudgments} setpendingJudgments={setpendingJudgments} setfilterJudgments={setfilterJudgments} isOpen={true} onClose={() => setIsFilterModalOpen(false)} />
            )}
            {judgmentType === 'pending' && pendingJudgments.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            {judgmentType === 'approved' && approvedJudgments.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            <div className='grid grid-cols-2 gap-5'>
              {filterJudgments &&
                filterJudgments.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
                    <Citation data={data} />
                  </div>
                ))}
              {pendingJudgments &&
                pendingJudgments.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
                    <Citation data={data} />
                  </div>
                ))}
              {approvedJudgments &&
                approvedJudgments.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
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
      <div className='p-2 max-sm:px-5 z-[1] border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
        <Link to={`/admin-dashboard/detailed-citation/${data._id}`}>
          <div className='flex items-center'>
            <div>
              <Avatar bg={Colors.primary} size={'sm'} name={'S L'} />
            </div>
            <div className='px-2'>
              <p className='text-base capitalize'>{data.citationNo}</p>
              <p className='text-xs'>Last modified : {new Date(data.lastModifiedDate).toLocaleDateString()}</p>
            </div>
          </div>
          <div>
            <p className='text-primary py-1'>{data.title}</p>
          </div>
          <div className='flex gap-2 py-1'>
            <Badge bgColor={data.status === 'pending' ? 'orange.300' : 'green.400'} color={'white'} px={2}>{data.status}</Badge>
            <Badge bgColor={Colors.primary} color={'white'} px={2}>{data.type}</Badge>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCitationPage
