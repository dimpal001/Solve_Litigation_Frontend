import { useContext, useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  SLButton,
  SLSpinner,
} from '../../Components/Customs'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { UserContext } from '../../UserContext'

const DetailedUserModal = ({ isOpen, onClose, id }) => {
  const [userDetails, setUserDetails] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useContext(UserContext)

  const fetchUserDetails = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/auth/user-details/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setUserDetails(response.data)
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    fetchUserDetails()
  }, [id])

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>
          {userDetails && userDetails.fullName}{' '}
          <span className='text-base capitalize text-teal-500'>
            ({userDetails && userDetails.userType})
          </span>
        </ModalHeader>
        <ModalBody>
          {isLoading && (
            <div className='flex justify-center items-center h-[100px]'>
              <SLSpinner width={'40px'} />
            </div>
          )}
          {userDetails && (
            <div>
              {userDetails.fullName && (
                <p>
                  Full name : <strong>{userDetails.fullName}</strong>
                </p>
              )}
              {userDetails.email && (
                <p>
                  Email address : <strong>{userDetails.email}</strong>
                </p>
              )}
              {userDetails.phoneNumber && (
                <p>
                  Phone number : <strong>{userDetails.phoneNumber}</strong>
                </p>
              )}
              {userDetails.specialist && (
                <p>
                  Specialization : <strong>{userDetails.specialist}</strong>
                </p>
              )}
              {userDetails.state && (
                <p>
                  State : <strong>{userDetails.state}</strong>
                </p>
              )}
              {userDetails.district && (
                <p>
                  District : <strong>{userDetails.district}</strong>
                </p>
              )}
              {userDetails.address && (
                <p>
                  Address : <strong>{userDetails.address}</strong>
                </p>
              )}
              <div className='mt-5 flex gap-2'>
                {userDetails.status === 'approved' && (
                  <SLButton
                    title={'Block user'}
                    isDisabled={userDetails._id === user._id}
                    variant={'error'}
                  />
                )}
                {userDetails.status === 'block' && (
                  <SLButton title={'Unlock user'} variant={'success'} />
                )}
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default DetailedUserModal
