import { useState, useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import axios from 'axios';
import { api } from '../../Components/Apis';
import { BiSolidMessageCheck } from "react-icons/bi";
import { Colors } from '../../Components/Colors';
import MessageModal from './MessageModal';

const AllContactForms = () => {
    const [forms, setForms] = useState([]);
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
    const [selectedUser, setSelectedUser] = useState('')

    const handleModalOpen = (form) => {
        setIsMessageModalOpen(true)
        setSelectedUser(form)
    }

    useEffect(() => {
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

        fetchForms();
    }, []);

    return (
        <div>
            <p className='text-center text-4xl p-3 font-bold'>Contact Forms</p>
            <Table className='border' variant="simple">
                <Thead className='bg-primary'>
                    <Tr>
                        <Th color={'white'} fontSize={14}>Name</Th>
                        <Th color={'white'} fontSize={14}>Email</Th>
                        <Th color={'white'} fontSize={14}>Phone Number</Th>
                        <Th color={'white'} fontSize={14}>Message</Th>
                        <Th color={'white'} fontSize={14}>Submitted at</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {forms.map(form => (
                        <Tr fontSize={16} key={form._id}>
                            <Td>{form.name}</Td>
                            <Td>{form.email}</Td>
                            <Td>{form.phoneNumber}</Td>
                            <Td><BiSolidMessageCheck onClick={() => handleModalOpen(form)} color={Colors.primary} size={24} className='cursor-pointer' /></Td>
                            <Td>{new Date(form.createdAt).toLocaleString()}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {isMessageModalOpen && (
                <MessageModal isOpen={true} onClose={() => setIsMessageModalOpen(false)} user={selectedUser} />
            )}
        </div>
    );
};

export default AllContactForms;
