import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../../Components/Apis';
import { BiSolidMessageCheck } from "react-icons/bi";
import { Colors } from '../../Components/Colors';
import MessageModal from './MessageModal';
import { MdOutlineDelete } from "react-icons/md";
import DeleteFormModal from './DeleteFormModal';

<MdOutlineDelete />

const AllContactForms = () => {
    const [forms, setForms] = useState([]);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedForm, setSelectedForm] = useState('')

    const handleModalOpen = (form) => {
        setIsMessageModalOpen(true)
        setSelectedForm(form)
    }

    const handleDeleteModalOpen = (form) => {
        setIsDeleteModalOpen(true)
        setSelectedForm(form)
    }

    const fetchForms = async () => {
        try {
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/contact/all-forms`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setForms(response.data);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };
    useEffect(() => {
        fetchForms();
    }, []);

    const refresh = () => {
        fetchForms()
    }

    return (
        <div>
            <p className='text-center text-4xl p-3 font-bold'>Contact Forms</p>
            <Table className='border' variant="simple">
                <Thead className='bg-primary'>
                    <Tr>
                        <Th color={'white'} fontSize={14}>Name</Th>
                        <Th color={'white'} fontSize={14}>Email</Th>
                        <Th color={'white'} fontSize={14}>Phone Number</Th>
                        <Th color={'white'} fontSize={14}>Submitted at</Th>
                        <Th color={'white'} fontSize={14}>Message</Th>
                        <Th color={'white'} fontSize={14}>Delete</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {forms.map(form => (
                        <Tr fontSize={16} key={form._id}>
                            <Td>{form.name}</Td>
                            <Td>{form.email}</Td>
                            <Td>{form.phoneNumber}</Td>
                            <Td>{new Date(form.createdAt).toLocaleString()}</Td>
                            <Td><BiSolidMessageCheck onClick={() => handleModalOpen(form)} color={Colors.primary} size={24} className='cursor-pointer' /></Td>
                            <Td><MdOutlineDelete onClick={() => handleDeleteModalOpen(form)} color={'red'} size={24} className='cursor-pointer' /></Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {isMessageModalOpen && (
                <MessageModal isOpen={true} onClose={() => setIsMessageModalOpen(false)} user={selectedForm} />
            )}
            {isDeleteModalOpen && (
                <DeleteFormModal isOpen={true} reload={refresh} onClose={() => setIsDeleteModalOpen(false)} form={selectedForm} />
            )}
        </div>
    );
};

export default AllContactForms;
