import { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import DeleteModal from '../../Components/DeleteModal'
import UserDetailsModal from './UserDetailsModal'
import CaseDetailsModal from './CaseDetailsModal'

const LegalAdviceRequests = () => {
  const [forms, setForms] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false)
  const [isCaseDetailsModalOpen, setIsCaseDetailsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState('')
  const [selectedForm, setSelectedForm] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)

  const fetchForms = async () => {
    try {
      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/legal-advice`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setForms(response.data.requests)
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

  const downloadAttachment = async (requestId, name) => {
    try {
      setIsDownloading(true)
      let response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/${requestId}/attachments`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const a = document.createElement('a')
      a.href = url
      a.download = `${name + '_attachment_' + requestId}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div>
      <p className='text-center text-4xl p-3 font-bold'>
        Legal Advice Requests
      </p>
      <Table className='border' variant='simple'>
        <Thead className='bg-primary'>
          <Tr>
            <Th color={'white'} fontSize={14}>
              Submitted on
            </Th>
            <Th color={'white'} fontSize={14}>
              user
            </Th>
            <Th color={'white'} fontSize={14}>
              Case Details
            </Th>
            <Th textAlign={'center'} color={'white'} fontSize={14}>
              Attachment
            </Th>
            <Th textAlign={'center'} color={'white'} fontSize={14}>
              Delete
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {forms.map((form) => (
            <Tr fontSize={16} key={form._id}>
              <Td>{new Date(form.createdAt).toLocaleString()}</Td>
              <Td
                onClick={() => {
                  setIsUserDetailsModalOpen(true)
                  setSelectedUser(form.user)
                }}
                className='text-primary cursor-pointer hover:underline'
              >
                {form.user.fullName}
              </Td>
              <Td>
                {form.caseDetails}...{' '}
                <span
                  onClick={() => {
                    setIsCaseDetailsModalOpen(true)
                    setSelectedForm(form)
                  }}
                  className='text-primary hover:underline cursor-pointer'
                >
                  Learn more
                </span>
              </Td>
              <Td textAlign={'center'}>
                {form.isAttachment ? (
                  <div>
                    {isDownloading ? (
                      <p className='text-primary cursor-progress'>
                        Downloading...
                      </p>
                    ) : (
                      <p
                        onClick={() =>
                          downloadAttachment(form._id, form.user.fullName)
                        }
                        className='text-primary hover:underline cursor-pointer'
                      >
                        Download
                      </p>
                    )}
                  </div>
                ) : (
                  'No attachment'
                )}
              </Td>
              <Td textAlign={'center'}>
                <p
                  onClick={() => {
                    setSelectedForm(form)
                    setIsDeleteModalOpen(true)
                  }}
                  className='text-red-500 cursor-pointer hover:text-red-600'
                >
                  Delete
                </p>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isDeleteModalOpen && (
        <DeleteModal
          title={'Delete Request?'}
          onClose={() => setIsDeleteModalOpen(false)}
          isOpen={true}
          api={`${api}/api/solve_litigation/legal-advice/${selectedForm._id}`}
          reload={refresh}
          variant={'error'}
        />
      )}
      {isUserDetailsModalOpen && (
        <UserDetailsModal
          isOpen={true}
          user={selectedUser}
          onClose={() => setIsUserDetailsModalOpen(false)}
          title={selectedUser.fullName}
        />
      )}
      {isCaseDetailsModalOpen && (
        <CaseDetailsModal
          isOpen={true}
          onClose={() => setIsCaseDetailsModalOpen(false)}
          form={selectedForm}
        />
      )}
    </div>
  )
}

export default LegalAdviceRequests
