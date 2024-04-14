import {
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import {
  CustomInput,
  PrimaryButton,
  TextButton,
} from '../../Components/Customs'
import { useContext, useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { UserContext } from '../../UserContext'

const ChangeEmailPhone = ({
  isModalOpen,
  selectedModal,
  closeModal,
  reload,
}) => {
  const [data, setData] = useState('')
  const { user } = useContext(UserContext)
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const handleChangeDetails = async () => {
    try {
      setIsLoading(true)
      const token = sessionStorage.getItem('token')
      const response = await axios.put(
        `${api}/api/solve_litigation/auth/update-details/${user._id}`,
        { title: selectedModal, data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
      reload()
      closeModal()
    } catch (error) {
      console.error('Error occurred while updating details:', error.message)
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Modal size={'sm'} isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalCloseButton />
          <ModalHeader>
            {selectedModal === 'email' ? 'Change Email' : 'Change Phone Number'}
          </ModalHeader>
          <ModalBody>
            <div>
              <FormControl>
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
              </FormControl>
            </div>
          </ModalBody>

          <ModalFooter>
            <TextButton size={'sm'} onClick={closeModal} title={'Cancel'} />
            <PrimaryButton
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