import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { Link } from 'react-router-dom'
import DeleteModal from '../../Components/DeleteModal'

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState('')

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/notification`
      )
      setNotifications(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = (id) => {
    setSelectedNotification(id)
    setIsDeleteModalOpen(true)
  }

  const reload = () => {
    fetchNotifications()
  }

  useEffect(() => {
    fetchNotifications()
  }, [])

  return (
    <div>
      <div>
        <p className='text-center text-4xl p-3 font-bold'>
          Manage Notifications
        </p>
        <table className='table-auto w-full border-collapse border border-primary'>
          <thead className='bg-primary'>
            <tr className='bg-gray-200 capitalize'>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                Title
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                View Citation
              </th>
              <th className='px-4 bg-primary text-white py-2 border-r'>
                Delete
              </th>
            </tr>
          </thead>
          <tbody className='border border-primary'>
            {notifications && notifications.length > 0 ? (
              notifications.map((item) => (
                <tr fontSize={16} key={item._id}>
                  <td className='border px-4 py-2'>{item.title}</td>
                  <td className='border px-4 py-2 text-center'>
                    <Link
                      to={item.link}
                      target='_blank'
                      className='text-primary hover:underline'
                    >
                      Click
                    </Link>
                  </td>
                  <td className='border px-4 py-2 text-center'>
                    <p
                      onClick={() => handleDelete(item._id)}
                      className='text-error hover:text-errorHover hover:underline cursor-pointer'
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
        <DeleteModal
          variant={'error'}
          isOpen={true}
          onClose={() => setIsDeleteModalOpen(false)}
          title={'Delete this Notification'}
          api={`${api}/api/solve_litigation/notification/${selectedNotification}`}
          reload={reload}
        />
      )}
    </div>
  )
}

export default AllNotifications
