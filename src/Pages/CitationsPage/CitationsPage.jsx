import { IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import axios from 'axios'
import { PrimaryOutlineButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'
import { LuSettings2 } from "react-icons/lu";

const CitationsPage = () => {
  const [selectedApellate, setSelectedApellate] = useState(null)
  const [selectedLaw, setSelectedLaw] = useState(null)
  const [fetchingLaws, setFetchingLaws] = useState([])
  const [fetchingApellates, setFetchingApellates] = useState([])
  const [last10Citations, setLast10Citations] = useState([])
  const [fetchingPOL, setFetchingPOL] = useState([])
  const [fetchingCitations, setFetchingCitations] = useState([])
  const [filteredCitations, setFilteredCitations] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')

  const handleChangeApellate = async (apellate) => {
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
    setSelectedLaw(law)
    await fetchPOL(law)
  }

  const handleChangePOL = async (pol) => {
    setIsFilterModalOpen(false)
    setSelectedFilter('all')
    setIsLoading(true)
    await fetchCitations(pol)
  }

  const fetchLaw = async (apellate) => {
    try {
      const token = sessionStorage.getItem('token')
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
      const token = sessionStorage.getItem('token')
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
      const token = sessionStorage.getItem('token')
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
      const token = sessionStorage.getItem('token')
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

  const fetchLast10Citations = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(`${api}/api/solve_litigation/citation/last-10-citations`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setLast10Citations(response.data.last10Citations)
    } catch (error) {
      console.log(error)
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

  return (
    <div>
      <div className='md:px-32  py-3'>
        <div className='flex justify-center pb-5'>
          <div className='flex gap-2 lg:w-[50%]'>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <FaSearch color={Colors.primary} />
              </InputLeftElement>
              <Input rounded={'sm'} type='text' placeholder='Search with advotace name' />
              <InputRightElement>
                <FaArrowRight color={Colors.primary} />
              </InputRightElement>
            </InputGroup>
            <div className='lg:hidden'>
              <IconButton onClick={() => setIsFilterModalOpen(true)} rounded={'sm'} bgColor={Colors.primary} color={'white'} icon={<LuSettings2 size={23} />} />
            </div>
          </div>
        </div>
        {filteredCitations.length === 0 ? null : (
          <p className='text-center lg:hidden text-sm'>
            {fetchingCitations.length} result found
          </p>
        )}
        <div className='lg:flex gap-x-8 max-md:px-3 py-3'>
          <div className='lg:w-[25%] max-lg:hidden border p-2 max-md:mb-3 rounded-sm'>
            <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-3'>
              {fetchingApellates && fetchingApellates.map((data, index) => (
                <PrimaryOutlineButton key={index}
                  onClick={() => handleChangeApellate(data.name)}
                  bgColor={selectedApellate === data.name ? Colors.primary : null}
                  color={selectedApellate === data.name ? 'white' : null}
                  title={data.name}
                />
              ))}
            </div>
            <div className='flex flex-col justify-center max-md:py-2 gap-3'>
              {fetchingLaws.length !== 0 && (
                <div>
                  <p className='text-sm'>Select a law</p>
                  <div className='flex flex-col gap-2'>
                    {fetchingLaws.map((law, index) => (
                      <PrimaryOutlineButton
                        value={law}
                        onClick={(e) => handleChangeLaw(e.target.value)}
                        key={index}
                        title={law}
                      />
                    ))}
                  </div>
                </div>
              )}

              {fetchingPOL.length !== 0 && (
                <div>
                  <p className='text-sm'>Select a point of law</p>
                  <div className='flex flex-col gap-2'>
                    {fetchingPOL.map((POL, index) => (
                      <PrimaryOutlineButton
                        value={POL}
                        onClick={(e) => handleChangePOL(e.target.value)}
                        key={index}
                        title={POL}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Modal size={'sm'} isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)}>
            <ModalOverlay />
            <ModalContent rounded={0} >
              <ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className='lg:w-[25%] p-2 max-md:mb-3 rounded-sm'>
                    <p className='text-sm font-light py-1'>Select an apellate type</p>
                    <div className='grid grid-cols-2 gap-3 max-lg:grid-cols-3'>
                      {fetchingApellates && fetchingApellates.map((data, index) => (
                        <PrimaryOutlineButton key={index}
                          onClick={() => handleChangeApellate(data.name)}
                          bgColor={selectedApellate === data.name ? Colors.primary : null}
                          color={selectedApellate === data.name ? 'white' : null}
                          title={data.name}
                        />
                      ))}
                    </div>
                    <div className='flex flex-col justify-center max-md:py-2 gap-3'>
                      {fetchingLaws.length !== 0 && (
                        <div>
                          <p className='text-sm font-light py-1'>Select a law</p>
                          <div className='flex flex-col gap-2'>
                            {fetchingLaws.map((law, index) => (
                              <PrimaryOutlineButton
                                value={law}
                                onClick={(e) => handleChangeLaw(e.target.value)}
                                key={index}
                                title={law}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {fetchingPOL.length !== 0 && (
                        <div>
                          <p className='text-sm font-light py-1'>Select a point of law</p>
                          <div className='flex flex-col gap-2'>
                            {fetchingPOL.map((POL, index) => (
                              <PrimaryOutlineButton
                                value={POL}
                                onClick={(e) => handleChangePOL(e.target.value)}
                                key={index}
                                title={POL}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ModalBody>
              </ModalHeader>
            </ModalContent>
          </Modal>
          <div className='lg:w-[75%]'>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                <div>
                  {fetchingCitations.length !== 0 ? (
                    <div>
                      <div className='flex gap-3 pb-3'>
                        <PrimaryOutlineButton
                          bgColor={selectedFilter === 'all' && Colors.primary}
                          color={selectedFilter === 'all' && 'white'}
                          onClick={handleFilterAll}
                          title={'All'}
                        />
                        <PrimaryOutlineButton
                          bgColor={selectedFilter === 'hc' && Colors.primary}
                          color={selectedFilter === 'hc' && 'white'}
                          onClick={handleFilterHighCourt}
                          title={'High Court'}
                        />
                        <PrimaryOutlineButton
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
                  ) : (
                    <div className='flex flex-col gap-2'>
                      <p className='text-primary'>Latest Citations</p>
                      {last10Citations.map((citation, index) => (
                        <Citation key={index} data={citation} />
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
        <div className='border hover:bg-primary hover:text-white cursor-pointer border-slate-300 flex p-2 rounded-sm'>
          <div className='lf:w-[20%] w-[40%] flex items-center'>
            <p className='text-lg overflow-hidden pl-3'>{data.citationNo}</p>
          </div>
          <div className='lg:w-[80%] w-[60%] flex items-center'>
            <p className='text-lg overflow-hidden'>{data.title}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CitationsPage
