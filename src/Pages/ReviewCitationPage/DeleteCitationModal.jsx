import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, useToast, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { RedButton } from '../../Components/Customs'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'

const DeleteCitationModal = ({ isOpen, onClose }) => {
    const { id } = useParams()
    const toast = useToast()
    console.log(id)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            const token = sessionStorage.getItem('token')
            const response = await axios.delete(`${api}/api/solve_litigation/citation/delete-citation/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setIsDeleting(false);
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
            navigate('/admin-dashboard/review-citation');
        } catch (error) {
            console.error(error);
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 3000,
                position: 'top',
                isClosable: true,
            })
        } finally {
            onClose()
            setIsDeleting(false)
        }
    };

    return (
        <div className='max-h-[300px]'>
            <Modal size={'sm'} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent rounded={0}
                >
                    <ModalHeader>
                        Delete Citation ?
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody> This action cannot be undone
                    </ModalBody>

                    <ModalFooter className='flex gap-5'>
                        <Button onClick={onClose} rounded={'sm'}>Cancel</Button>
                        <RedButton isLoading={isDeleting} loadingText={'Deleting...'}
                            onClick={handleDelete}
                            leftIcon={<MdDeleteOutline size={22} />}
                            title={'Delete'}
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default DeleteCitationModal