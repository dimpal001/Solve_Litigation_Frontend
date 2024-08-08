import axios from 'axios'
import { api } from '../../Components/Apis'
import { useContext, useEffect, useState } from 'react'
import { Colors } from '../../Components/Colors'
import DeleteUserModal from './DeleteUserModal'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'
import { SLButton } from '../../Components/Customs'
import DetailedUserModal from './DetailedUserModal'

const UserList = () => {
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [isFetching, setIsFetching] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState('')
  const [fetchingList, setFetchingList] = useState([])
  const [filteredList, setFilteredList] = useState([])

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('user')
    navigate('/')
    enqueueSnackbar('Session Expired ! Please login again', {
      variant: 'error',
    })
  }

  const fetchUserList = async () => {
    try {
      setIsFetching(true)
      const token = localStorage.getItem('token')
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
      {/* <p className='text-3xl font-extrabold pb-5 text-center'>User List</p> */}
      <div className='flex justify-center gap-5 pb-5'>
        <SLButton
          variant={selectedFilter === 'all' ? 'primary' : 'outline'}
          onClick={() => handleFilter('all')}
          title={'All'}
        />
        <SLButton
          variant={selectedFilter === 'admin' ? 'primary' : 'outline'}
          onClick={() => handleFilter('admin')}
          title={'Admin'}
        />
        <SLButton
          variant={selectedFilter === 'staff' ? 'primary' : 'outline'}
          onClick={() => handleFilter('staff')}
          title={'Staff'}
        />
        <SLButton
          variant={selectedFilter === 'guest' ? 'primary' : 'outline'}
          onClick={() => handleFilter('guest')}
          title={'Guest User'}
        />
        <SLButton
          variant={selectedFilter === 'lawyer' ? 'primary' : 'outline'}
          onClick={() => handleFilter('lawyer')}
          title={'Lawyer'}
        />
      </div>
      <div>
        <table className='table-auto w-full text-base mb-10 border-collapse border border-primary'>
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
                  <td
                    onClick={() => {
                      setIsUserModalOpen(true)
                      setSelectedUser(data._id)
                    }}
                    className='border cursor-pointer px-4 py-2'
                  >
                    {data.fullName}
                  </td>
                  <td className='border px-4 py-2'>{data.email}</td>
                  <td className='border px-4 py-2 text-center'>
                    {data.phoneNumber}
                  </td>
                  <td
                    className={`border ${
                      data.userType === 'admin'
                        ? 'text-green-500'
                        : data.userType === 'guest'
                        ? 'text-primary'
                        : 'text-yellow-600'
                    } px-4 py-2 text-center capitalize`}
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
      <DetailedUserModal
        isOpen={isUserModalOpen}
        onClose={() => {
          setIsUserModalOpen(false)
          setSelectedUser(null)
        }}
        id={selectedUser}
      />
    </div>
  )
}

export default UserList
