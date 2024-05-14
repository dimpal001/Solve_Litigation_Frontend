import { useState, useEffect } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'
import axios from 'axios'
import { api } from '../../Components/Apis'
// import { BiSolidMessageCheck } from 'react-icons/bi'
import { Colors } from '../../Components/Colors'
import { MdOutlineDelete } from 'react-icons/md'
import { PrimaryButton } from '../../Components/Customs'
// import DeleteFormModal from './DeleteFormModal'

const LegalAdviceRequests = () => {
  const [forms, setForms] = useState([])
  //   const [isMessageModalOpen, setIsMessageModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedForm, setSelectedForm] = useState('')

  //   const handleModalOpen = (form) => {
  //     setIsMessageModalOpen(true)
  //     setSelectedForm(form)
  //   }

  const handleDeleteModalOpen = (form) => {
    setIsDeleteModalOpen(true)
    setSelectedForm(form)
  }

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

  const downloadAttachment = async (requestId, name) => {
    try {
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
    }
  }

  return (
    <div>
      <p className="text-center text-4xl p-3 font-bold">
        Legal Advice Requests
      </p>
      <Table className="border" variant="simple">
        <Thead className="bg-primary">
          <Tr>
            <Th color={'white'} fontSize={14}>
              Submitted on
            </Th>
            <Th color={'white'} fontSize={14}>
              Name
            </Th>
            <Th color={'white'} fontSize={14}>
              Email
            </Th>
            <Th color={'white'} fontSize={14}>
              Case Details
            </Th>
            <Th color={'white'} fontSize={14}>
              Attachment
            </Th>
            <Th color={'white'} fontSize={14}>
              Delete
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {forms.map((form) => (
            <Tr fontSize={16} key={form._id}>
              <Td>{new Date(form.createdAt).toLocaleString()}</Td>
              <Td>{form.user.fullName}</Td>
              <Td>{form.user.email}</Td>
              <Td>{form.caseDetails}</Td>
              <Td>
                {form.attachment.data ? (
                  <PrimaryButton
                    title={'Download'}
                    bgColor={Colors.primary}
                    onClick={() =>
                      downloadAttachment(form._id, form.user.fullName)
                    }
                  />
                ) : (
                  'No attachment'
                )}
              </Td>
              <Td>
                <MdOutlineDelete
                  onClick={() => handleDeleteModalOpen(form)}
                  color={'red'}
                  size={24}
                  className="cursor-pointer"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {/* {isMessageModalOpen && (
        <MessageModal
          isOpen={true}
          onClose={() => setIsMessageModalOpen(false)}
          user={selectedForm}
        />
      )} */}
      {/* {isDeleteModalOpen && (
        <DeleteFormModal
          isOpen={true}
          reload={refresh}
          onClose={() => setIsDeleteModalOpen(false)}
          form={selectedForm}
        />
      )} */}
    </div>
  )
}

export default LegalAdviceRequests
