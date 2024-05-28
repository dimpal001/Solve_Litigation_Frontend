import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  UploadIcon,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const SendFeedbackModal = ({ isOpen, onClose, form }) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState(form.feedback)

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/legal-advice/give-feedback/${form._id}`,
        {
          feedback: feedback,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
      console.log(error)
    } finally {
      setIsSubmitting(false)
      onClose()
    }
  }

  return (
    <>
      <Modal size={'3xl'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>{`${
            !form.feedback ? 'Give a feedback' : 'Feedback'
          } to ${form.user.fullName}`}</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            {form.feedback ? (
              <p>{form.feedback}</p>
            ) : (
              <textarea
                rows={8}
                placeholder='Write your feedback...'
                className='border w-full focus:outline-none focus:border-blue-300 rounded-sm p-3'
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              ></textarea>
            )}
          </ModalBody>
          {!form.feedback && (
            <ModalFooter>
              <div className='flex justify-between items-center w-full'>
                <div>
                  <SLButton
                    title={'Upload Attachment'}
                    variant={'primary'}
                    icon={<UploadIcon size={25} />}
                  />
                </div>
                <div className='flex items-center gap-5'>
                  <SLButton
                    onClick={onClose}
                    title={'Cancel'}
                    variant={'secondary'}
                  />
                  <SLButton
                    onClick={handleSubmit}
                    isLoading={isSubmitting}
                    iconColor={'white'}
                    loadingText={'Submitting...'}
                    title={'Submit'}
                    variant={'primary'}
                  />
                </div>
              </div>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SendFeedbackModal
