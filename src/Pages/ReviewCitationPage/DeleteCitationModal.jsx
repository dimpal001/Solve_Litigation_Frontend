import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import { RedButton } from '../../Components/Customs'
import { MdDeleteOutline } from 'react-icons/md'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'

const DeleteCitationModal = ({ isOpen, onClose }) => {
    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = () => {
        setIsDeleting(true)
        onClose()
        navigate('/admin-dashboard/review-citation')
    }
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