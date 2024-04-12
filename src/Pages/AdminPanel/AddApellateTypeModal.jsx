import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
  FormControl,
  Checkbox,
  Button,
} from '@chakra-ui/react'
import { CustomInput, MySpinner, PrimaryButton } from '../../Components/Customs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'

const AddApellateTypeModal = ({ isOpen, onClose, RelodeData }) => {
  const toast = useToast()
  const [apellateTypes, setApellateTypes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listCourt, setListCourt] = useState([])
  const [selectedApellateIds, setSelectedApellateIds] = useState([])

  const fetchCourts = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/apellate-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListCourt(response.data)
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    }
  }

  useEffect(() => {
    fetchCourts()
  }, [])

  const handleAddingCourt = async () => {
    const token = sessionStorage.getItem('token')
    try {
      if (apellateTypes === '') {
        toast({
          title: 'Apellate type cannot be empty.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      setIsLoading(true)

      const response = await axios.post(
        `${api}/api/solve_litigation/contents/add-apellate`,
        { name: apellateTypes.toLocaleLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchCourts()

      toast({
        title: 'Points of law added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setApellateTypes('')

      setIsLoading(false)
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      RelodeData()
    }
  }

  const handleDeleteSelectedCourt = async () => {
    const token = sessionStorage.getItem('token')
    try {
      setIsLoading(true)

      console.log(selectedApellateIds)

      const response = await axios.delete(
        `${api}/api/solve_litigation/contents/delete-apellate`,
        {
          data: { ids: selectedApellateIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchCourts()

      toast({
        title: 'Apellate(s) deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right'

      })

      setSelectedApellateIds([])
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } finally {
      setIsLoading(false)
      RelodeData()
    }
  }

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedApellateIds([...selectedApellateIds, id])
    } else {
      setSelectedApellateIds(
        selectedApellateIds.filter((polId) => polId !== id)
      )
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'sm'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add Apellate Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listCourt.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col'>
              {!listCourt ? (
                <MySpinner />
              ) : (
                listCourt.map((item) => (
                  <Checkbox
                    key={item._id}
                    className='capitalize'
                    isChecked={selectedApellateIds.includes(item._id)}
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                ))
              )}
            </div>
            {selectedApellateIds.length > 0 && (
              <Button
                borderRadius={'sm'}
                colorScheme='red'
                onClick={handleDeleteSelectedCourt}
                isLoading={isLoading}
                loadingText={'Deleting...'}
              >
                Delete Selected Item(s)
              </Button>
            )}
          </ModalBody>
          {selectedApellateIds.length === 0 && (
            <ModalBody>
              <FormControl className='flex gap-3'>
                <CustomInput
                  placeholder='Enter a apellate type to add'
                  value={apellateTypes}
                  onChange={(e) => setApellateTypes(e.target.value)}
                />
                <PrimaryButton
                  isLoading={isLoading}
                  loadingText={'Adding...'}
                  onClick={handleAddingCourt}
                  title={'Add'}
                />
              </FormControl>
            </ModalBody>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddApellateTypeModal
