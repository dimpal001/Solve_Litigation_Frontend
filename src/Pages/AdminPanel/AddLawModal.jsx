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

const AddLawModal = ({ isOpen, onClose, RelodeData }) => {
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
      enqueueSnackbar(error.response.data.message, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchLaw()
  }, [])

  const handleAddingLaw = async () => {
    const token = sessionStorage.getItem('token')
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
      <Modal isOpen={isOpen} size={'lg'}>
        <ModalContent borderRadius={0} className='pb-5'>
          <ModalHeader>Add a Law</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody className='p-lg flex flex-col gap-3'>
            {listLaw.length !== 0 && (
              <p className='text-red-600 text-base'>Select to delete</p>
            )}
            <div className='flex flex-col max-h-[350px] overflow-scroll'>
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
              <SLButton
                width={'full'}
                variant={'error'}
                onClick={handleDeleteSelectedPOLs}
                isLoading={isLoading}
                loadingText={'Deleting...'}
                title={'Delete Selected Item(s)'}
              />
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
