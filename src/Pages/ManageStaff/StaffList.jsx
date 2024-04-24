import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th, useToast,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { PrimaryOutlineButton } from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useContext, useEffect, useState } from 'react'
import { Colors } from '../../Components/Colors'
import DeleteUserModal from './DeleteUserModal'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
const StaffList = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const toast = useToast()
    const [isFetching, setIsFetching] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState('all')
    const [selectedUser, setSelectedUser] = useState('')
    const [fetchingList, setFetchingList] = useState([])
    const [filteredList, setFilteredList] = useState([])

    const handleLogout = () => {
        setUser(null)
        sessionStorage.removeItem('jwtToken')
        sessionStorage.removeItem('user')
        navigate('/')
        toast({
            title: 'Session Expired !',
            description: 'Please login again',
            status: 'error',
            duration: 10000,
            isClosable: true,
            position: 'top',
        })
    }

    const fetchUserList = async () => {
        try {
            setIsFetching(true)
            const token = sessionStorage.getItem('token')
            const response = await axios.get(`${api}/api/solve_litigation/auth/user-list`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log('from api', response.data)

            setFetchingList(response.data)
            setFilteredList(response.data)
            console.log('data', fetchingList)
        } catch (error) {
            if (error.response.status === 401) {
                handleLogout()
            }
            console.log(error)
        } finally {
            setIsFetching(false)
            console.log(isFetching)
        }
    }

    useEffect(() => {
        fetchUserList()
    }, [])

    const handleFilter = (filter) => {
        setSelectedFilter(filter)
        let filteredData = [];
        if (filter === 'all') {
            filteredData = fetchingList
        }
        else {
            filteredData = fetchingList.filter((data) => data.userType === filter)
        }

        setFilteredList(filteredData)
    }

    return (
        <div data-aos='fade-up' className='px-7'>
            <Link to={'/admin-dashboard/manage-staff'}>
                <FaArrowLeft size={20} className='cursor-pointer' color={Colors.primary} />
            </Link>
            <p className='text-3xl font-extrabold pb-5 text-center'>Staff List</p>
            <div className='flex justify-center gap-5 pb-5'>
                <PrimaryOutlineButton
                    bgColor={selectedFilter === 'all' && Colors.primary}
                    color={selectedFilter === 'all' && 'white'}
                    onClick={() => handleFilter('all')}
                    title={'All'}
                />
                <PrimaryOutlineButton
                    bgColor={selectedFilter === 'admin' && Colors.primary}
                    color={selectedFilter === 'admin' && 'white'}
                    onClick={() => handleFilter('admin')}
                    title={'Admin'} />
                <PrimaryOutlineButton
                    bgColor={selectedFilter === 'staff' && Colors.primary}
                    color={selectedFilter === 'staff' && 'white'}
                    onClick={() => handleFilter('staff')}
                    title={'Staff'} />
                <PrimaryOutlineButton
                    bgColor={selectedFilter === 'guest' && Colors.primary}
                    color={selectedFilter === 'guest' && 'white'}
                    onClick={() => handleFilter('guest')}
                    title={'Guest User'} />
            </div>
            <div>
                <TableContainer className='border'>
                    <Table variant='simple'>
                        {filteredList && filteredList.length > 0 && (
                            <TableCaption>Click on <span className='text-red-500'>Delete</span> to delete the user</TableCaption>
                        )}
                        <Thead className='bg-primary'>
                            <Tr>
                                <Th color={'white'}>full name</Th>
                                <Th color={'white'}>email address</Th>
                                <Th color={'white'}>phone number</Th>
                                <Th color={'white'}>user type</Th>
                                <Th color={'white'} textAlign={'center'}>action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {filteredList && filteredList.length > 0 ?
                                filteredList.map((data, index) => (
                                    <Tr fontSize={16} key={index}>
                                        <Td>{data.fullName}</Td>
                                        <Td>{data.email}</Td>
                                        <Td>{data.phoneNumber}</Td>
                                        <Td textTransform={'capitalize'} color={data.userType === 'admin' ? 'green' : 'blue'}>{data.userType}</Td>
                                        <Td>
                                            <p className='text-red-500 font-extrabold text-center cursor-pointer'
                                                onClick={() => {
                                                    setIsDeleteModalOpen(true)
                                                    setSelectedUser(data)
                                                }}
                                            >Delete</p>
                                        </Td>
                                    </Tr>
                                ))
                                : (
                                    <p className='text-center py-3'>No data found</p>
                                )}
                        </Tbody>
                    </Table>
                </TableContainer>
            </div>
            {isDeleteModalOpen && (
                <DeleteUserModal relode={() => fetchUserList()} isOpen={true} onClose={() => setIsDeleteModalOpen(false)} user={selectedUser} />
            )}
        </div>
    )
}

export default StaffList