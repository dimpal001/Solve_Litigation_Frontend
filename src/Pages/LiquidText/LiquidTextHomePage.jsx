import { useState, useEffect } from 'react'
import axios from 'axios'
import { SLButton, SLSpinner } from '../../Components/Customs'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'
import { Link } from 'react-router-dom'
import CreateClientModal from './CreateClientModal'

const LiquidTextHomePage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [allClients, setAllClients] = useState([])
  const [isCreateClientModalOpen, setIsCreateClientModalOpen] = useState(false)

  const fetchAllDocuments = async () => {
    try {
      setIsLoading(true)
      const response = await axios(
        `${api}/api/solve_litigation/liquid-text/all-clients`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setAllClients(response.data)
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClientsUpdate = (newClients) => {
    setAllClients(newClients)
  }

  useEffect(() => {
    fetchAllDocuments()
  }, [])

  return (
    <div className='w-full min-h-screen p-5'>
      <p className='text-4xl font-bold text-center'>Prepare your argument</p>
      <div className='flex flex-col container mx-auto py-10'>
        <div>
          <SLButton
            title={'Create a client'}
            onClick={() => setIsCreateClientModalOpen(true)}
            variant={'primary'}
          />
        </div>

        {isCreateClientModalOpen && (
          <CreateClientModal
            isOpen={true}
            onClose={() => setIsCreateClientModalOpen(false)}
            onClientsUpdate={handleClientsUpdate}
          />
        )}

        {isLoading ? (
          <div className='flex justify-center items-center h-[300px]'>
            <SLSpinner className={'w-14'} />
          </div>
        ) : (
          <div className='container mx-auto'>
            <p className='text-3xl font-bold text-primary pt-10'>All Clients</p>
            {allClients && allClients.length > 0 ? (
              <div className='w-full py-2'>
                <table className='table-auto w-full mb-10 border-collapse border border-primary'>
                  <thead className='bg-primary'>
                    <tr className='bg-gray-200 capitalize'>
                      <th className='px-4 bg-primary text-white py-2 border-r text-start'>
                        Client Name
                      </th>
                      <th className='px-4 bg-primary text-white py-2 border-r text-start'>
                        Client Address
                      </th>
                      <th className='px-4 bg-primary text-white py-2 border-r text-start'>
                        Created By
                      </th>
                      <th className='px-4 bg-primary text-white py-2 border-r text-start'>
                        Created At
                      </th>
                    </tr>
                  </thead>
                  <tbody className='border border-primary'>
                    {allClients &&
                      allClients.map((data, index) => (
                        <tr fontSize={16} key={index}>
                          <td className='border capitalize px-4 py-2 group'>
                            <Link
                              to={`/prepare-argument/${data._id}`}
                              className='group-hover:underline'
                            >
                              {data.clientName}
                            </Link>
                          </td>
                          <td className='border px-4 py-2'>
                            {data.clientAddress}
                          </td>
                          <td className='border px-4 py-2'>
                            {data.createdUser.userName}
                          </td>
                          <td className='border px-4 py-2'>
                            {new Date(data.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='flex justify-center items-center p-10'>
                <p>No client found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default LiquidTextHomePage
