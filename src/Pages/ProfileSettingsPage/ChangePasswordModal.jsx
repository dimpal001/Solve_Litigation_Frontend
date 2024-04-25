import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import {
  CustomInput,
  PrimaryButton,
} from '../../Components/Customs'
import { useState } from 'react'

const ChangePasswordModal = ({ isModalOpen, closeModal }) => {
  const toast = useToast()
  const [isSent, setIsSent] = useState(false)
  const [currentPass, setCurrentPass] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

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

  const handleSendReset = () => {
    setIsSent(true)
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
              <p onClick={handleSendReset} className='text-center text-sm text-primary cursor-pointer pt-2'>Send reset link ?</p>
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
