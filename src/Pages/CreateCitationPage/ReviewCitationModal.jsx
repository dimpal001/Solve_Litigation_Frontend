import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  useToast,
} from '@chakra-ui/react'
import { VscDebugBreakpointLog } from 'react-icons/vsc'
import axios from 'axios'

import {
  PrimaryButton,
  PrimaryRedOutlineButton,
} from '../../Components/Customs'
import { MdModeEditOutline, MdOutlineCloudUpload } from 'react-icons/md'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { useNavigate } from 'react-router-dom'
const ReviewCitationModal = ({ data, isOpen, onClose }) => {
  const { user } = useContext(UserContext)
  const toast = useToast()
  const navigate = useNavigate()

  const handleUplaod = async () => {
    try {
      const token = sessionStorage.getItem('token')
      // Make an HTTP POST request to the server endpoint
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/upload-citation`,
        {
          citationData: data,
          user: user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      // Upon successful upload, display a success message
      if (response.status === 201) {
        toast({
          title: response.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
        })
        onClose()
      }
      navigate('/admin-dashboard/review-citation')
    } catch (error) {
      // Handle any errors that occur during the upload process
      console.error('Error uploading citation:', error)
      // Display an error message
      alert('Error uploading citation. Please try again later.')
    }
  }
  return (
    <div className='max-h-[300px]'>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          style={{ maxHeight: '520px', overflow: 'scroll', paddingInline: 80 }}
        >
          <ModalHeader>
            <span className='text-3xl'>Review and upload</span>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className='flex flex-col gap-y-5 border border-slate-900 p-7'>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Court Name
                </p>
                <p className='capitalize text-lg'>{data.institutionName}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Apellate Type
                </p>
                <p className='capitalize text-lg'>{data.apellateType}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>Case No</p>
                <p className='capitalize text-lg'>{data.caseNo}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Party Name Appealant
                </p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.partyNameAppealant,
                    }}
                  />
                </p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Party name respondent
                </p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.partyNameRespondent,
                    }}
                  />
                </p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>Title</p>
                <p className='capitalize text-lg'>{data.title}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>Judgments</p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.judgments,
                    }}
                  />
                </p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Date of Order
                </p>
                <p className='capitalize text-lg'>
                  {new Date(data.dateOfOrder).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Judge Name
                </p>
                <p className='capitalize text-lg'>{data.judgeName}</p>
              </div>
              {data.headNote && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Headnote
                  </p>
                  <p className='text-lg text-justify'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.headNote,
                      }}
                    />
                  </p>
                </div>
              )}
              {data.referedJudgements && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Refered Judgements
                  </p>
                  <p className='capitalize text-lg'>{data.referedJudgements}</p>
                </div>
              )}
              <div>
                <p className='text-sm font-extrabold text-primary'>Law</p>
                <div>
                  {data.laws.map((law, index) => (
                    <div className='flex gap-2' key={index}>
                      <VscDebugBreakpointLog className='mt-[2px]' />
                      <p className='capitalize'>{law}</p>
                    </div>
                  ))}
                </div>
                <p className='capitalize text-lg'>{data.law}</p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Point of Law
                </p>
                {data.pointOfLaw.map((pointOfLaw, index) => (
                  <div className='flex gap-2' key={index}>
                    <VscDebugBreakpointLog className='mt-[2px]' />
                    <p className='capitalize'>{pointOfLaw}</p>
                  </div>
                ))}
              </div>
              {data.equivalentCitations && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Equivalent Citations
                  </p>
                  <p className='capitalize text-lg'>
                    {data.equivalentCitations}
                  </p>
                </div>
              )}
              {data.advocatePetitioner && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Advocate Petitioner
                  </p>
                  <p className='capitalize text-lg'>
                    {data.advocatePetitioner}
                  </p>
                </div>
              )}
              {data.advocateRespondent && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>
                    Advocate Respondent
                  </p>
                  <p className='capitalize text-lg'>
                    {data.advocateRespondent}
                  </p>
                </div>
              )}
              <div className='flex gap-3'>
                <p className='text-sm font-extrabold text-primary'>
                  Reportable
                </p>
                <Checkbox isChecked={data.reportable === true ? true : false} />
              </div>
              <div className='flex gap-3'>
                <p className='text-sm font-extrabold text-primary'>
                  Over Ruled
                </p>
                <Checkbox isChecked={data.overRuled === true ? true : false} />
              </div>
            </div>
          </ModalBody>

          <ModalFooter className='flex gap-5'>
            <PrimaryRedOutlineButton
              leftIcon={<MdModeEditOutline size={20} />}
              onClick={onClose}
              title={'Edit'}
            />
            <PrimaryButton
              onClick={handleUplaod}
              rightIcon={<MdOutlineCloudUpload size={20} />}
              title={'Upload'}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReviewCitationModal
