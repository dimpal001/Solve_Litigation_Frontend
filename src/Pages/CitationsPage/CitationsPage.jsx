import { Input, Select } from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '../../Components/Apis'
import axios from 'axios'
import { PrimaryButton, PrimaryOutlineButton } from '../../Components/Customs'
import { Colors } from '../../Components/Colors'
import { FaSearch } from 'react-icons/fa'
import Loading from '../../Components/Loading'
import { Link } from 'react-router-dom'

const CitationsPage = () => {
  const [selectedApellate, setSelectedApellate] = useState(null)
  const [selectedLaw, setSelectedLaw] = useState(null)
  const [fetchingLaws, setFetchingLaws] = useState([])
  const [fetchingPOL, setFetchingPOL] = useState([])
  const [fetchingCitations, setFetchingCitations] = useState([])
  const [selectedPOL, setSelectedPOL] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeApellate = async (apellate) => {
    setFetchingLaws([])
    setFetchingPOL([])
    setFetchingCitations([])
    setSelectedApellate(apellate)
    await fetchLaw(apellate)
    setSelectedLaw(null)
    setSelectedPOL(null)
  }

  const handleChangeLaw = async (law) => {
    setSelectedLaw(law)
    await fetchPOL(law)
    setSelectedPOL(null)
  }

  const handleChangePOL = async (pol) => {
    setSelectedPOL(pol)
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
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className='lg:px-32'>
        <div className='flex justify-center pb-5'>
          <div className='flex gap-2 lg:w-[50%]'>
            <Input
              borderRadius={'sm'}
              placeholder='Search with advotace name'
            />
            <PrimaryButton leftIcon={<FaSearch />} />
          </div>
        </div>
        {fetchingCitations.length === 0 ? null : (
          <p className='text-center lg:hidden text-sm'>
            {fetchingCitations.length} result found
          </p>
        )}
        <div className='lg:flex gap-x-8 max-md:px-3 py-3'>
          <div className='lg:w-[25%] border p-2 max-md:mb-3 rounded-sm'>
            <div className='flex lg:pb-3 justify-center max-md:justify-between gap-5'>
              <PrimaryOutlineButton
                onClick={() => handleChangeApellate('civil')}
                bgColor={selectedApellate === 'civil' ? Colors.primary : null}
                color={selectedApellate === 'civil' ? 'white' : null}
                title={'Civil'}
              />
              <PrimaryOutlineButton
                onClick={() => handleChangeApellate('criminal')}
                bgColor={
                  selectedApellate === 'criminal' ? Colors.primary : null
                }
                color={selectedApellate === 'criminal' ? 'white' : null}
                title={'Criminal'}
              />
              <PrimaryOutlineButton
                onClick={() => handleChangeApellate('corporate')}
                bgColor={
                  selectedApellate === 'corporate' ? Colors.primary : null
                }
                color={selectedApellate === 'corporate' ? 'white' : null}
                title={'Corporate'}
              />
            </div>
            <div className='flex flex-col justify-center max-md:py-2 gap-3'>
              {fetchingLaws.length !== 0 && (
                <div>
                  <Select
                    borderRadius={'sm'}
                    value={selectedLaw}
                    onChange={(e) => handleChangeLaw(e.target.value)}
                  >
                    <option value=''>Select a Law</option>
                    {fetchingLaws.map((law, index) => (
                      <option key={index} value={law}>
                        {law
                          .split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </option>
                    ))}
                  </Select>
                </div>
              )}

              {fetchingPOL.length !== 0 && (
                <div>
                  <Select
                    borderRadius={'sm'}
                    value={selectedPOL}
                    onChange={(e) => handleChangePOL(e.target.value)}
                  >
                    <option value=''>Select a Point of Law</option>
                    {fetchingPOL.map((POL, index) => (
                      <option key={index} value={POL}>
                        {POL.split(' ')
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(' ')}
                      </option>
                    ))}
                  </Select>
                </div>
              )}
            </div>
          </div>
          <div className='lg:w-[75%]'>
            {isLoading ? (
              <Loading />
            ) : (
              <div>
                {fetchingCitations.length !== 0 &&
                  fetchingCitations.map((citation, index) => (
                    <Citation key={index} data={citation} />
                  ))}
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
