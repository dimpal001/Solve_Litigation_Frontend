import { Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { RedButton } from "../../Components/Customs"
import { useState } from "react"
import axios from "axios"
import { api } from "../../Components/Apis"

const DeleteUserModal = ({ user, isOpen, onClose, relode }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const toast = useToast()
    const handleDeleteUser = async () => {
        try {
            setIsDeleting(true)
            const token = sessionStorage.getItem('token')
            const response = await axios.delete(`${api}/api/solve_litigation/auth/delete-user/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast({
                title: response.data.message,
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
        } catch (error) {
            toast({
                title: error.response.data.message,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top',
            })
        } {
            setIsDeleting(false)
            onClose()
            relode()
        }
    }
    return (
        <div>
            <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={0}>
                    <ModalHeader>Delete {user.fullName} ?</ModalHeader>
                    <ModalCloseButton />
                    <ModalFooter className="flex justify-end gap-3">
                        <Button borderRadius={'sm'}>Cancel</Button>
                        <RedButton onClick={handleDeleteUser} isLoading={isDeleting} loadingText={'Deleting...'} title={'Delete'} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DeleteUserModal