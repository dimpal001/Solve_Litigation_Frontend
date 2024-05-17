import axios from 'axios'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import { api } from '../../Components/Apis'
import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'

const AddToNotificationModal = ({ isOpen, onClose, citation }) => {
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async () => {
    if (title === '') {
      enqueueSnackbar('Enter a valid title', { variant: 'error' })
      return
    }
    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/notification`,
        {
          title: title,
          link: `https://solvelitigation.com/detailed-citation/${citation._id}`,
          citationId: citation._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      onClose()
      console.log(response.data)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
      console.log(error)
    } finally {
      setIsSubmitting(true)
      setIsSubmitting(false)
    }
  }
  return (
    <div>
      <Modal size={'sm'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>
            <div>
              <p>Add to Notification</p>
              <p className='text-sm text-black'>
                This title will be show in the notification
              </p>
            </div>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div className='flex flex-col gap-2'>
              <label htmlFor='title'>Enter a Title</label>
              <input
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id='title'
                placeholder='Title'
                autoComplete='off'
                className='p-2 border border-primary focus:outline-none'
              />
              <SLButton
                onClick={handleSubmit}
                title={'Submit'}
                isLoading={isSubmitting}
                loadingText={'Submitting...'}
                variant={'primary'}
                width={'100%'}
              />
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddToNotificationModal
