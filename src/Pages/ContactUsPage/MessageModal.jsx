import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/react"

const MessageModal = ({ isOpen, onClose, user }) => {
    return (
        <div>
            <Modal size={'lg'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={'sm'}>
                    <ModalHeader>Message by <span className="text-primary">{user.name}</span></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>{user.message}</p>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default MessageModal