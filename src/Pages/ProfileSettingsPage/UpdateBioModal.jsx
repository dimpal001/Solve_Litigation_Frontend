import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'

const UpdateBioModal = ({ isOpen, onClose, reload }) => {
  const handleSubmit = () => {
    reload()
  }

  return (
    <Modal isOpen={isOpen} size={'md'}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Update Bio</ModalHeader>
        <ModalBody></ModalBody>
        <ModalFooter>
          <SLButton variant={'secondary'} onClick={onClose} title={'Close'} />
          <SLButton
            variant={'primary'}
            onClick={handleSubmit}
            title={'Update'}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UpdateBioModal
