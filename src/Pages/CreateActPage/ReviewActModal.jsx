import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'

import {
  PrimaryButton,
  PrimaryRedOutlineButton,
} from '../../Components/Customs'
import { MdModeEditOutline, MdOutlineCloudUpload } from 'react-icons/md'
import { useContext, useState } from 'react'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { useNavigate } from 'react-router-dom'

const ReviewActModal = ({ data, isOpen, onClose }) => {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [isUploading, setIsUploading] = useState(false)
  const toast = useToast()

  const handleUplaod = async () => {
    try {
      setIsUploading(true)
      const token = sessionStorage.getItem('token')
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
        toast({
          title: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        onClose()
      }
      navigate('/admin-dashboard/review-citation')
    } catch (error) {
      console.error('Error uploading citation:', error)
      toast({
        title: 'Error uploading citation. Please try again later',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      })
    } finally {
      setIsUploading(false)
    }
  }
  return (
    <div className='max-h-[300px]'>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{ maxHeight: '520px', overflow: 'scroll', paddingInline: 80 }}
        >
          <ModalHeader>
            <span className='text-3xl'>Review and upload</span>
          </ModalHeader>
          <ModalCloseButton />
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
                  <p className='text-sm font-extrabold text-primary'>
                    Index
                  </p>
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
                <p className='text-sm font-extrabold text-primary'>Judgments</p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.judgments,
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
            <PrimaryRedOutlineButton
              leftIcon={<MdModeEditOutline size={20} />}
              onClick={onClose}
              title={'Edit'}
            />
            <PrimaryButton
              isLoading={isUploading}
              loadingText={'Uploading...'}
              onClick={handleUplaod}
              rightIcon={<MdOutlineCloudUpload size={20} />}
              title={'Upload'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReviewActModal