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

const AddCourtModal = ({ isOpen, onClose, RelodeData }) => {
  const toast = useToast()
  const [courts, setCourts] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listCourt, setListCourt] = useState([])
  const [selectedCourtIds, setSelectedCourtIds] = useState([])

  const fetchCourts = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/court-list`,
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
      if (courts === '') {
        toast({
          title: 'Court name cannot be empty.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      setIsLoading(true)

      const response = await axios.post(
        `${api}/api/solve_litigation/contents/add-courts`,
        { name: courts.toLocaleLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchCourts()

      toast({
        title: 'Court (Institution) added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      setCourts('')

      setIsLoading(false)
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top-right',
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

      console.log(selectedCourtIds)

      const response = await axios.delete(
        `${api}/api/solve_litigation/contents/delete-court`,
        {
          data: { ids: selectedCourtIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchCourts()

      toast({
        title: 'Court(s) deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      setSelectedCourtIds([])
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
      setSelectedCourtIds([...selectedCourtIds, id])
    } else {
      setSelectedCourtIds(selectedCourtIds.filter((polId) => polId !== id))
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'lg'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add Court ( Institution )</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listCourt.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col max-h-[350px] overflow-scroll'>
              {!listCourt ? (
                <MySpinner />
              ) : (
                listCourt.map((item) => (
                  <Checkbox
                    key={item._id}
                    className='capitalize'
                    isChecked={selectedCourtIds.includes(item._id)}
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                ))
              )}
            </div>
            {selectedCourtIds.length > 0 && (
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
          {selectedCourtIds.length === 0 && (
            <ModalBody>
              <FormControl className='flex gap-3'>
                <CustomInput
                  placeholder='Enter a Points of Law to add'
                  value={courts}
                  onChange={(e) => setCourts(e.target.value)}
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

export default AddCourtModal
