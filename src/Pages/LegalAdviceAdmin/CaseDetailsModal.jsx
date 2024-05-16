import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  SLPrimarySpinner,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'

const CaseDetailsModal = ({ isOpen, onClose, form }) => {
  const [caseDetails, setCaseDetails] = useState('')
  const fetchCaseDetails = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/legal-advice/case-details/${form._id}`
      )
      setCaseDetails(response.data.caseDetails)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchCaseDetails()
  }, [])

  return (
    <>
      <Modal size={'2xl'} isOpen={isOpen}>
        <ModalContent>
          <ModalHeader>Case Details</ModalHeader>
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <p>
              {caseDetails ? (
                caseDetails
              ) : (
                <SLPrimarySpinner className={'w-[70px]'} />
              )}
            </p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CaseDetailsModal
