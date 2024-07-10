import axios from 'axios'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'

const ReviewActModal = ({ data, isOpen, onClose }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [isUploading, setIsUploading] = useState(false)

  const handleUplaod = async () => {
    try {
      setIsUploading(true)
      const token = localStorage.getItem('token')
      const response = await axios.post(
        `${api}/api/solve_litigation/act/upload-act`,
        {
          actData: data,
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (response.status === 201) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        onClose()
      }
      navigate('/admin-dashboard/review-acts')
    } catch (error) {
      console.error('Error uploading citation:', error)
      enqueueSnackbar('Error uploading citation. Please try again later!', {
        variant: 'error',
      })
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div className='max-h-[300px]'>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalContent
          style={{ maxHeight: '520px', overflow: 'scroll', paddingInline: 80 }}
        >
          <ModalHeader>
            <span className='text-3xl'>Review and upload</span>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div className='flex flex-col gap-y-5 border border-slate-900 p-7'>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Court Name
                </p>
                <p className='capitalize text-lg'>{data.institutionName}</p>
              </div>
              {data.index && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>Index</p>
                  <p className='text-lg text-justify'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.index,
                      }}
                    />
                  </p>
                </div>
              )}
              <div>
                <p className='text-sm font-extrabold text-primary'>Title</p>
                <p className='capitalize text-lg'>{data.title}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  judgements
                </p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.judgements,
                    }}
                  />
                </p>
              </div>
              {data.notification && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Notification
                  </p>
                  <p className='text-lg text-justify'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.notification,
                      }}
                    />
                  </p>
                </div>
              )}
            </div>
          </ModalBody>

          <ModalFooter className='flex gap-5'>
            <SLButton variant={'error'} onClick={onClose} title={'Edit'} />
            <SLButton
              variant={'success'}
              isLoading={isUploading}
              loadingText={'Uploading...'}
              onClick={handleUplaod}
              title={'Upload'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReviewActModal
