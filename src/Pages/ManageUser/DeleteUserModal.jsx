import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { RedButton } from '../../Components/Customs'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const DeleteUserModal = ({ user, isOpen, onClose, relode }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDeleteUser = async () => {
    try {
      setIsDeleting(true)
      const token = sessionStorage.getItem('token')
      const response = await axios.delete(
        `${api}/api/solve_litigation/auth/delete-user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
    {
      setIsDeleting(false)
      onClose()
      relode()
    }
  }
  return (
    <div>
      <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent rounded={0}>
          <ModalHeader>Delete {user.fullName} ?</ModalHeader>
          <ModalCloseButton />
          <ModalFooter className='flex justify-end gap-3'>
            <Button borderRadius={'sm'}>Cancel</Button>
            <RedButton
              onClick={handleDeleteUser}
              isLoading={isDeleting}
              loadingText={'Deleting...'}
              title={'Delete'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DeleteUserModal
