import { useState } from 'react'
import axios from 'axios'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import { api } from '../../Components/Apis'
import { useSnackbar } from 'notistack'

const ManageTopicModal = ({ isOpen, onClose, topic, reload }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [topicName, setTopicName] = useState(topic.topic)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await axios.delete(
        `${api}/api/solve_litigation/study-material/topics/${topic._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      enqueueSnackbar('Topic deleted successfully', { variant: 'success' })
      onClose()
      reload()
    } catch (error) {
      console.error('Error deleting topic:', error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await axios.put(
        `${api}/api/solve_litigation/study-material/topics/${topic._id}`,
        {
          topic: topicName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      enqueueSnackbar('Topic updated successfully', { variant: 'success' })
      onClose()
      reload()
    } catch (error) {
      console.error('Error updating topic:', error)
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <Modal size={'xl'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>{topic.topic}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div>
              <label htmlFor='topic' className='text-base'>
                Topic Name
              </label>
              <input
                id='topic'
                type='text'
                value={topicName}
                onChange={(e) => setTopicName(e.target.value)}
                className='w-full p-2 bg-transparent focus:outline-none focus:border-primary border'
              />
            </div>
            <p className='text-center text-red-500 text-sm pt-5 px-5'>
              When you delete a topic, all associated questions and answers will
              be permanently deleted. This action cannot be undone
            </p>
          </ModalBody>
          <ModalFooter>
            {!isUpdating && (
              <SLButton
                title={'Delete'}
                isLoading={isDeleting}
                loadingText={'Deleting...'}
                variant={'error'}
                onClick={handleDelete}
              />
            )}
            {!isDeleting && (
              <SLButton
                title={'Update'}
                isLoading={isUpdating}
                loadingText={'Updating...'}
                variant={'primary'}
                onClick={handleUpdate}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ManageTopicModal
