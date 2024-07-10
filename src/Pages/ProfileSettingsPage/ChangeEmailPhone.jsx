import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import { useContext, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const ChangeEmailPhone = ({
  isModalOpen,
  selectedModal,
  closeModal,
  reload,
}) => {
  const [data, setData] = useState('')
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeDetails = async () => {
    if (data === '') {
      enqueueSnackbar('Enter a valid mobile number', { variant: 'error' })
      return
    }

    if (data.length < 10 || !/^\d+$/.test(data)) {
      enqueueSnackbar('Phone number should have 10 numeric characters!', {
        variant: 'error',
      })
      return
    }

    try {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      const response = await axios.put(
        `${api}/api/solve_litigation/auth/update-details/${user._id}`,
        { title: selectedModal, data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'success' })
      reload()
      closeModal()
    } catch (error) {
      console.error('Error occurred while updating details:', error.message)
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Modal size={'sm'} isOpen={isModalOpen} onClose={closeModal}>
        {/* <ModalOverlay /> */}
        <ModalContent borderRadius={0}>
          <ModalCloseButton onClick={closeModal} />
          <ModalHeader>
            {selectedModal === 'email' ? 'Change Email' : 'Change Phone Number'}
          </ModalHeader>
          <ModalBody>
            <div>
              <CustomInput
                onChange={(e) => setData(e.target.value)}
                value={data}
                size={'sm'}
                placeholder={
                  selectedModal === 'email'
                    ? 'Enter a new email address'
                    : 'Enter a new phone number'
                }
              />
            </div>
          </ModalBody>

          <ModalFooter>
            <SLButton
              onClick={closeModal}
              variant={'secondary'}
              title={'Close'}
            />
            <SLButton
              variant={'primary'}
              size={'sm'}
              isLoading={isLoading}
              loadingText={'Submitting...'}
              onClick={handleChangeDetails}
              title={'Submit'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChangeEmailPhone
