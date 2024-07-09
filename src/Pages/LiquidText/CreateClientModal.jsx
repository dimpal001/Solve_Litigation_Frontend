import { useContext, useState } from 'react'
import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'
import { api } from '../../Components/Apis'

const CreateClientModal = ({ isOpen, onClose, onClientsUpdate }) => {
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    console.log('')

    try {
      const response = await axios.post(
        `${api}/api/solve_litigation/liquid-text/create-client`,
        {
          clientName,
          clientAddress,
          userId: user._id,
          userName: user.fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.status === 201) {
        onClose()
        onClientsUpdate(response.data.clients)
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        })
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal isOpen={isOpen} size={'md'}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Create a Client</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <CustomInput
              placeholder={'Client Name'}
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              required
            />
            <CustomInput
              placeholder={'Client Address'}
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              required
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <SLButton title={'Cancel'} variant={'secondary'} onClick={onClose} />
          <SLButton
            title={'Create'}
            variant={'primary'}
            loadingText={'Creating...'}
            iconColor={'white'}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateClientModal
