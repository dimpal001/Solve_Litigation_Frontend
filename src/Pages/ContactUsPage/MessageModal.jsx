import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '../../Components/Customs'

const MessageModal = ({ isOpen, onClose, user }) => {
  return (
    <div>
      <Modal size={'lg'} isOpen={isOpen}>
        <ModalContent rounded={'sm'}>
          <ModalHeader>
            Messaged by <span className='text-primary'>{user.name}</span>
          </ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <p>{user.message}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default MessageModal
