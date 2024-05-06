import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useToast } from "@chakra-ui/react"
import { RedButton } from "../../Components/Customs"
import axios from "axios"
import { api } from "../../Components/Apis"
import { useState } from "react"

const DeleteFormModal = ({ isOpen, onClose, form, reload }) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const toast = useToast()
    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const token = sessionStorage.getItem('token')
            const response = await axios.delete(`${api}/api/solve_litigation/contact/${form._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            onClose()
        } catch (error) {
            console.log(error)
        } finally {
            reload()
            setIsDeleting(false)
        }
    }
    return (
        <div>
            <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={'sm'}>
                    <ModalHeader>Delete form ?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <p>This function cannot be undone.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button rounded={'sm'} onClick={onClose} mr={3} >Cancel</Button>
                        <RedButton onClick={handleDelete} isLoading={isDeleting} loadingText={'Deleting...'} title={'Delete'} />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DeleteFormModal