import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from './Customs'
import { useContext } from 'react'
import { UserContext } from '../UserContext'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const ConfirmLogout = ({ isOpen, onClose }) => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    setUser(null)
    sessionStorage.removeItem('jwtToken')
    sessionStorage.removeItem('user')
    navigate('/')
    onClose()
    enqueueSnackbar('Logout Successfull', { variant: 'success' })
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'sm'}>
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody className='p-lg font-extrabold'>
            Do you want to Logout ?
          </ModalBody>

          <ModalFooter className='gap-3'>
            <SLButton
              variant={'secondary'}
              onClick={onClose}
              title={'Cancel'}
            />
            <SLButton
              variant={'primary'}
              onClick={handleLogout}
              title={'Logout'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ConfirmLogout
