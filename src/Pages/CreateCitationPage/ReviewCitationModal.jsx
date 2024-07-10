import { VscDebugBreakpointLog } from 'react-icons/vsc'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  SLButton,
} from '../../Components/Customs'
import { useContext } from 'react'
import { UserContext } from '../../UserContext'
import { api } from '../../Components/Apis'
import { useNavigate } from 'react-router-dom'

const ReviewCitationModal = ({ data, isOpen, onClose }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleUplaod = async () => {
    try {
      const token = localStorage.getItem('token')
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

      if (response.status === 201) {
        enqueueSnackbar(response.data.message, { variant: 'error' })
        onClose()
      }
      navigate('/admin-dashboard/review-citation')
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    }
  }
  return (
    <div className='max-h-[300px]'>
      <Modal size={'full'} isOpen={isOpen} onClose={onClose}>
        <ModalContent
          style={{ maxHeight: '520px', overflow: 'scroll', paddingInline: 80 }}
        >
          <ModalCloseButton onClick={onClose} />
          <ModalBody>
            <div className='flex mx-[200px] flex-col bg-slate-100 rounded-sm gap-6 p-7'>
              <div>
                <p className='text-3xl font-extrabold text-center underline'>
                  Review and upload
                </p>
              </div>
              <div>
                <p className='text-sm font-extrabold text-primary'>
                  Court Name
                </p>
                <p className='capitalize text-lg'>{data.institutionName}</p>
              </div>
              {data.index && (
                <div>
                  <p className='text-sm font-extrabold text-primary'>Index</p>
                  <p className='text-lg text-justify'>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data.index,
                      }}
                    />
                  </p>
                </div>
              )}
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
                <p className='text-sm font-extrabold text-primary'>
                  judgements
                </p>
                <p className='text-lg text-justify'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.judgements,
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
                <p className='text-sm font-extrabold text-primary'>Apellates</p>
                <div>
                  {data.apellates.map((apellate, index) => (
                    <div className='flex gap-2' key={index}>
                      <VscDebugBreakpointLog className='mt-[2px]' />
                      <p className='capitalize'>{apellate}</p>
                    </div>
                  ))}
                </div>
                <p className='capitalize text-lg'>{data.law}</p>
              </div>

              <div>
                <p className='text-sm font-extrabold text-primary'>Law</p>
                <div className='flex flex-wrap gap-3'>
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
                <div className='flex flex-wrap gap-3'>
                  {data.pointOfLaw.map((pointOfLaw, index) => (
                    <div className='flex gap-2' key={index}>
                      <VscDebugBreakpointLog className='mt-[2px]' />
                      <p className='capitalize'>{pointOfLaw}</p>
                    </div>
                  ))}
                </div>
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
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  defaultChecked={data.reportable}
                  className='form-checkbox'
                />
                <span className='ml-2'>Reportable</span>
              </label>
              <label className='inline-flex items-center'>
                <input
                  type='checkbox'
                  defaultChecked={data.overRuled}
                  className='form-checkbox'
                />
                <span className='ml-2'>Over Ruled</span>
              </label>
              <div className='flex gap-5 justify-end'>
                <SLButton variant={'error'} onClick={onClose} title={'Edit'} />
                <SLButton
                  variant={'success'}
                  onClick={handleUplaod}
                  title={'Upload'}
                />
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default ReviewCitationModal
