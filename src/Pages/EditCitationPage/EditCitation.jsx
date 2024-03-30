import { useNavigate, useParams } from 'react-router-dom'
import CitationField from '../CreateCitationPage/CitationField'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useEffect, useState } from 'react'
import Loading from '../../Components/Loading'
import { PrimaryButton } from '../../Components/Customs'
import { FaCheck } from 'react-icons/fa'

const EditCitation = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [citation, setCitation] = useState(null)
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchCitation = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/citation/citation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setCitation(response.data.citation)
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchCitation()
  }, [])

  const handleUpdate = () => {
    setIsUpdating(true)
    navigate('/admin-dashboard/edit-citation')
  }

  return (
    <div>
      <div>
        <p className='text-2xl text-center font-extrabold'>Edit Citation</p>
        <div>
          {citation ? (
            <div>
              <CitationField data={citation} />
              <div className='flex justify-center pt-5 pb-10'>
                <PrimaryButton
                  title={'Update Citaion'}
                  isLoading={isUpdating}
                  onClick={handleUpdate}
                  loadingText={'Updating...'}
                  rightIcon={<FaCheck size={20} />}
                />
              </div>
            </div>
          ) : (
            <Loading title={'Loading...'} />
          )}
        </div>
      </div>
    </div>
  )
}

export default EditCitation
