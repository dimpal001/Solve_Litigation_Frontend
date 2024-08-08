import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  CustomInput,
} from '../../Components/Customs'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { api } from '../../Components/Apis'

const CreateLTModal = ({
  isOpen,
  onClose,
  clientId,
  argumentId,
  onLiquidTextAdded,
}) => {
  const [liquidText, setLiquidText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (liquidText === '') {
      enqueueSnackbar('Invalid text', {
        variant: 'error',
      })
      return
    }

    if (liquidText.length < 2) {
      enqueueSnackbar(
        'It should have a minimum of 20 characters. Please select more text from the file!',
        {
          variant: 'error',
        }
      )
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${api}/api/solve_litigation/liquid-text/add-liquid-text/${clientId}/${argumentId}`,
        { liquidText },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )

      if (response.status === 200) {
        onClose()
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        })

        onLiquidTextAdded(response.data.liquidText)
      } else {
        enqueueSnackbar(response.data.error, {
          variant: 'error',
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
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Add Liquid Text</ModalHeader>
        <ModalBody>
          <p className='text-red-700 pb-2 text-center'>
            Please select any text from the argument file and paste it here in
            the input box
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <CustomInput
              placeholder={'Liquid Text'}
              value={liquidText}
              onChange={(e) => setLiquidText(e.target.value)}
              required
            />
          </form>
        </ModalBody>
        <ModalFooter>
          <SLButton
            title={'Cancel'}
            variant={'secondary'}
            onClick={onClose}
            disabled={loading}
          />
          <SLButton
            title={'Add Liquid Text'}
            variant={'primary'}
            loadingText={'Adding...'}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateLTModal
