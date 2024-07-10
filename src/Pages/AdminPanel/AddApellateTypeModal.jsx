import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  SLSpinner,
} from '../../Components/Customs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const AddApellateTypeModal = ({ isOpen, onClose, RelodeData }) => {
  const [apellateTypes, setApellateTypes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listCourt, setListCourt] = useState([])
  const [selectedApellateIds, setSelectedApellateIds] = useState([])

  const fetchCourts = async () => {
    const token = localStorage.getItem('token')
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchCourts()
  }, [])

  const handleAddingCourt = async () => {
    const token = localStorage.getItem('token')
    try {
      if (apellateTypes === '') {
        enqueueSnackbar('Apellate type cannot be empty!', { variant: 'error' })
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

      enqueueSnackbar('Points of law added successfully', {
        variant: 'success',
      })

      setApellateTypes('')

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

      enqueueSnackbar('Apellate(s) deleted successfully', {
        variant: 'success',
      })

      setSelectedApellateIds([])
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
      setSelectedApellateIds([...selectedApellateIds, id])
    } else {
      setSelectedApellateIds(
        selectedApellateIds.filter((polId) => polId !== id)
      )
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'lg'}>
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add Apellate Type</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listCourt.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col max-h-[350px] overflow-scroll'>
              {!listCourt ? (
                <SLSpinner />
              ) : (
                listCourt.map((item) => (
                  <label key={item._id} className='inline-flex items-center'>
                    <input
                      type='checkbox'
                      defaultChecked={selectedApellateIds.includes(item._id)}
                      className='form-checkbox'
                      onChange={(e) => handleCheckboxChange(e, item._id)}
                    />
                    <span className='ml-2 capitalize'>{item.name}</span>
                  </label>
                ))
              )}
            </div>
            {selectedApellateIds.length > 0 && (
              <SLButton
                onClick={handleDeleteSelectedCourt}
                isLoading={isLoading}
                loadingText={'Deleting...'}
                variant={'error'}
                width={'full'}
                title={'Delete selected item(s)'}
              />
            )}
          </ModalBody>
          {selectedApellateIds.length === 0 && (
            <ModalFooter>
              <CustomInput
                placeholder='Enter a apellate type to add'
                value={apellateTypes}
                onChange={(e) => setApellateTypes(e.target.value)}
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

export default AddApellateTypeModal
