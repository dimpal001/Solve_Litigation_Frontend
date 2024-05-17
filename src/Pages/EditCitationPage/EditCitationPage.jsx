import {
  Input,
  InputGroup,
  Avatar,
  Badge,
  InputRightElement,
  InputLeftElement,
} from '@chakra-ui/react'
import { PrimaryOutlineButton } from '../../Components/Customs'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../../Components/Loading'
import { Colors } from '../../Components/Colors'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const EditCitationPage = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [pendingCitations, setPendingCitations] = useState([])
  const [approvedCitations, setApprovedCitations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [citationType, setCitationType] = useState('pending')

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired! Please login again', { variant: 'error' })
  }

  const fetchPendingCitation = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/pending-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setPendingCitations(response.data.pendingCitations)
      setIsLoading(false)
    } catch (error) {
      if (error.response.status === 401) {
        handleLogout()
      }
      console.log(error)
    }
  }

  const approvedCitaion = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/approved-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setApprovedCitations(response.data.approvedCitations)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeCitaionType = (type) => {
    console.log(type)
    setCitationType(type)
    if (type === 'pending') {
      fetchPendingCitation()
      setApprovedCitations([])
    } else {
      approvedCitaion()
      setPendingCitations([])
    }
  }

  useEffect(() => {
    fetchPendingCitation()
    console.log(pendingCitations)
  }, [])

  return (
    <div data-aos='fade-up'>
      <div>
        <p className='text-3xl text-center font-extrabold'>Edit Citation</p>
        <div className='flex py-3 justify-between'>
          <div className='flex gap-3'>
            <PrimaryOutlineButton
              bgColor={citationType === 'pending' ? Colors.primary : null}
              color={citationType === 'pending' ? 'white' : null}
              onClick={() => handleChangeCitaionType('pending')}
              title={'Pending Citaion'}
            />
            <PrimaryOutlineButton
              color={citationType === 'approved' ? 'white' : null}
              bgColor={citationType === 'approved' ? Colors.primary : null}
              onClick={() => handleChangeCitaionType('approved')}
              title={'Approved Citaion'}
            />
            {/* <div>
              <Select borderRadius={3} _hover={{ bgColor: Colors.primary, color: 'white' }} color={Colors.primary} borderColor={Colors.primary}>
                <option value="all">All</option>
                <option value="order">Order Citation</option>
                <option value="act">Acts Citation</option>
              </Select>
            </div> */}
          </div>
          <div>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaSearch color={Colors.primary} />
              </InputLeftElement>
              <Input
                rounded={'sm'}
                type='text'
                placeholder='Search with advotace name'
              />
              <InputRightElement>
                <FaArrowRight color={Colors.primary} />
              </InputRightElement>
            </InputGroup>
          </div>
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='grid grid-cols-2 gap-5'>
              {pendingCitations &&
                pendingCitations.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
                    <Citation data={data} />
                  </div>
                ))}
              {approvedCitations &&
                approvedCitations.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
                    <Citation data={data} />
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Citation = ({ data }) => {
  return (
    <div>
      <div className='p-2 max-sm:px-5 z-[1] border rounded-sm border-slate-100 bg-slate-50 cursor-auto hover:bg-slate-100'>
        <Link to={`/admin-dashboard/edit-citation/${data._id}`}>
          <div className='flex items-center'>
            <div>
              <Avatar bg={Colors.primary} size={'sm'} name={'S L'} />
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

export default EditCitationPage
