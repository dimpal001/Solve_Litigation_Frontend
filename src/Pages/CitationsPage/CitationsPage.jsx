import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import axios from 'axios'
import {
  Avatar,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  SLButton,
  SLSpinner,
} from '../../Components/Customs'
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
  const [fetchingPOL, setFetchingPOL] = useState([])
  const [fetchingCitations, setFetchingCitations] = useState([])
  const [fetchingActs, setFetchingActs] = useState([])
  const [filteredCitations, setFilteredCitations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [pageNo, setPageNo] = useState(0)
  const [totalPage, setTotalPage] = useState()
  const [isPagination, setIsPagination] = useState(false)

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleChangeApellate = async (apellate) => {
    setIsPagination(false)
    setQuery('')
    setFetchingActs([])
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
    setFetchingActs([])
    setSelectedPOL()
    setSelectedLaw(law)
    await fetchPOL(law)
  }

  const handleChangePOL = async (pol) => {
    setIsFilterModalOpen(false)
    setFetchingActs([])
    setSelectedFilter('all')
    setSelectedPOL(pol)
    setIsLoading(true)
    await fetchCitations(pol)
  }

  const fetchLaw = async (apellate) => {
    try {
      setFetchingActs([])
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
      setFetchingActs([])
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
      setFetchingActs([])
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
      setIsPagination(false)
      setFetchingActs([])
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
      setIsPagination(false)
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

  const fetchLast10Citations = async (page = 0) => {
    try {
      setIsLoading(true)
      setFetchingCitations([])
      setFetchingActs([])
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/last-10-citations/${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setFetchingCitations(response.data.last10Citations)
      setFilteredCitations(response.data.last10Citations)
      setTotalPage(response.data.totalPages)
      setIsPagination(true)
    } catch (error) {
      console.log(error)
      handleLogout()
      if (error.response.status === 401) {
        handleLogout()
      }
    } finally {
      setIsLoading(false)
    }
  }

  const searchJudgement = async (e) => {
    e.preventDefault()
    if (query === '') {
      enqueueSnackbar('Type something in the search box', { variant: 'error' })
      return
    }

    if (query.length > 60) {
      enqueueSnackbar('The query is too long.', { variant: 'error' })
      return
    }

    try {
      setIsPagination(false)
      setSelectedApellate('')
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/search-citations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            query: query,
          },
        }
      )
      if (response) {
        setSelectedFilter('')
        setFetchingCitations([])
        setFetchingCitations(response.data.matchedCitations)
        setFilteredCitations(response.data.matchedCitations)
        setFetchingActs([])
      }

      console.log(fetchingActs)
      console.log('Citations : ', fetchingCitations)
    } catch (error) {
      console.error('Error fetching citations:', error)
      enqueueSnackbar('Failed to fetch citations', { variant: 'error' })
    } finally {
      setIsLoading(false)
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

  const handleFilteTribunal = () => {
    setSelectedFilter('tr')
    const filteredCitations = fetchingCitations.filter((citation) =>
      citation.institutionName.toLowerCase().includes('tribunal')
    )
    setFilteredCitations(filteredCitations)
  }

  const handleFilterAll = () => {
    setSelectedFilter('all')
    setFilteredCitations(fetchingCitations)
  }

  const handleLatest = () => {
    setQuery('')
    setSelectedApellate('latest')
    fetchLast10Citations()
    setFetchingLaws([])
    setFilteredCitations([])
    setFetchingPOL([])
  }

  const handleFetchActs = () => {
    setIsFilterModalOpen(false)
    setSelectedApellate('act')
    setFetchingCitations([])
    setFetchingLaws([])
    setFilteredCitations([])
    setFetchingPOL([])
    fetchActs()
  }

  const handlePageChange = (newPage) => {
    setPageNo(newPage)
    fetchLast10Citations(newPage)
  }

  return (
    <div>
      <div className='md:px-32 py-3'>
        <div className='flex max-lg:hidden justify-center gap-5 pb-5'>
          <SLButton
            className={'text-sm px-3 py-[7px]'}
            variant={selectedApellate === 'latest' ? 'primary' : 'outline'}
            onClick={handleLatest}
            title={'Latest'}
          />
          {fetchingApellates &&
            fetchingApellates.map((data, index) => (
              <SLButton
                key={index}
                className={'text-sm px-3 py-[7px] capitalize'}
                variant={selectedApellate === data.name ? 'primary' : 'outline'}
                title={data.name}
                onClick={() => handleChangeApellate(data.name)}
              />
            ))}
          <SLButton
            variant={'outline'}
            className={'focus:bg-primary text-sm py-[7px] focus:text-white'}
            title={'Acts'}
          />
        </div>
        <div className='flex justify-center max-md:px-1 lg:pb-3'>
          <div className='flex gap-2 max-md:gap-1 items-center max-md:px-1 lg:w-[50%]'>
            <form
              onSubmit={searchJudgement}
              className='flex w-full gap-5 max-md:gap-0 rounded-sm border px-3 items-center'
            >
              <FaSearch color={Colors.primary} />
              <input
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search here ...'
                className='p-2 w-full text-base group focus:outline-none bg-transparent'
              />
              {isLoading ? (
                <SLSpinner width={'30px'} />
              ) : (
                <FaArrowRight
                  className='cursor-pointer'
                  color={Colors.primary}
                  onClick={searchJudgement}
                />
              )}
            </form>
            <div className='lg:hidden'>
              <div
                className='bg-primary p-2 cursor-pointer text-white rounded-sm'
                onClick={() => setIsFilterModalOpen(true)}
              >
                <LuSettings2 size={27} />
              </div>
            </div>
            <div className='lg:hidden'>
              <div
                className='bg-primary p-2 cursor-pointer text-white rounded-sm'
                onClick={handleLatest}
              >
                {isLoading ? (
                  <SLSpinner iconColor={'white'} className={'w-[26px]'} />
                ) : (
                  <IoMdRefresh size={27} />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='lg:flex w-full py-3'>
          <Modal size={{ base: 'md', lg: 'xl' }} isOpen={isFilterModalOpen}>
            <ModalContent rounded={0}>
              <ModalHeader>Filter Judgements</ModalHeader>
              <ModalCloseButton onClick={() => setIsFilterModalOpen(false)} />
              <ModalBody>
                <div className='p-2 max-md:mb-3 rounded-sm'>
                  <p className='text-base font-medium py-1'>
                    Select an apellate type
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {fetchingApellates &&
                      fetchingApellates.map((data, index) => (
                        <div
                          onClick={() => handleChangeApellate(data.name)}
                          className={`${
                            selectedApellate === data.name
                              ? 'bg-primary text-white'
                              : 'bg-gray-300 text-black'
                          } text-sm px-2 py-[2px] rounded-sm`}
                          key={index}
                        >
                          {data.name}
                        </div>
                      ))}
                    <div
                      onClick={handleFetchActs}
                      className={`${
                        selectedApellate === 'act'
                          ? 'bg-primary text-white'
                          : 'bg-gray-300 text-black'
                      } text-sm px-2 py-[2px] rounded-sm`}
                    >
                      Acts
                    </div>
                  </div>
                  <div className='flex flex-col justify-center max-md:py-2 gap-3'>
                    {fetchingLaws.length !== 0 && (
                      <div>
                        <div className='h-[1px] my-2 bg-slate-200'></div>
                        <p className='text-base font-medium py-1'>
                          Select a law
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {fetchingLaws.map((law, index) => (
                            <div
                              key={index}
                              onClick={() => handleChangeLaw(law)}
                              className={`${
                                selectedLaw === law
                                  ? 'bg-primary text-white'
                                  : 'bg-gray-300 text-black'
                              } text-sm px-2 py-[2px] rounded-sm`}
                            >
                              {law}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {fetchingPOL.length !== 0 && (
                      <div>
                        <div className='h-[1px] my-2 bg-slate-200'></div>
                        <p className='text-base font-medium py-1'>
                          Select a point of law
                        </p>
                        <div className='flex flex-wrap gap-2'>
                          {fetchingPOL.map((POL, index) => (
                            <div
                              key={index}
                              onClick={() => handleChangePOL(POL)}
                              className={`bg-gray-300 text-black text-sm px-2 py-[2px] rounded-sm`}
                            >
                              {POL}
                            </div>
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
                <div
                  className={`flex ${
                    fetchingLaws.length !== 0 && 'p-3'
                  } w-full gap-8`}
                >
                  {fetchingLaws.length !== 0 && (
                    <div className='max-md:hidden'>
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
                        ))}
                      </div>
                    </div>
                  )}
                  {fetchingPOL.length !== 0 && (
                    <div className='max-md:hidden'>
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
                        ))}
                      </div>
                    </div>
                  )}
                  {fetchCitations.length === 0 && fetchingActs.length === 0 && (
                    <p className='text-center p-3'>No citations found.</p>
                  )}
                  {fetchingCitations.length !== 0 && (
                    <div className='w-full'>
                      <div className='flex max-md:px-3 max-md:gap-2 gap-3 pb-3'>
                        <SLButton
                          className={
                            'text-sm max-md:text-xs max-md:px-[14px] max-md:py-[6px]'
                          }
                          variant={
                            selectedFilter === 'all' ? 'primary' : 'outline'
                          }
                          onClick={handleFilterAll}
                          title={'All'}
                        />
                        <SLButton
                          className={
                            'text-sm max-md:text-xs max-md:px-[14px] max-md:py-[6px]'
                          }
                          variant={
                            selectedFilter === 'hc' ? 'primary' : 'outline'
                          }
                          onClick={handleFilterHighCourt}
                          title={'High Court'}
                        />
                        <SLButton
                          className={
                            'text-sm max-md:text-xs max-md:px-[14px] max-md:py-[6px]'
                          }
                          variant={
                            selectedFilter === 'sc' ? 'primary' : 'outline'
                          }
                          onClick={handleFilterSupremeCourt}
                          title={'Supreme Court'}
                        />
                        <SLButton
                          className={
                            'text-sm max-md:text-xs max-md:px-[14px] max-md:py-[6px]'
                          }
                          variant={
                            selectedFilter === 'tr' ? 'primary' : 'outline'
                          }
                          onClick={handleFilteTribunal}
                          title={'Tribunal'}
                        />
                      </div>
                      {filteredCitations.length !== 0 &&
                        filteredCitations.map((citation, index) => (
                          <Citation key={index} data={citation} />
                        ))}
                      {isPagination && filteredCitations.length !== 0 && (
                        <div className='flex items-center max-md:px-4 justify-center gap-5 py-3 max-md:justify-between'>
                          {pageNo !== 0 && (
                            <SLButton
                              onClick={() => handlePageChange(pageNo - 1)}
                              variant={'outline'}
                              title={'Previous'}
                            />
                          )}
                          <p className='text-primary'>
                            {pageNo + 1} of {totalPage}
                          </p>
                          {totalPage !== pageNo + 1 && (
                            <SLButton
                              onClick={() => handlePageChange(pageNo + 1)}
                              variant={'outline'}
                              title={'Next'}
                            />
                          )}
                        </div>
                      )}
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
      <Link to={`/detailed-citation/${data._id}`} className='w-full'>
        <div className='p-2 max-sm:px-5 lg:my-3 group w-full mb-2 hover:bg-slate-50 lg:border-b bg-slate-50'>
          <div className='flex items-center'>
            <div>
              <Avatar />
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
              <div
                key={index}
                className='bg-gray-300 px-2 py-[2px] text-sm rounded-sm text-black'
              >
                {law}
              </div>
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
