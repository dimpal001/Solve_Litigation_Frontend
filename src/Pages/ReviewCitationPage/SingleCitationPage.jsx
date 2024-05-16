import axios from 'axios'
import { SLButton } from '../../Components/Customs'
import { FaArrowLeft } from 'react-icons/fa'
import { api } from '../../Components/Apis'
import { Link, useNavigate } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import { useContext, useState } from 'react'
import DeleteCitationModal from './DeleteCitationModal'
import { UserContext } from '../../UserContext'
import { enqueueSnackbar } from 'notistack'
import ShareCitationModal from './ShareCitationModal'
import AddToNotificationModal from './AddToNotificationModal'

const SingleCitationPage = ({ data }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const handleApprove = async () => {
    try {
      setIsApproving(true)

      const token = sessionStorage.getItem('token')

      const response = await axios.put(
        `${api}/api/solve_litigation/citation/approve-citation/${data._id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: 'error' })

      data.type === 'act'
        ? navigate('/admin-dashboard/review-acts/')
        : navigate('/admin-dashboard/review-citation/')
    } finally {
      setIsApproving(false)
      data.type === 'act'
        ? navigate('/admin-dashboard/review-acts/')
        : navigate('/admin-dashboard/review-citation/')
    }
  }

  return (
    <div>
      <div>
        {user && user.userType !== 'guest' && (
          <Link
            to={`/admin-dashboard/review-${
              data.type === 'act' ? 'acts' : 'citation'
            }`}
          >
            <div className='flex items-baseline gap-1 hover:gap-3 delay-[0.05s] transition-all'>
              <FaArrowLeft
                size={20}
                className='pt-[5px] cursor-pointer'
                color={Colors.primary}
              />
              <p className='text-primary'>Back</p>
            </div>
          </Link>
        )}
      </div>
      <div className='max-sm:mx-3 my-3 rounded-sm bg-slate-50 lg:my-5 p-2 lg:p-10'>
        {user && user.userType === 'admin' && (
          <div className='flex gap-1'>
            <Link to={`/admin-dashboard/edit-citation/${data._id}`}>
              <SLButton variant={'primary'} title={'Edit'} />
            </Link>
            <SLButton
              variant={'error'}
              onClick={() => setIsDeleteModalOpen(true)}
              title={'Delete'}
            />
            {data.status === 'pending' && (
              <SLButton
                variant={'success'}
                onClick={handleApprove}
                isLoading={isApproving}
                loadingText={'Approving...'}
                title={'Approve'}
              />
            )}

            {data.status === 'approved' && (
              <SLButton
                variant={'primary'}
                onClick={() => setIsNotificationModalOpen(true)}
                title={'Add to Notification'}
              />
            )}

            {isDeleteModalOpen && (
              <DeleteCitationModal
                isOpen={true}
                onClose={() => setIsDeleteModalOpen(false)}
              />
            )}
            {isNotificationModalOpen && (
              <AddToNotificationModal
                isOpen={true}
                onClose={() => setIsNotificationModalOpen(false)}
                citation={data}
              />
            )}
          </div>
        )}
        {user && user.userType === 'guest' && (
          <div className='flex max-sm:grid grid-cols-2 gap-3 pb-5'>
            <SLButton
              variant={'primary'}
              onClick={() => setIsShareModalOpen(true)}
              title={'Share'}
            />
          </div>
        )}
        {isShareModalOpen && (
          <ShareCitationModal
            isOpen={true}
            onClose={() => setIsShareModalOpen(false)}
            citation={data._id}
          />
        )}
        <div id='citation-pdf' style={{ padding: '10px', fontSize: 16 }}>
          <p
            className='text-center font-extrabold'
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '1.5rem',
            }}
          >
            {data.citationNo}
          </p>
          <p className='text-center text-3xl py-2'>{data.title}</p>
          <p className='text-center capitalize'>{data.institutionName}</p>
          {data.apellateType && (
            <p className='text-center text-lg capitalize'>
              {data.apellateType} Appellate Jurisdiction
            </p>
          )}
          {data.judgeName && (
            <p className='text-center text-lg capitalize'>
              {' '}
              <strong>Bench : </strong>
              <span className='uppercase'>{data.judgeName}</span>
            </p>
          )}
          {data.partyNameAppealant && (
            <p className='text-center uppercase'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.partyNameAppealant,
                }}
              />
            </p>
          )}
          {data.partyNameAppealant && (
            <p className='text-center text-lg'>Versus</p>
          )}
          {data.partyNameAppealant && (
            <p className='text-center uppercase'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.partyNameRespondent,
                }}
              />
            </p>
          )}
          {data.headNote && (
            <div>
              <strong className='text-lg underline'>Headnote :</strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.headNote,
                }}
              />
            </div>
          )}
          {data.dateOfOrder && (
            <p className='text-center font-extrabold underline text-lg py-3'>
              Date : {new Date(data.dateOfOrder).toDateString()}
            </p>
          )}
          {data.judgements && (
            <div>
              <strong className='text-lg underline'>Judgement : </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.judgements,
                }}
              />
            </div>
          )}
          {data.notification && (
            <div>
              <strong className='text-lg underline'>Notification : </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.notification,
                }}
              />
            </div>
          )}
          {data.referedJudgements && (
            <div>
              <strong className='text-lg underline'>
                Refered Judgements :{' '}
              </strong>
              <p className='text-center'>{data.referedJudgements}</p>
            </div>
          )}
          {data.equivalentCitations && (
            <div>
              <strong className='text-lg underline'>
                Equivalent Citations :{' '}
              </strong>
              <p className='text-center'>{data.equivalentCitations}</p>
            </div>
          )}
          {data.advocatePetitioner && (
            <div>
              <strong className='text-lg underline'>
                Advocate Petitioner :{' '}
              </strong>
              <p className='text-center'>{data.advocatePetitioner}</p>
            </div>
          )}
          {data.advocateRespondent && (
            <div>
              <strong className='text-lg underline'>
                Advocate Respondent :{' '}
              </strong>
              <p className='text-center'>{data.advocateRespondent}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SingleCitationPage
