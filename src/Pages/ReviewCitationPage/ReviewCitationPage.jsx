import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { GreenPrimaryButton, PrimaryOutlineButton } from '../../Components/Customs'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import { InputGroup, InputLeftElement, Badge, Avatar, Input, InputRightElement } from '@chakra-ui/react'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import FilterCitationModal from './FilterCitationModal'

const ReviewCitationPage = () => {
  const [pendingCitations, setPendingCitations] = useState([])
  const [approvedCitations, setApprovedCitations] = useState([])
  const [filterCitations, setFilterCitations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [citationType, setCitationType] = useState('pending')

  const fetchPendingCitation = async () => {
    try {
      setFilterCitations([])
      const token = sessionStorage.getItem('token')
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
      console.log(error)
    }
  }

  const approvedCitaion = async () => {
    try {
      setFilterCitations([])
      const token = sessionStorage.getItem('token')
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
  }, [])

  return (
    <div data-aos='fade-up'>
      <div>
        <p className='text-3xl text-center font-extrabold'>Review Citation</p>
        {isLoading ? (
          <Loading />
        ) : (
          <div className='py-3 flex flex-col gap-y-3'>
            <div className='flex justify-between'>
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
                <div>
                  <GreenPrimaryButton onClick={() => setIsFilterModalOpen(true)} title={'Filter citation'} />
                </div>
              </div>
              <div>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <FaSearch color={Colors.primary} />
                  </InputLeftElement>
                  <Input rounded={'sm'} type='text' placeholder='Search with advotace name' />
                  <InputRightElement>
                    <FaArrowRight color={Colors.primary} />
                  </InputRightElement>
                </InputGroup>
              </div>
            </div>
            {isFilterModalOpen && (
              <FilterCitationModal setCitationType={setCitationType} setApprovedCitations={setApprovedCitations} setPendingCitations={setPendingCitations} setFilterCitations={setFilterCitations} isOpen={true} onClose={() => setIsFilterModalOpen(false)} />
            )}
            {citationType === 'pending' && pendingCitations.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            {citationType === 'approved' && approvedCitations.length === 0 && (
              <p className='text-center text-lg'>No data to show</p>
            )}
            <div className='grid grid-cols-2 gap-5'>
              {filterCitations &&
                filterCitations.map((data, index) => (
                  <div data-aos='fade-up' key={index}>
                    <Citation data={data} />
                  </div>
                ))}
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
