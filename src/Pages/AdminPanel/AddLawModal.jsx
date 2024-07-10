import {
  CustomInput,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLSpinner,
  SLButton,
} from '../../Components/Customs'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const AddLawModal = ({ isOpen, onClose, RelodeData }) => {
  const [law, setLaw] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [listLaw, setListLaw] = useState([])
  const [selectedLawIds, setSelectedLawIds] = useState([])
  const [newLawName, setNewLawName] = useState('')
  const [isUpdating, setIsUpdating] = useState(false)

  const fetchLaw = async () => {
    const token = localStorage.getItem('token')
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchLaw()
  }, [])

  const handleAddingLaw = async () => {
    const token = localStorage.getItem('token')
    try {
      if (law === '') {
        enqueueSnackbar('Law name cannot be empty!', { variant: 'error' })
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

      enqueueSnackbar('Law added successfully', { variant: 'success' })

      setLaw('')

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

      console.log(selectedLawIds)

      await axios.delete(`${api}/api/solve_litigation/contents/delete-laws`, {
        data: { ids: selectedLawIds },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      fetchLaw()

      enqueueSnackbar('Selected law(s) deleted successfully', {
        variant: 'success',
      })

      setSelectedLawIds([])
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsLoading(false)
      RelodeData()
    }
  }

  const handleUpdateSelectedLaw = async () => {
    const token = localStorage.getItem('token')
    if (newLawName === '') {
      enqueueSnackbar('Enter a valid law name.', {
        variant: 'error',
      })
      return
    }
    try {
      setIsUpdating(true)
      setIsLoading(true)

      await axios.put(
        `${api}/api/solve_litigation/contents/update-law`,
        {
          _id: selectedLawIds[0],
          newName: newLawName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      await fetchLaw() // Assuming fetchLaw is a function that fetches updated law data

      enqueueSnackbar('The law name has been updated.', {
        variant: 'success',
      })

      setSelectedLawIds([])
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    } finally {
      setIsLoading(false)
      setIsUpdating(false)
    }
  }

  const handleCheckboxChange = (event, id, name) => {
    setNewLawName(name)
    const isChecked = event.target.checked
    if (isChecked) {
      setSelectedLawIds([...selectedLawIds, id])
    } else {
      setSelectedLawIds(selectedLawIds.filter((lawId) => lawId !== id))
    }
  }

  return (
    <div>
      <Modal isOpen={isOpen} size={'lg'}>
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add a Law</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listLaw.length !== 0 && (
              <div className='flex justify-between pb-3'>
                <p className='text-red-600 text-sm'>Select to delete</p>
                <p className='text-red-600 text-sm'>Select anyone to update</p>
              </div>
            )}
            <div className='flex flex-col max-h-[350px] overflow-scroll'>
              {!listLaw ? (
                <SLSpinner />
              ) : (
                listLaw.map((item) => (
                  <label key={item._id} className='inline-flex items-center'>
                    <input
                      type='checkbox'
                      defaultChecked={selectedLawIds.includes(item._id)}
                      className='form-checkbox'
                      onChange={(e) => handleCheckboxChange(e, item._id)}
                    />
                    <span className='ml-2 capitalize'>{item.name}</span>
                  </label>
                ))
              )}
            </div>
            {selectedLawIds.length > 0 && (
              <SLButton
                width={'full'}
                variant={'error'}
                onClick={handleDeleteSelectedPOLs}
                isLoading={isLoading}
                loadingText={'Deleting...'}
                title={'Delete Selected Item(s)'}
              />
            )}
            {selectedLawIds.length === 1 && (
              <div className='flex mt-2'>
                <input
                  value={newLawName}
                  name='newLawName'
                  onChange={(e) => setNewLawName(e.target.value)}
                  type='text'
                  placeholder='Enter edited name...'
                  className='w-full py-1 px-2 border-primary border'
                />
                <SLButton
                  isLoading={isUpdating}
                  loadingText={'Updating...'}
                  onClick={handleUpdateSelectedLaw}
                  iconColor={'white'}
                  variant={'primary'}
                  className={'border-none'}
                  title={'Update'}
                />
              </div>
            )}
          </ModalBody>
          {selectedLawIds.length === 0 && (
            <ModalFooter>
              <CustomInput
                placeholder='Enter a Points of Law to add'
                value={law}
                onChange={(e) => setLaw(e.target.value)}
              />
              <SLButton
                variant={'primary'}
                isLoading={isLoading}
                loadingText={'Adding...'}
                onClick={handleAddingLaw}
                title={'Add'}
              />
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}

export default AddLawModal
