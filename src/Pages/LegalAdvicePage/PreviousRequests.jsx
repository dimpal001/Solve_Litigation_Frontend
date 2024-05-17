import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { api } from '../../Components/Apis'
import { UserContext } from '../../UserContext'
import CaseDetailsModal from '../LegalAdviceAdmin/CaseDetailsModal'
import ViewFeedback from './ViewFeedback'

const PreviousRequests = () => {
  const { user } = useContext(UserContext)
  const [requests, setRequests] = useState([])
  const [selectedRequest, setSelectedRequest] = useState('')
  const [isCaseDetailsModalOpen, setIsCaseDetailsModalOpen] = useState(false)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const fetchPreviousRequests = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/my-requests/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setRequests(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPreviousRequests()
  }, [])

  const downloadAttachment = async (requestId, name) => {
    try {
      setIsDownloading(true)
      let response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/${requestId}/attachments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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
    <div className='container mx-auto flex items-center lg:px-[150px] px-4 py-8'>
      <div className='w-full'>
        <h1 className='text-4xl max-sm:text-3xl text-primary font-bold mb-4'>
          Previous Requests
        </h1>
        {requests && requests.length === 0 ? (
          <p className='p-5 border border-primary rounded-sm'>
            No previous requests available
          </p>
        ) : (
          <div className='max-sm:overflow-scroll'>
            <table className='table-auto w-full border-collapse border border-primary'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Requested On
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Case Details
                  </th>
                  <th className='px-4 bg-primary text-white py-2 border-r'>
                    Attachment
                  </th>
                  <th className='px-4 bg-primary text-white py-2'>Feedback</th>
                </tr>
              </thead>
              <tbody className='border border-primary'>
                {requests &&
                  requests.map((item, index) => (
                    <tr key={index}>
                      <td className='border px-4 py-2 text-center'>
                        {new Date(item.createdAt).toLocaleString()}
                      </td>
                      <td className='border px-4 py-2 text-center'>
                        <p
                          onClick={() => {
                            setSelectedRequest(item)
                            setIsCaseDetailsModalOpen(true)
                          }}
                          className='text-primary hover:underline cursor-pointer'
                        >
                          View
                        </p>
                      </td>
                      <td className='border px-4 py-2 text-center'>
                        {item.isAttachment ? (
                          <div>
                            {isDownloading ? (
                              <p className='text-primary'>Downloading...</p>
                            ) : (
                              <p
                                onClick={() =>
                                  downloadAttachment(
                                    item._id,
                                    item.user.fullName
                                  )
                                }
                                className='text-primary cursor-pointer hover:underline'
                              >
                                Download
                              </p>
                            )}
                          </div>
                        ) : (
                          <p>Not available</p>
                        )}
                      </td>
                      <td className='border px-4 py-2 text-center'>
                        {item.isFeedback ? (
                          <p
                            onClick={() => {
                              setSelectedRequest(item.feedback)
                              setIsFeedbackModalOpen(true)
                            }}
                            className='text-primary hover:underline cursor-pointer'
                          >
                            View
                          </p>
                        ) : (
                          <p>Not available</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {isCaseDetailsModalOpen && (
          <CaseDetailsModal
            isOpen={true}
            onClose={() => setIsCaseDetailsModalOpen(false)}
            form={selectedRequest}
          />
        )}
        {isFeedbackModalOpen && (
          <ViewFeedback
            isOpen={true}
            onClose={() => setIsFeedbackModalOpen(false)}
            feedback={selectedRequest}
          />
        )}
      </div>
    </div>
  )
}

export default PreviousRequests
