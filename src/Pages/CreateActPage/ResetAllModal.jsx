import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'
import { RedButton, TextButton } from '../../Components/Customs'
import { MdDeleteForever } from 'react-icons/md'
const ResetAllModal = ({ isOpen, onClose, onClick }) => {
  return (
    <div>
      <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius={0}>
          <ModalHeader>Reset All ?</ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <TextButton title={'Cancel'} onClick={onClose} />
            <RedButton
              size={'sm'}
              leftIcon={<MdDeleteForever size={20} />}
              onClick={() => {
                onClick()
                onClose()
              }}
              title={'Reset'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ResetAllModal
