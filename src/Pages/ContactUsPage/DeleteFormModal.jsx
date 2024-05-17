import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const DeleteFormModal = ({ isOpen, onClose, form, reload }) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `${api}/api/solve_litigation/contact/${form._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'success' })
      onClose()
    } catch (error) {
      console.log(error)
    } finally {
      reload()
      setIsDeleting(false)
    }
  }
  return (
    <div>
      <Modal size={'sm'} isOpen={isOpen}>
        <ModalContent rounded={'sm'}>
          <ModalHeader>Delete form ?</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <p>This function cannot be undone.</p>
          </ModalBody>
          <ModalFooter>
            <SLButton
              onClick={onClose}
              variant={'secondary'}
              title={'Cancel'}
            />
            <SLButton
              variant={'error'}
              onClick={handleDelete}
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

export default DeleteFormModal
