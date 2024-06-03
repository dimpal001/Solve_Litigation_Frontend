import axios from 'axios'
import { useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'
import { Link } from 'react-router-dom'

const LawyerList = () => {
  const [lawyers, setLawyers] = useState([])

  const fetchLawyerList = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/lawyer-list`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setLawyers(response.data)
      console.log(lawyers)
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchLawyerList()
  }, [])

  return (
    <div>
      <p className='text-center text-4xl p-3 font-bold'>Lawyer List</p>
      <table className='table-auto w-full border-collapse border border-primary'>
        <thead className='bg-primary'>
          <tr className='bg-gray-200 capitalize'>
            <th className='px-4 bg-primary text-white py-2 border-r'>Name</th>
            <th className='px-4 bg-primary text-white py-2 border-r'>Email</th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Phone Number
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Speciallity
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Message
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>Delete</th>
          </tr>
        </thead>
        <tbody className='border border-primary'>
          {lawyers &&
            lawyers.map((item, index) => (
              <tr fontSize={16} key={index}>
                <td className='border px-4 py-2'>
                  <Link
                    className='hover:text-primary hover:underline'
                    to={`/admin-dashboard/lawyer/${item._id}`}
                  >
                    {item.fullName}
                  </Link>
                </td>
                <td className='border px-4 py-2'>{item.email}</td>
                <td className='border px-4 py-2'>{item.phoneNumber}</td>
                <td className='border px-4 py-2'>{item.specialist}</td>
                <td className='border px-4 py-2 text-center'>
                  <p className='text-primary hover:text-primaryHover hover:underline cursor-pointer'>
                    View
                  </p>
                </td>
                <td className='border px-4 py-2 text-center'>
                  <p className='text-error hover:text-errorHover hover:underline cursor-pointer'>
                    Delete
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default LawyerList
