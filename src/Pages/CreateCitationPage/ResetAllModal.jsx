import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
} from '../../Components/Customs'
const ResetAllModal = ({ isOpen, onClose, onClick }) => {
  return (
    <div>
      <Modal size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent borderRadius={0}>
          <ModalHeader>Reset All ?</ModalHeader>
          <ModalCloseButton onClick={onClose} />

          <ModalFooter>
            <SLButton
              title={'Cancel'}
              variant={'secondary'}
              onClick={onClose}
            />
            <SLButton
              variant={'error'}
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
