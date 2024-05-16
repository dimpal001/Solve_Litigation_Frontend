import { useState, useEffect } from 'react'
import axios from 'axios'
import { api } from '../../Components/Apis'
import DeleteModal from '../../Components/DeleteModal'
import UserDetailsModal from './UserDetailsModal'
import CaseDetailsModal from './CaseDetailsModal'
import SendFeedbackModal from './SendFeedbackModal'

const LegalAdviceRequests = () => {
  const [forms, setForms] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isUserDetailsModalOpen, setIsUserDetailsModalOpen] = useState(false)
  const [isCaseDetailsModalOpen, setIsCaseDetailsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
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
      <table className='table-auto w-full border-collapse border border-primary'>
        <thead className='bg-primary'>
          <tr className='bg-gray-200'>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Submitted on
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>User</th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Case Details
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Attachment
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>
              Feedback
            </th>
            <th className='px-4 bg-primary text-white py-2 border-r'>Delete</th>
          </tr>
        </thead>
        <tbody className='border border-primary'>
          {forms && forms.length > 0 ? (
            forms.map((form) => (
              <tr fontSize={16} key={form._id}>
                <td className='border px-4 py-2 text-center'>
                  {new Date(form.createdAt).toLocaleString()}
                </td>
                <td
                  className='border px-4 py-2 text-center text-primary hover:underline cursor-pointer'
                  onClick={() => {
                    setIsUserDetailsModalOpen(true)
                    setSelectedUser(form.user)
                  }}
                >
                  {form.user.fullName}
                </td>
                <td className='border px-4 py-2 text-center'>
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
                </td>
                <td className='border px-4 py-2 text-center'>
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
                </td>
                <td className='border px-4 py-2 text-center'>
                  <p
                    onClick={() => {
                      setSelectedForm(form)
                      setIsFeedbackModalOpen(true)
                    }}
                    className='text-success cursor-pointer hover:text-successHover hover:underline'
                  >
                    {form.feedback ? 'View Feedback' : 'Give Reply'}
                  </p>
                </td>
                <td className='border px-4 py-2 text-center'>
                  <p
                    onClick={() => {
                      setSelectedForm(form)
                      setIsDeleteModalOpen(true)
                    }}
                    className='text-red-500 cursor-pointer hover:text-red-600'
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
      {isFeedbackModalOpen && (
        <SendFeedbackModal
          isOpen={true}
          onClose={() => setIsFeedbackModalOpen(false)}
          form={selectedForm}
        />
      )}
    </div>
  )
}

export default LegalAdviceRequests
