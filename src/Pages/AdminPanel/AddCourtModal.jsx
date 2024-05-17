import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  MySpinner,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'
import { Checkbox } from '@chakra-ui/react'

const AddCourtModal = ({ isOpen, onClose, RelodeData }) => {
  const [courts, setCourts] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listCourt, setListCourt] = useState([])
  const [selectedCourtIds, setSelectedCourtIds] = useState([])

  const fetchCourts = async () => {
    const token = localStorage.getItem('token')
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchCourts()
  }, [])

  const handleAddingCourt = async () => {
    const token = localStorage.getItem('token')
    try {
      if (courts === '') {
        enqueueSnackbar('Court name cannot be empty!', { variant: 'error' })
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

      enqueueSnackbar('Court (Institution) added successfully', {
        variant: 'success',
      })

      setCourts('')

      setIsLoading(false)
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsLoading(false)
      RelodeData()
    }
  }

  const handleDeleteSelectedCourt = async () => {
    const token = localStorage.getItem('token')
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

      enqueueSnackbar('Court(s) deleted successfully', { variant: 'success' })

      setSelectedCourtIds([])
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
      setSelectedCourtIds([...selectedCourtIds, id])
    } else {
      setSelectedCourtIds(selectedCourtIds.filter((polId) => polId !== id))
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'lg'}>
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add Court ( Institution )</ModalHeader>
          <ModalCloseButton onClick={onClose} />
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
              <SLButton
                variant={'error'}
                onClick={handleDeleteSelectedCourt}
                isLoading={isLoading}
                loadingText={'Deleting...'}
                width={'full'}
                title={'Delete Selected Item(s)'}
              />
            )}
          </ModalBody>
          {selectedCourtIds.length === 0 && (
            <ModalFooter>
              <CustomInput
                placeholder='Enter a Points of Law to add'
                value={courts}
                onChange={(e) => setCourts(e.target.value)}
              />
              <SLButton
                variant={'primary'}
                isLoading={isLoading}
                loadingText={'Adding...'}
                onClick={handleAddingCourt}
                title={'Add'}
              />
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddCourtModal
