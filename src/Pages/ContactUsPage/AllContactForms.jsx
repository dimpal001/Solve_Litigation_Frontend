import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import MessageModal from './MessageModal'
import { MdOutlineDelete } from 'react-icons/md'
import DeleteFormModal from './DeleteFormModal'
;<MdOutlineDelete />

const AllContactForms = () => {
  const [forms, setForms] = useState([])
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
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/contact/all-forms`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setForms(response.data)
    } catch (error) {
      console.error('Error fetching forms:', error)
    }
  }
  useEffect(() => {
    fetchForms()
  }, [])

  const refresh = () => {
    fetchForms()
  }

  return (
    <div>
      {/* <p className='text-center text-4xl p-3 font-bold'>Contact Forms</p> */}
      <table className='table-auto w-full border-collapse border border-primary'>
        <thead className='bg-primary'>
          <tr className='bg-gray-200 capitalize'>
            <th className='px-4 bg-primary text-white py-2 border-r'>Name</th>
            <th className='px-4 bg-primary text-white py-2 border-r'>Email</th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Phone Number
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Submitted at
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Message
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>Delete</th>
          </tr>
        </thead>
        <tbody className='border border-primary'>
          {forms && forms.length > 0 ? (
            forms.map((form) => (
              <tr fontSize={16} key={form._id}>
                <td className='border px-4 py-2'>{form.name}</td>
                <td className='border px-4 py-2'>{form.email}</td>
                <td className='border px-4 py-2'>{form.phoneNumber}</td>
                <td className='border px-4 py-2'>
                  {new Date(form.createdAt).toLocaleString()}
                </td>
                <td className='border px-4 py-2 text-center'>
                  <p
                    className='text-primary hover:text-primaryHover hover:underline cursor-pointer'
                    onClick={() => handleModalOpen(form)}
                  >
                    View
                  </p>
                </td>
                <td className='border px-4 py-2 text-center'>
                  <p
                    className='text-error hover:text-errorHover hover:underline cursor-pointer'
                    onClick={() => handleDeleteModalOpen(form)}
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
      {isMessageModalOpen && (
        <MessageModal
          isOpen={true}
          onClose={() => setIsMessageModalOpen(false)}
          user={selectedForm}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteFormModal
          isOpen={true}
          reload={refresh}
          onClose={() => setIsDeleteModalOpen(false)}
          form={selectedForm}
        />
      )}
    </div>
  )
}

export default AllContactForms
