import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Button,
} from '@chakra-ui/react'
import { PrimaryButton } from './Customs'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'

const ConfirmLogout = ({ isOpen, onClose }) => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const toast = useToast()

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    onClose()
    toast({
      title: 'Logout Successfull',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'sm'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='p-lg font-extrabold'>
            Do you want to Logout ?
          </ModalBody>

          <ModalFooter className='gap-3'>
            <Button borderRadius={3} onClick={onClose}>
              Cancel
            </Button>
            <PrimaryButton onClick={handleLogout} title={'Logout'} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ConfirmLogout
