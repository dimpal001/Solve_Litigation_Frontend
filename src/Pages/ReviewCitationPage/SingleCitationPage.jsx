import axios from 'axios'
import { GreenPrimaryButton, PrimaryButton, PrimaryOutlineButton, RedButton } from '../../Components/Customs'
import { FaArrowLeft, FaFilePdf, FaRegEdit } from 'react-icons/fa'
import { FiCheckSquare, FiPrinter } from 'react-icons/fi'
import { IoIosMail } from 'react-icons/io'
import { MdMarkEmailRead, MdOutlineDeleteOutline } from 'react-icons/md'
import { useToast } from '@chakra-ui/react'
import { api } from '../../Components/Apis'
import { Link, useNavigate } from 'react-router-dom'
import { Colors } from '../../Components/Colors'
import { useContext, useState } from 'react'
import DeleteCitationModal from './DeleteCitationModal'
import { UserContext } from '../../UserContext'

const SingleCitationPage = ({ data }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isApproving, setIsApproving] = useState(false)
  const toast = useToast()
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const generatePDF = async () => {
    try {
      const htmlContent = document.getElementById('citation-pdf').innerHTML

      const response = await axios.post(
        `${api}/api/solve_litigation/citation/citation-pdf`,
        {
          htmlContent: htmlContent,
        },
        {
          responseType: 'blob',
        }
      )

      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'generated.pdf')
      document.body.appendChild(link) // Append the link to document body
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error generating pdf:', error)
    }
  }

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

      toast({
        title: response.data.message,
        status: 'success',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: error.response.data.message,
        status: 'error',
        duration: 3000,
        position: 'top',
        isClosable: true,
      })
      navigate('/admin-dashboard/review-citation/')
    } finally {
      setIsApproving(false)
      navigate('/admin-dashboard/review-citation/')
    }
  }

  return (
    <div>
      <div>
        <Link to={'/admin-dashboard/review-citation'}>
          <div className='flex items-baseline gap-1 hover:gap-3 delay-[0.05s] transition-all'>
            <FaArrowLeft size={20} className='pt-[5px] cursor-pointer' color={Colors.primary} />
            <p className='text-primary'>Back</p>
          </div>
        </Link>
      </div>
      <div className='max-sm:mx-3 border my-3 rounded-sm bg-slate-50 lg:my-5 p-2 lg:p-10'>
        {user.userType === 'admin' && (
          <div className='flex gap-5'>
            <Link to={`/admin-dashboard/edit-citation/${data._id}`}>
              <PrimaryOutlineButton leftIcon={<FaRegEdit size={18} />} title={'Edit'} />
            </Link>
            <RedButton leftIcon={<MdOutlineDeleteOutline size={20} />} onClick={() => setIsDeleteModalOpen(true)} title={'Delete'} />
            {data.status === 'pending' && (
              <GreenPrimaryButton leftIcon={<FiCheckSquare size={18} />} onClick={handleApprove} isLoading={isApproving} loadingText={'Approving...'} title={'Approve'} />
            )}
            {isDeleteModalOpen && (
              <DeleteCitationModal isOpen={true} onClose={() => setIsDeleteModalOpen(false)} />
            )}
          </div>
        )}
        {/* <div className='flex max-sm:grid grid-cols-2 gap-3 pb-5 justify-center'>
          <PrimaryButton
            leftIcon={<FaFilePdf size={18} />}
            onClick={generatePDF}
            title={'Download'}
          />
          <PrimaryButton leftIcon={<FiPrinter size={20} />} title={'Print'} />
          <PrimaryButton
            leftIcon={<MdMarkEmailRead size={20} />}
            title={'Email me'}
          />
          <PrimaryButton
            leftIcon={<IoIosMail size={23} />}
            title={'Send to mail'}
          />
        </div> */}
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
          <p className='text-center text-lg capitalize'>
            {data.apellateType} Appellate Jurisdiction
          </p>
          <p className='text-center text-lg capitalize'>
            {' '}
            <strong>Bench : </strong>
            <span className='uppercase'>{data.judgeName}</span>
          </p>
          <p className='text-center uppercase'>
            <div
              dangerouslySetInnerHTML={{
                __html: data.partyNameAppealant,
              }}
            />
          </p>
          <p className='text-center text-lg'>Versus</p>
          <p className='text-center uppercase'>
            <div
              dangerouslySetInnerHTML={{
                __html: data.partyNameRespondent,
              }}
            />
          </p>
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
          <p className='text-center font-extrabold underline text-lg py-3'>
            Date : {new Date(data.dateOfOrder).toDateString()}
          </p>
          {data.judgments && (
            <div>
              <strong className='text-lg underline'>Judgement : </strong>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.judgments,
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
