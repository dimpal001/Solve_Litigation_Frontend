import { PrimaryButton } from '../../Components/Customs'
import { FaFilePdf } from 'react-icons/fa'
import { FiPrinter } from 'react-icons/fi'
import { IoIosMail } from 'react-icons/io'
import { MdMarkEmailRead } from 'react-icons/md'

const SingleCitationPage = ({ data }) => {
  return (
    <div>
      <div className='border max-sm:mx-3 shadow-2xl rounded-md lg:mx-20 lg:my-5 p-6 lg:p-10'>
        <div className='flex max-sm:grid grid-cols-2 gap-3 pb-5 justify-center'>
          <PrimaryButton
            leftIcon={<FaFilePdf size={18} />}
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
        </div>
        <div>
          <p className='text-center font-extrabold'>{data.citationNo}</p>
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
