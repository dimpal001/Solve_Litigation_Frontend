import { useEffect, useState } from 'react'
import { SLButton, SLPrimarySpinner } from '../../Components/Customs'
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
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black opacity-50'></div>
          <div className='relative bg-white rounded-sm w-[850px] p-6'>
            <button
              className='absolute top-0 right-0 m-2 p-2 text-gray-500 hover:text-gray-700'
              onClick={onClose}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 text-primary w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </button>
            <div
              className={`text-2xl border-b pb-3 font-extrabold text-primary mb-4`}
            >
              Case Details - {form.user.fullName}
            </div>
            <div className='text-gray-700 max-h-[500px] overflow-scroll'>
              <div>
                {caseDetails ? (
                  <div>
                    <p className='pr-3'>${caseDetails}</p>
                    <div className='flex justify-center mt-2'>
                      <SLButton
                        title={'Print'}
                        variant={'primary'}
                        isDisabled={true}
                      />
                    </div>
                  </div>
                ) : (
                  <div className='flex justify-center'>
                    <SLPrimarySpinner className={'w-[60px] m-5'} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CaseDetailsModal
