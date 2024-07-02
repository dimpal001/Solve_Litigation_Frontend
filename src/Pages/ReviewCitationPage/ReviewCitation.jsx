import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loading from '../../Components/Loading'
import SingleCitationPage from './SingleCitationPage'
import { FaRegEdit } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import { MdDeleteOutline } from 'react-icons/md'
import DeleteCitationModal from './DeleteCitationModal'
import { enqueueSnackbar } from 'notistack'
import { SLButton } from '../../Components/Customs'

const ReviewCitation = () => {
  const { user } = useContext(UserContext)
  const { id } = useParams()
  const [citation, setCitation] = useState(null)
  const [isApproving, setIsApproving] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const navigate = useNavigate()

  const fetchCitation = async () => {
    try {
      const token = localStorage.getItem('token')
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

  const handleApprove = async () => {
    try {
      setIsApproving(true)

      const token = localStorage.getItem('token')

      const response = await axios.put(
        `${api}/api/solve_litigation/citation/approve-citation/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })

      citation.type === 'act'
        ? navigate('/admin-dashboard/review-acts/')
        : navigate('/admin-dashboard/review-citation/')
    } finally {
      setIsApproving(false)
      citation.type === 'act'
        ? navigate('/admin-dashboard/review-acts/')
        : navigate('/admin-dashboard/review-citation/')
    }
  }

  return (
    <div>
      <div>
        <p className='text-2xl text-center font-extrabold'>
          Review and Approve Citation
        </p>
        {citation ? (
          <div>
            <SingleCitationPage data={citation} />
            <div className='flex justify-center gap-3 pb-10'>
              <Link to={`/admin-dashboard/edit-citation/${id}`}>
                <SLButton
                  variant={'primary'}
                  leftIcon={<FaRegEdit size={18} />}
                  title={'Edit'}
                />
              </Link>
              {user.userType === 'admin' && citation.status === 'pending' && (
                <SLButton
                  variant={'success'}
                  isLoading={isApproving}
                  loadingText={'Approving...'}
                  onClick={handleApprove}
                  title={'Approve'}
                />
              )}
              {user.userType === 'admin' && (
                <SLButton
                  variant={'error'}
                  onClick={() => setIsDeleteModalOpen(true)}
                  leftIcon={<MdDeleteOutline size={20} />}
                  title={'Delete'}
                />
              )}
            </div>
            {isDeleteModalOpen && (
              <DeleteCitationModal
                isOpen={true}
                onClose={() => setIsDeleteModalOpen(false)}
              />
            )}
          </div>
        ) : (
          <Loading title={'Loading...'} />
        )}
      </div>
    </div>
  )
}

export default ReviewCitation
