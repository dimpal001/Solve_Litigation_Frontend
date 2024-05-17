import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const DeleteCitationModal = ({ isOpen, onClose }) => {
  const { id } = useParams()
  console.log(id)
  const navigate = useNavigate()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    try {
      setIsDeleting(true)
      const token = localStorage.getItem('token')
      const response = await axios.delete(
        `${api}/api/solve_litigation/citation/delete-citation/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setIsDeleting(false)
      enqueueSnackbar(response.data.message, { variant: 'success' })
      navigate('/admin-dashboard/review-citation')
    } catch (error) {
      console.error(error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      onClose()
      setIsDeleting(false)
    }
  }

  return (
    <div className='max-h-[300px]'>
      <Modal size={'sm'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Delete Citation ?</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody> This action cannot be undone</ModalBody>

          <ModalFooter className='flex gap-5'>
            <SLButton
              title={'Cancel'}
              variant={'secondary'}
              onClick={onClose}
            />
            <SLButton
              variant={'error'}
              isLoading={isDeleting}
              loadingText={'Deleting...'}
              onClick={handleDelete}
              title={'Delete'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default DeleteCitationModal
