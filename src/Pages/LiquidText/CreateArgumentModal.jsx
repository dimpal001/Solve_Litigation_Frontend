import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  CustomInput,
  UploadButton,
} from '../../Components/Customs'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { api } from '../../Components/Apis'

const CreateArgumentModal = ({
  isOpen,
  onClose,
  clientId,
  onArgumentCreated,
}) => {
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('') // State to store the selected file name
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
    setFileName(selectedFile.name) // Set the file name when a file is selected
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (title === '') {
      enqueueSnackbar('Argument name is required', {
        variant: 'error',
      })
      return
    }
    if (file === null) {
      enqueueSnackbar('File is required', {
        variant: 'error',
      })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('file', file)

      const response = await axios.post(
        `${api}/api/solve_litigation/liquid-text/create-argument/${clientId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      if (response.status === 201) {
        onClose()
        enqueueSnackbar(response.data.message, {
          variant: 'success',
        })

        // Call the parent component callback with the created argument data
        onArgumentCreated(response.data.arguments)
      } else {
        enqueueSnackbar(response.data.error, {
          variant: 'error',
        })
      }
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal size={'md'} isOpen={isOpen}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Create an Argument</ModalHeader>
        <ModalBody>
          <div className='min-h-[100px]'>
            <form
              onSubmit={handleSubmit}
              className='flex h-full flex-col gap-3'
            >
              <CustomInput
                placeholder={'Argument Title'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <input
                type='file'
                id='uploadFile'
                className='hidden'
                onChange={handleFileChange}
                required
              />
              <div className='flex gap-2 items-center'>
                <label htmlFor='uploadFile' className='cursor-pointer flex'>
                  <UploadButton />
                </label>
                <span className='text-sm'>{fileName}</span>{' '}
                {/* Display selected file name */}
              </div>
            </form>
          </div>
        </ModalBody>
        <ModalFooter>
          <SLButton title={'Cancel'} variant={'secondary'} onClick={onClose} />
          <SLButton
            title={'Create'}
            variant={'primary'}
            loadingText={'Creating...'}
            onClick={handleSubmit}
            isLoading={loading}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateArgumentModal
