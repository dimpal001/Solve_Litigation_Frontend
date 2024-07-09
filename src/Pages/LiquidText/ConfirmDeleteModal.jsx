import { useState } from 'react'
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { api } from '../../Components/Apis'

const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  title,
  type,
  clientId,
  argumentId,
  liquidText,
  reload,
}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      let endpoint = ''

      switch (type) {
        case 'delete-client':
          endpoint = `${api}/api/solve_litigation/liquid-text/delete-client/${clientId}`
          break
        case 'delete-argument':
          endpoint = `${api}/api/solve_litigation/liquid-text/delete-argument/${clientId}/${argumentId}`
          break
        case 'delete-liquid-text':
          endpoint = `${api}/api/solve_litigation/liquid-text/delete-liquid-text/${clientId}/${argumentId}/${liquidText}`
          break
        default:
          throw new Error('Invalid delete type')
      }

      const response = await axios.delete(endpoint, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      enqueueSnackbar(response.data.message, {
        variant: 'success',
      })
      reload()
      onClose()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Delete {title}?</ModalHeader>
        <ModalFooter>
          <SLButton
            title={'Cancel'}
            variant={'secondary'}
            onClick={onClose}
            disabled={loading}
          />
          <SLButton
            title={'Delete'}
            variant={'error'}
            iconColor={'white'}
            loadingText={'Deleting...'}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmDeleteModal
