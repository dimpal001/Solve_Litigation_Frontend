import { Input } from '@chakra-ui/react'
import { PrimaryButton, PrimaryOutlineButton } from '../../Components/Customs'
import { FaRegEdit, FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { Link } from 'react-router-dom'
import Loading from '../../Components/Loading'
import { Colors } from '../../Components/Colors'

const EditCitationPage = () => {
  const [pendingCitations, setPendingCitations] = useState([])
  const [approvedCitations, setApprovedCitations] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [citationType, setCitationType] = useState('pending')

  const fetchPendingCitation = async () => {
    try {
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
    console.log(pendingCitations)
  }, [])

  return (
    <div>
      <div>
        <p className='text-2xl text-center font-extrabold'>Edit Citation</p>
        <div className='flex justify-center py-5 items-center gap-2'>
          <Input
            width={'20%'}
            borderRadius={'base'}
            placeholder='Enter citaion number'
          />
          <PrimaryButton leftIcon={<FaSearch />} />
        </div>
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
        </div>
        <div>
          {isLoading ? (
            <Loading />
          ) : (
            <div className='py-3 flex flex-col gap-y-3'>
              {pendingCitations &&
                pendingCitations.map((data, index) => (
                  <div key={index}>
                    <Citation data={data} />
                  </div>
                ))}
              {approvedCitations &&
                approvedCitations.map((data, index) => (
                  <div key={index}>
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
      <div className='border border-slate-300 flex p-2 rounded-sm'>
        <div className='w-[20%] flex items-center'>
          <p className='text-lg pl-3'>{data.citationNo}</p>
        </div>
        <div className='w-[80%] flex items-center'>
          <p className='text-lg'>{data.title}</p>
        </div>
        <div className='w-[20%] flex justify-end items-center'>
          <p
            className={`text-sm px-2 ${
              data.status === 'approved' ? 'text-green-600' : 'text-orange-600'
            } capitalize`}
          >
            {data.status}
          </p>
          <Link to={`/admin-dashboard/edit-citation/${data._id}`}>
            <PrimaryOutlineButton
              leftIcon={<FaRegEdit size={17} />}
              title={'Edit'}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default EditCitationPage
