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

const AddLawModal = ({ isOpen, onClose, RelodeData }) => {
  const toast = useToast()
  const [law, setLaw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listLaw, setListLaw] = useState([])
  const [selectedLawIds, setSelectedLawIds] = useState([])

  const fetchLaw = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/law-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListLaw(response.data)
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
    fetchLaw()
  }, [])

  const handleAddingLaw = async () => {
    const token = sessionStorage.getItem('token')
    try {
      if (law === '') {
        toast({
          title: 'Law name cannot be empty.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      setIsLoading(true)

      const response = await axios.post(
        `${api}/api/solve_litigation/contents/add-law`,
        { name: law.toLocaleLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchLaw()

      toast({
        title: 'Points of law added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setLaw('')

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

  const handleDeleteSelectedPOLs = async () => {
    const token = sessionStorage.getItem('token')
    try {
      setIsLoading(true)

      console.log(selectedLawIds)

      const response = await axios.delete(
        `${api}/api/solve_litigation/contents/delete-laws`,
        {
          data: { ids: selectedLawIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchLaw()

      toast({
        title: 'Selected law(s) deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })

      setSelectedLawIds([])
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
      setSelectedLawIds([...selectedLawIds, id])
    } else {
      setSelectedLawIds(selectedLawIds.filter((lawId) => lawId !== id))
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'sm'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add a Law</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listLaw.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col'>
              {!listLaw ? (
                <MySpinner />
              ) : (
                listLaw.map((item) => (
                  <Checkbox
                    key={item._id}
                    className='capitalize'
                    isChecked={selectedLawIds.includes(item._id)}
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                ))
              )}
            </div>
            {selectedLawIds.length > 0 && (
              <Button
                colorScheme='red'
                onClick={handleDeleteSelectedPOLs}
                isLoading={isLoading}
                loadingText={'Deleting...'}
              >
                Delete Selected Item(s)
              </Button>
            )}
          </ModalBody>
          {selectedLawIds.length === 0 && (
            <ModalBody>
              <FormControl className='flex gap-3'>
                <CustomInput
                  placeholder='Enter a Points of Law to add'
                  value={law}
                  onChange={(e) => setLaw(e.target.value)}
                />
                <PrimaryButton
                  isLoading={isLoading}
                  loadingText={'Adding...'}
                  onClick={handleAddingLaw}
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

export default AddLawModal
