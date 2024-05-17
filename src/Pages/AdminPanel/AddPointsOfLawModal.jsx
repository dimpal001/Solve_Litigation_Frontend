import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  MySpinner,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'
import { Checkbox, FormControl } from '@chakra-ui/react'

const AddPointsOfLawModal = ({ isOpen, onClose, RelodeData }) => {
  const [pointsOfLaw, setPointsOfLaw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listPOL, setListPOL] = useState([])
  const [selectedPOLIds, setSelectedPOLIds] = useState([])

  const fetchPOL = async () => {
    const token = localStorage.getItem('token')
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchPOL()
  }, [])

  const handleAddingPOL = async () => {
    const token = localStorage.getItem('token')
    try {
      if (pointsOfLaw === '') {
        enqueueSnackbar('Point of Law cannot be empty!', { variant: 'error' })
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

      enqueueSnackbar('Point of law added successfully', { variant: 'success' })

      setPointsOfLaw('')

      setIsLoading(false)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsLoading(false)
      RelodeData()
    }
  }

  const handleDeleteSelectedPOLs = async () => {
    const token = localStorage.getItem('token')
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

      enqueueSnackbar('Selected point of law deleted successfully', {
        variant: 'success',
      })

      setSelectedPOLIds([])
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
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
      <Modal isOpen={isOpen} size={'lg'}>
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add a Point of Law</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listPOL.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col max-h-[350px] overflow-scroll'>
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
              <SLButton
                variant={'error'}
                onClick={handleDeleteSelectedPOLs}
                isLoading={isLoading}
                loadingText={'Deleting...'}
                title={'Delete Selected Item(s)'}
              />
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
                <SLButton
                  variant={'primary'}
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
