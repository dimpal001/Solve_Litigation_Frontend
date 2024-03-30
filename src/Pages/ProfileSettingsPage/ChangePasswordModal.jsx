import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import {
  CustomInput,
  PrimaryButton,
  TextButton,
} from '../../Components/Customs'

const ChangePasswordModal = ({ isModalOpen, closeModal }) => {
  return (
    <div>
      <Modal size={'sm'} isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalCloseButton />
          <ModalHeader>Change Password</ModalHeader>
          <ModalBody>
            <div className='flex flex-col gap-3'>
              <CustomInput size={'sm'} placeholder='Enter current password' />
              <CustomInput size={'sm'} placeholder='Enter a new Password' />
              <CustomInput size={'sm'} placeholder='Confirm new password' />
            </div>
          </ModalBody>

          <ModalFooter>
            <TextButton size={'sm'} onClick={closeModal} title={'Cancel'} />
            <PrimaryButton size={'sm'} title={'Submit'} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ChangePasswordModal
