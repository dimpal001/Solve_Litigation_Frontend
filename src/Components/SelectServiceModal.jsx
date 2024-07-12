import { enqueueSnackbar } from 'notistack'
import axios from 'axios'

import { api } from '../../src/Components/Apis'
import { useContext, useState, useEffect } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from './Customs'
import { UserContext } from '../UserContext'

const SelectServiceModal = ({ isOpen, setIsOpen }) => {
  const { user } = useContext(UserContext)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedServices, setSelectedServices] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch the existing selected services when the modal is opened
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      const token = localStorage.getItem('token')
      // Make GET request to fetch existing selected services
      axios
        .get(
          `${api}/api/solve_litigation/auth/get-selected-service/${user._id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const existingServices = response.data.selectedService || []
          setSelectedServices(existingServices)
        })
        .catch((error) => {
          console.error('Error fetching existing selected services:', error)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isOpen, user._id])

  const handleCheckboxChange = (service) => {
    setSelectedServices((prevSelectedServices) => {
      if (prevSelectedServices.includes(service)) {
        return prevSelectedServices.filter((item) => item !== service)
      } else {
        return [...prevSelectedServices, service]
      }
    })
  }

  const handleSubmit = async () => {
    if (selectedServices.length === 0) {
      enqueueSnackbar('Select a service', { variant: 'error' })
    }
    try {
      const token = localStorage.getItem('token')
      setIsSubmitting(true)
      const response = await axios.put(
        `${api}/api/solve_litigation/auth/update-selected-service/${user._id}`,
        {
          selectedService: selectedServices,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response.data)

      const updatedUser = { ...user, selectedService: selectedServices }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      window.location.reload()

      setIsOpen(false)
    } catch (error) {
      console.error('Error updating selected services:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <Modal size={'md'} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* <ModalOverlay /> */}
        <ModalContent>
          <ModalHeader>Please select the service(s) you need</ModalHeader>
          <ModalCloseButton onClick={() => setIsOpen(false)} />
          <ModalBody>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <div className='flex flex-col gap-3 py-5 px-10'>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    defaultChecked={selectedServices.includes('judgements')}
                    className='form-checkbox'
                    onChange={() => handleCheckboxChange('judgements')}
                  />
                  <span className='ml-2'>Judgements</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    defaultChecked={selectedServices.includes('legalAdvice')}
                    className='form-checkbox'
                    onChange={() => handleCheckboxChange('legalAdvice')}
                  />
                  <span className='ml-2'>Legal Advice</span>
                </label>
                <label className='inline-flex items-center'>
                  <input
                    type='checkbox'
                    defaultChecked={selectedServices.includes('studyResources')}
                    className='form-checkbox'
                    onChange={() => handleCheckboxChange('studyResources')}
                  />
                  <span className='ml-2'>Study Resources</span>
                </label>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <SLButton
              variant={'secondary'}
              mr={3}
              onClick={() => setIsOpen(false)}
              title={'Close'}
            />
            <SLButton
              variant={'primary'}
              iconColor={'white'}
              isLoading={isSubmitting}
              loadingText={'Updating...'}
              title={'Update'}
              onClick={handleSubmit}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SelectServiceModal
