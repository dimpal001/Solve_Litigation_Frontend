import {
  IconButton,
  Input,
  Avatar,
  Badge,
  Button,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import axios from 'axios'
import { PrimaryOutlineButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import Loading from '../../Components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { LuSettings2 } from 'react-icons/lu'
import '../../App.css'
import { IoMdRefresh } from 'react-icons/io'
import { enqueueSnackbar } from 'notistack'
import { UserContext } from '../../UserContext'

const CitationsPage = () => {
  const [selectedApellate, setSelectedApellate] = useState('latest')
  const [selectedLaw, setSelectedLaw] = useState(null)
  const [selectedPOL, setSelectedPOL] = useState(null)
  const [fetchingLaws, setFetchingLaws] = useState([])
  const [fetchingApellates, setFetchingApellates] = useState([])
  const [last10Citations, setLast10Citations] = useState([])
  const [fetchingPOL, setFetchingPOL] = useState([])
  const [fetchingCitations, setFetchingCitations] = useState([])
  const [fetchingActs, setFetchingActs] = useState([])
  const [filteredCitations, setFilteredCitations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChangeApellate = async (apellate) => {
    setLast10Citations([])
    setSelectedFilter('all')
    setFetchingLaws([])
    setFetchingPOL([])
    setFetchingCitations([])
    setSelectedApellate(apellate)
    await fetchLaw(apellate)
    setSelectedLaw(null)
  }

  const handleChangeLaw = async (law) => {
    setSelectedFilter('all')
    setSelectedPOL()
    setSelectedLaw(law)
    await fetchPOL(law)
  }

  const handleChangePOL = async (pol) => {
    setIsFilterModalOpen(false)
    setSelectedFilter('all')
    setSelectedPOL(pol)
    setIsLoading(true)
    await fetchCitations(pol)
  }

  const fetchLaw = async (apellate) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/get-laws-by-apellateType`,
        {
          apellateType: apellate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingLaws(response.data.laws)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchApellate = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/apellate-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingApellates(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchPOL = async (law) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/get-pointOfLaw-by-law`,
        {
          apellateType: selectedApellate,
          law: law,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingPOL(response.data.pointOfLaw)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCitations = async (POL) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/get-citations-by-filter`,
        {
          apellateType: selectedApellate,
          law: selectedLaw,
          pointOfLaw: POL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingCitations(response.data.citations)
      setFilteredCitations(response.data.citations)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchActs = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/act/get-all-acts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingActs(response.data.acts)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired!', { variant: 'error' })
  }

  const fetchLast10Citations = async () => {
    try {
      setFetchingCitations([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/last-10-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLast10Citations(response.data.last10Citations)
    } catch (error) {
      console.log(error)
      handleLogout()
      if (error.response.status === 401) {
        handleLogout()
      }
    }
  }

  useEffect(() => {
    fetchLast10Citations()
    fetchApellate()
  }, [])

  const handleFilterHighCourt = () => {
    setSelectedFilter('hc')
    const filteredCitations = fetchingCitations.filter((citation) =>
      citation.institutionName.toLowerCase().includes('high court')
    )
    setFilteredCitations(filteredCitations)
  }

  const handleFilterSupremeCourt = () => {
    setSelectedFilter('sc')
    const filteredCitations = fetchingCitations.filter((citation) =>
      citation.institutionName.toLowerCase().includes('supreme court')
    )
    setFilteredCitations(filteredCitations)
  }

  const handleFilterAll = () => {
    setSelectedFilter('all')
    setFilteredCitations(fetchingCitations)
  }

  const handleLatest = () => {
    setSelectedApellate('latest')
    fetchLast10Citations()
    setFetchingLaws([])
    setFilteredCitations([])
    setFetchingPOL([])
  }

  const handleFetchActs = () => {
    setIsFilterModalOpen(false)
    setSelectedApellate('act')
    setLast10Citations([])
    setFetchingCitations([])
    setFetchingLaws([])
    setFilteredCitations([])
    setFetchingPOL([])
    fetchActs()
  }

  return (
    <div>
      <div className='md:px-32 py-3'>
        <div className='flex max-lg:hidden justify-center gap-5 pb-5'>
          <Button
            _focus={{
              bgColor: Colors.primary,
              textColor: 'white',
            }}
            bgColor={selectedApellate === 'latest' && Colors.primary}
            color={selectedApellate === 'latest' && 'white'}
            onClick={handleLatest}
            size={{ base: '10px', lg: 'md' }}
            px={'8px'}
            py={'7px'}
            textTransform={'capitalize'}
            rounded={'sm'}
            fontSize={14}
          >
            Latest
          </Button>
          {fetchingApellates &&
            fetchingApellates.map((data, index) => (
              <Button
                key={index}
                _focus={{
                  bgColor: Colors.primary,
                  textColor: 'white',
                }}
                _hover={{
                  bgColor: Colors.primary,
                  textColor: 'white',
                }}
                size={{ base: '10px', lg: 'md' }}
                px={'8px'}
                py={'7px'}
                textTransform={'capitalize'}
                rounded={'sm'}
                fontSize={14}
                bgColor={selectedApellate === data.name && Colors.primary}
                color={selectedApellate === data.name && 'white'}
                onClick={() => handleChangeApellate(data.name)}
              >
                {data.name}
              </Button>
            ))}
          <Button
            _focus={{
              bgColor: Colors.primary,
              textColor: 'white',
            }}
            size={{ base: '10px', lg: 'md' }}
            px={'8px'}
            py={'7px'}
            textTransform={'capitalize'}
            rounded={'sm'}
            fontSize={14}
            onClick={handleFetchActs}
          >
            Acts
          </Button>
        </div>
        <div className='flex justify-center lg:pb-3'>
          <div className='flex gap-2 lg:w-[50%]'>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaSearch color={Colors.primary} />
              </InputLeftElement>
              <Input rounded={'sm'} type='text' placeholder='Search here ...' />
              <InputRightElement>
                <FaArrowRight color={Colors.primary} />
              </InputRightElement>
            </InputGroup>
            <div className='lg:hidden'>
              <IconButton
                onClick={() => setIsFilterModalOpen(true)}
                rounded={'sm'}
                bgColor={Colors.primary}
                color={'white'}
                icon={<LuSettings2 size={23} />}
              />
            </div>
            <div className='lg:hidden'>
              <IconButton
                onClick={handleLatest}
                rounded={'sm'}
                _focus={{ bgColor: Colors.primary }}
                bgColor={Colors.primary}
                color={'white'}
                icon={<IoMdRefresh size={23} />}
              />
            </div>
          </div>
        </div>
        <div className='lg:flex w-full py-3'>
          <Modal
            size={{ base: 'sm', lg: 'xl' }}
            isOpen={isFilterModalOpen}
            onClose={() => setIsFilterModalOpen(false)}
          >
            <ModalOverlay />
            <ModalContent rounded={0}>
              <ModalHeader>Filter Citations</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className='p-2 max-md:mb-3 rounded-sm'>
                  <p className='text-base font-medium py-1'>
                    Select an apellate type
                  </p>
                  <div className='flex flex-wrap gap-5'>
                    {fetchingApellates &&
                      fetchingApellates.map((data, index) => (
                        <Button
                          key={index}
                          _focus={{
                            bgColor: Colors.primary,
                            textColor: 'white',
                          }}
                          size={'10px'}
                          px={'8px'}
                          py={'7px'}
                          textTransform={'capitalize'}
                          rounded={'sm'}
                          fontSize={14}
                          bgColor={
                            selectedApellate === data.name && Colors.primary
                          }
                          color={selectedApellate === data.name && 'white'}
                          onClick={() => handleChangeApellate(data.name)}
                        >
                          {data.name}
                        </Button>
                      ))}
                    <Button
                      _focus={{
                        bgColor: Colors.primary,
                        textColor: 'white',
                      }}
                      size={'10px'}
                      px={'8px'}
                      py={'7px'}
                      textTransform={'capitalize'}
                      rounded={'sm'}
                      fontSize={14}
                      bgColor={selectedApellate === 'act' && Colors.primary}
                      color={selectedApellate === 'act' && 'white'}
                      onClick={handleFetchActs}
                    >
                      Acts
                    </Button>
                  </div>
                  <div className='flex flex-col justify-center max-md:py-2 gap-3'>
                    {fetchingLaws.length !== 0 && (
                      <div>
                        <div className='h-[1px] my-5 bg-slate-200'></div>
                        <p className='text-base font-medium py-1'>
                          Select a law
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {fetchingLaws.map((law, index) => (
                            <Button
                              key={index}
                              _focus={{
                                bgColor: Colors.primary,
                                textColor: 'white',
                              }}
                              size={'10px'}
                              px={'8px'}
                              py={'7px'}
                              textTransform={'capitalize'}
                              rounded={'sm'}
                              fontSize={14}
                              value={law}
                              bgColor={selectedLaw === law && Colors.primary}
                              color={selectedLaw === law && 'white'}
                              onClick={(e) => handleChangeLaw(e.target.value)}
                            >
                              {law}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    {fetchingPOL.length !== 0 && (
                      <div>
                        <div className='h-[1px] my-5 bg-slate-200'></div>
                        <p className='text-base font-medium py-1'>
                          Select a point of law
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {fetchingPOL.map((POL, index) => (
                            <Button
                              key={index}
                              className='hideScrollBar'
                              overflow={'scroll'}
                              _focus={{
                                bgColor: Colors.primary,
                                textColor: 'white',
                              }}
                              size={'10px'}
                              px={'8px'}
                              py={'7px'}
                              textTransform={'capitalize'}
                              rounded={'sm'}
                              fontSize={14}
                              value={POL}
                              onClick={(e) => handleChangePOL(e.target.value)}
                            >
                              {POL}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ModalBody>
            </ModalContent>
          </Modal>
          <div className='w-full'>
            {isLoading ? (
              <Loading />
            ) : (
              <div className='flex flex-col-reverse justify-between gap-10 w-full'>
                <div className=''>
                  <div className='flex flex-col gap-3'>
                    <div>
                      {last10Citations && last10Citations.length > 0 && (
                        <p className='px-2 py-3 max-md:text-center text-primary text-2xl'>
                          Latest judgements
                        </p>
                      )}
                      {last10Citations &&
                        last10Citations.map((citation, index) => (
                          <Citation key={index} data={citation} />
                        ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`flex ${
                    fetchingLaws.length !== 0 && 'p-3'
                  } max-lg:hidden w-full gap-8`}
                >
                  {fetchingLaws.length !== 0 && (
                    <div>
                      <p className='text-lg font-medium py-1'>Select a law</p>
                      <div className='flex flex-col gap-2'>
                        {fetchingLaws.map((law, index) => (
                          <div
                            key={index}
                            className={`focus:bg-primary focus:text-white hover:bg-primary hover:text-white ${
                              selectedLaw === law
                                ? 'bg-primary text-white'
                                : 'bg-gray-200'
                            } rounded-sm font-semibold text-sm p-2 w-[240px] cursor-pointer capitalize`}
                            onClick={() => handleChangeLaw(law)}
                          >
                            {law}
                          </div>
                          // <Button key={index}
                          //   overflowX={'hidden'}
                          //   _focus={{
                          //     bgColor: Colors.primary,
                          //     textColor: 'white'
                          //   }}
                          //   _hover={{
                          //     bgColor: Colors.primary,
                          //     textColor: 'white'
                          //   }}
                          //   size={{ base: '10px', lg: 'md' }} px={'8px'}
                          //   py={'7px'} textTransform={'capitalize'} rounded={'sm'}
                          //   fontSize={14} value={law}
                          //   bgColor={selectedLaw === law && Colors.primary}
                          //   color={selectedLaw === law && 'white'}
                          //   onClick={(e) => handleChangeLaw(e.target.value)}
                          // >{law}</Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {fetchingPOL.length !== 0 && (
                    <div>
                      <p className='text-lg font-medium py-1'>
                        Select a point of law
                      </p>
                      <div className='flex flex-col gap-2'>
                        {fetchingPOL.map((POL, index) => (
                          <div
                            className={`focus:bg-primary focus:text-white hover:bg-primary hover:text-white ${
                              selectedPOL === POL
                                ? 'bg-primary text-white'
                                : 'bg-gray-200'
                            } rounded-sm font-semibold text-sm p-2 w-[240px] cursor-pointer capitalize`}
                            key={index}
                            onClick={() => handleChangePOL(POL)}
                          >
                            {POL}
                          </div>
                          // <Button
                          //   key={index}
                          //   // width={'230px'}
                          //   _focus={{
                          //     bgColor: Colors.primary,
                          //     textColor: 'white',
                          //   }}
                          //   _hover={{
                          //     bgColor: Colors.primary,
                          //     textColor: 'white',
                          //   }}
                          //   size={{ base: '10px', lg: 'md' }}
                          //   px={'8px'}
                          //   bgColor={selectedPOL === POL && Colors.primary}
                          //   color={selectedPOL === POL && 'white'}
                          //   py={'7px'}
                          //   textTransform={'capitalize'}
                          //   rounded={'sm'}
                          //   fontSize={14}
                          //   value={POL}
                          //   onClick={(e) => handleChangePOL(e.target.value)}
                          // >
                          //   {POL}
                          // </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  {fetchingCitations.length !== 0 && (
                    <div>
                      <div className='flex max-md:px-3 gap-3 pb-3'>
                        <PrimaryOutlineButton
                          size={'sm'}
                          bgColor={selectedFilter === 'all' && Colors.primary}
                          color={selectedFilter === 'all' && 'white'}
                          onClick={handleFilterAll}
                          title={'All'}
                        />
                        <PrimaryOutlineButton
                          size={'sm'}
                          bgColor={selectedFilter === 'hc' && Colors.primary}
                          color={selectedFilter === 'hc' && 'white'}
                          onClick={handleFilterHighCourt}
                          title={'High Court'}
                        />
                        <PrimaryOutlineButton
                          size={'sm'}
                          bgColor={selectedFilter === 'sc' && Colors.primary}
                          color={selectedFilter === 'sc' && 'white'}
                          onClick={handleFilterSupremeCourt}
                          title={'Supreme Court'}
                        />
                      </div>
                      {filteredCitations.length !== 0 &&
                        filteredCitations.map((citation, index) => (
                          <Citation key={index} data={citation} />
                        ))}
                    </div>
                  )}
                  {fetchingActs.length !== 0 && (
                    <div>
                      {fetchingActs.map((act, index) => (
                        <Act key={index} data={act} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const Citation = ({ data }) => {
  return (
    <div>
      <Link to={`/detailed-citation/${data._id}`}>
        <div className='p-2 max-sm:px-5 lg:my-3 group hover:bg-slate-50 lg:border-b bg-slate-50'>
          <div className='flex items-center'>
            <div>
              <Avatar bg={Colors.primary} size={'sm'} name={'S L'} />
            </div>
            <div className='px-2'>
              <p className='text-base capitalize'>{data.institutionName}</p>
              <p className='text-xs'>{`Ordered on ${new Date(
                data.dateOfOrder
              ).toLocaleDateString()}`}</p>
            </div>
          </div>
          <div>
            <p className='text-primary group-hover:underline py-1'>
              {data.title}
            </p>
          </div>
          <div>
            <p className='text-sm'>{data.headNote}</p>
          </div>
          <div className='flex overflow-x-scroll gap-2 py-1'>
            {data.laws.map((law, index) => (
              <Badge bgColor={'gray.200'} key={index} fontSize={10} px={2}>
                {law}
              </Badge>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

const Act = ({ data }) => {
  return (
    <div>
      <Link to={`/detailed-citation/${data._id}`}>
        <div className='p-2 max-sm:px-5 lg:my-3 hover:bg-slate-50 lg:border-b bg-slate-50'>
          <div className='flex items-center'>
            <div>
              <Avatar bg={Colors.primary} size={'sm'} name={'S L'} />
            </div>
            <div className='px-2'>
              <p className='text-base capitalize'>
                solve litigation&apos;s guide to
              </p>
            </div>
          </div>
          <div>
            <p className='text-primary py-1'>{data.title}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CitationsPage
