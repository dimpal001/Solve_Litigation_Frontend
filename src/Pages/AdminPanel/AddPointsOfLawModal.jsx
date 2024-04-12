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

const AddPointsOfLawModal = ({ isOpen, onClose, RelodeData }) => {
  const toast = useToast()
  const [pointsOfLaw, setPointsOfLaw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listPOL, setListPOL] = useState([])
  const [selectedPOLIds, setSelectedPOLIds] = useState([])

  const fetchPOL = async () => {
    const token = sessionStorage.getItem('token')
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/contents/pol-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setListPOL(response.data)
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
    fetchPOL()
  }, [])

  const handleAddingPOL = async () => {
    const token = sessionStorage.getItem('token')
    try {
      if (pointsOfLaw === '') {
        toast({
          title: 'Point of Law cannot be empty.',
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        return
      }

      setIsLoading(true)

      const response = await axios.post(
        `${api}/api/solve_litigation/contents/add-pol`,
        { name: pointsOfLaw.toLocaleLowerCase() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchPOL()

      toast({
        title: 'Point of law added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      setPointsOfLaw('')

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

  const handleDeleteSelectedPOLs = async () => {
    const token = sessionStorage.getItem('token')
    try {
      setIsLoading(true)

      console.log(selectedPOLIds)

      const response = await axios.delete(
        `${api}/api/solve_litigation/contents/delete-pols`,
        {
          data: { ids: selectedPOLIds },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      console.log(response)

      fetchPOL()

      toast({
        title: 'Selected point of law deleted successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      })

      setSelectedPOLIds([])
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

  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedPOLIds([...selectedPOLIds, id])
    } else {
      setSelectedPOLIds(selectedPOLIds.filter((polId) => polId !== id))
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'sm'} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add a Point of Law</ModalHeader>
          <ModalCloseButton />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listPOL.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col'>
              {!listPOL ? (
                <MySpinner />
              ) : (
                listPOL.map((item) => (
                  <Checkbox
                    key={item._id}
                    className='capitalize'
                    isChecked={selectedPOLIds.includes(item._id)}
                    onChange={(e) => handleCheckboxChange(e, item._id)}
                  >
                    {item.name}
                  </Checkbox>
                ))
              )}
            </div>
            {selectedPOLIds.length > 0 && (
              <Button
                colorScheme='red'
                borderRadius={'sm'}
                onClick={handleDeleteSelectedPOLs}
                isLoading={isLoading}
                loadingText={'Deleting...'}
              >
                Delete Selected Item(s)
              </Button>
            )}
          </ModalBody>
          {selectedPOLIds.length === 0 && (
            <ModalBody>
              <FormControl className='flex gap-3'>
                <CustomInput
                  placeholder='Enter a Point of Law to add'
                  value={pointsOfLaw}
                  onChange={(e) => setPointsOfLaw(e.target.value)}
                />
                <PrimaryButton
                  isLoading={isLoading}
                  loadingText={'Adding...'}
                  onClick={handleAddingPOL}
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

export default AddPointsOfLawModal
