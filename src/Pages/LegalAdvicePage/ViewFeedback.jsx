import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
} from '../../Components/Customs'

const ViewFeedback = ({ isOpen, onClose, feedback }) => {
  return (
    <div>
      <Modal isOpen={isOpen} size={'2xl'}>
        <ModalContent>
          <ModalHeader>Feedback from Solve Litigation</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <p>{feedback}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ViewFeedback
