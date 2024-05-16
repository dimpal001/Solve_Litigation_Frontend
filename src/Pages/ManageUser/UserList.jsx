import { PrimaryOutlineButton } from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { useContext, useEffect, useState } from 'react'
import { Colors } from '../../Components/Colors'
import DeleteUserModal from './DeleteUserModal'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'

const UserList = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
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
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchUserList = async () => {
    try {
      setIsFetching(true)
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/auth/user-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
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
    let filteredData = []
    if (filter === 'all') {
      filteredData = fetchingList
    } else {
      filteredData = fetchingList.filter((data) => data.userType === filter)
    }

    setFilteredList(filteredData)
  }

  return (
    <div className='px-7'>
      <Link to={'/admin-dashboard/manage-users'}>
        <FaArrowLeft
          size={20}
          className='cursor-pointer'
          color={Colors.primary}
        />
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
          title={'Admin'}
        />
        <PrimaryOutlineButton
          bgColor={selectedFilter === 'staff' && Colors.primary}
          color={selectedFilter === 'staff' && 'white'}
          onClick={() => handleFilter('staff')}
          title={'Staff'}
        />
        <PrimaryOutlineButton
          bgColor={selectedFilter === 'guest' && Colors.primary}
          color={selectedFilter === 'guest' && 'white'}
          onClick={() => handleFilter('guest')}
          title={'Guest User'}
        />
      </div>
      <div>
        <table className='table-auto w-full border-collapse border border-primary'>
          <thead className='bg-primary'>
            <tr className='bg-gray-200 capitalize'>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                full name
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                email address
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                phone number
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                user type
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                action
              </th>
            </tr>
          </thead>
          <tbody className='border border-primary'>
            {filteredList && filteredList.length > 0 ? (
              filteredList.map((data, index) => (
                <tr fontSize={16} key={index}>
                  <td className='border px-4 py-2'>{data.fullName}</td>
                  <td className='border px-4 py-2'>{data.email}</td>
                  <td className='border px-4 py-2 text-center'>
                    {data.phoneNumber}
                  </td>
                  <td
                    className='border px-4 py-2 text-center capitalize'
                    color={data.userType === 'admin' ? 'green' : 'blue'}
                  >
                    {data.userType}
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    <p
                      className='text-red-500 font-extrabold text-center cursor-pointer'
                      onClick={() => {
                        setIsDeleteModalOpen(true)
                        setSelectedUser(data)
                      }}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <p className='text-center py-3'>No data found</p>
            )}
          </tbody>
        </table>
      </div>
      {isDeleteModalOpen && (
        <DeleteUserModal
          relode={() => fetchUserList()}
          isOpen={true}
          onClose={() => setIsDeleteModalOpen(false)}
          user={selectedUser}
        />
      )}
    </div>
  )
}

export default UserList
