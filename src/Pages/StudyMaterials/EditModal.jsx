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

const EditModal = ({ isOpen, onClose, material, topicId, reload }) => {
  const [isUpdating, setIsUpdating] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [updatedQuestion, setUpdatedQuestion] = useState(material.question)
  const [updatedAnswer, setUpdatedAnswer] = useState(material.answer)
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = async () => {
    console.log(
      'Deleting question with ID:',
      material._id,
      'from topic:',
      topicId
    )
    setIsDeleting(true)
    try {
      await axios.delete(
        `${api}/api/solve_litigation/study-material/topics/${topicId}/questions/${material._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      enqueueSnackbar('Question deleted successfully', { variant: 'success' })
      reload()
      onClose()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsDeleting(false)
    }
  }

  const handleUpdate = async () => {
    setIsUpdating(true)
    try {
      await axios.put(
        `${api}/api/solve_litigation/study-material/topics/${topicId}/questions/${material._id}`,
        { question: updatedQuestion, answer: updatedAnswer },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      enqueueSnackbar('Question updated successfully', { variant: 'success' })
      reload()
      onClose()
    } catch (error) {
      enqueueSnackbar('Failed to update question', { variant: 'error' })
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <div>
      <Modal size={'2xl'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Edit Question/Answer</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div>
              <label htmlFor='question' className='text-sm'>
                Question
              </label>
              <textarea
                id='question'
                value={updatedQuestion}
                onChange={(e) => setUpdatedQuestion(e.target.value)}
                className='w-full border p-2 bg-transparent focus:outline-none text-base focus:border-primary rounded-sm'
              ></textarea>
            </div>
            <div className='mt-3'>
              <label htmlFor='answer' className='text-sm'>
                Answer
              </label>
              <textarea
                id='answer'
                rows={7}
                value={updatedAnswer}
                onChange={(e) => setUpdatedAnswer(e.target.value)}
                className='w-full border bg-transparent text-base p-2 focus:outline-none focus:border-primary rounded-sm'
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            {!isUpdating && (
              <SLButton
                onClick={handleDelete}
                title={'Delete'}
                loadingText={'Deleting...'}
                isLoading={isDeleting}
                iconColor={'white'}
                variant={'error'}
              />
            )}
            {!isDeleting && (
              <SLButton
                onClick={handleUpdate}
                title={'Update'}
                loadingText={'Updating...'}
                isLoading={isUpdating}
                iconColor={'white'}
                variant={'primary'}
              />
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default EditModal
