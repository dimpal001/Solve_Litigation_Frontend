import { useState } from 'react'
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

const ShareCitationModal = ({ isOpen, onClose, citation }) => {
  const [copy, setCopy] = useState('Copy Link')
  const [email, setEmail] = useState('')
  const [sharing, setSharing] = useState(false)

  const citationLink = `https://solvelitigation.com/detailed-citation/${citation}`

  const handleCopy = () => {
    navigator.clipboard
      .writeText(citationLink)
      .then(() => {
        setCopy('Link copied')
      })
      .catch((error) => {
        console.error('Failed to copy:', error)
      })
  }

  const handleShare = async () => {
    if (email === '') {
      enqueueSnackbar('Enter a valid email.', { variant: 'error' })
      return
    }
    try {
      setSharing(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/share`,
        {
          email: email,
          link: citationLink,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log(response)
      onClose()
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setSharing(false)
    }
    console.log(email)
  }

  return (
    <div>
      <Modal size={'md'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Share the Judgement</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div
              onClick={handleCopy}
              className={`${
                copy === 'Copy Link' ? 'text-primary' : 'text-success'
              } cursor-pointer`}
            >
              {copy}
            </div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Enter email address'
              className='w-full max-md:text-base p-2 my-2 rounded-sm bg-transparent border focus:outline-none'
            />
          </ModalBody>
          <ModalFooter>
            <SLButton
              title={'Cancel'}
              variant={'secondary'}
              onClick={onClose}
            />
            <SLButton
              isLoading={sharing}
              iconColor={'white'}
              loadingText={'Sharing...'}
              title={'Share'}
              onClick={handleShare}
              variant={'success'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ShareCitationModal
