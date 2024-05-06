import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useToast,
} from '@chakra-ui/react'
import {
  CustomInput,
  PrimaryButton,
} from '../../Components/Customs'
import { useContext, useState } from 'react'
import { api } from '../../Components/Apis'
import { UserContext } from '../../UserContext'
import axios from 'axios'
import { Colors } from '../../Components/Colors'

const ChangePasswordModal = ({ isModalOpen, closeModal }) => {
  const toast = useToast()
  const [isSent, setIsSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPass, setCurrentPass] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const { user } = useContext(UserContext)

  const handleSubmit = () => {
    if (currentPass === '') {
      toast({
        title: 'Enter a valid current password',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true
      })
      return
    }
    if (pass === '') {
      toast({
        title: 'Enter a valid new password',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true
      })
      return
    }
    if (pass !== confirmPass) {
      toast({
        title: 'Password and confirm password must be same',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true
      })
      return
    }

    toast({
      title: 'Password changed',
      status: 'success',
      position: 'top',
      duration: 2000,
      isClosable: true
    })
    closeModal()
  }

  const handleSendReset = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(`${api}/api/solve_litigation/auth/reset-password/${user.email}`)

      console.log(response.data)
      if (response.data.status === 'sent') {
        setIsSent(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Modal size={'md'} isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalCloseButton />
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-3'>
              <CustomInput value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} placeholder='Enter current password' />
              <CustomInput value={pass} onChange={(e) => setPass(e.target.value)} placeholder='Enter a new Password' />
              <CustomInput value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder='Confirm new password' />
            </div>
            <div>
              {!isLoading && <p onClick={handleSendReset} className='text-center font-bold hover:underline text-base text-primary cursor-pointer pt-2'>Send reset link ?</p>}
              <div className='flex justify-center pt-2'>
                {isLoading && <Spinner color={Colors.primary} />}
              </div>
            </div>
            <div>
              <p className={`p-3 ${isSent ? 'block' : 'hidden'} mx-1 mt-3 bg-green-200 text-center rounded-[3px]`}>Password reset link has been <br className='lg:hidden' /> sent to your registered mail</p>
            </div>
          </ModalBody>

          <ModalFooter className='flex gap-3'>
            <Button colorScheme='gray' onClick={closeModal} rounded={'sm'}>Close</Button>
            <PrimaryButton onClick={handleSubmit} title={'Submit'} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChangePasswordModal
