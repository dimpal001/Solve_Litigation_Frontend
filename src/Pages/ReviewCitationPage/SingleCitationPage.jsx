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
  const [isDownloading, setIsDownloading] = useState(false)

  const stripHtml = (html) => {
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || div.innerText || ''
  }

  const pdfHeader = `
  <div style="display: flex; flex-direction: column; align-items: center">
  <div style="display: flex; justify-content: space-between; width: 100%">
    <div style="color: #0052cc">
      <p style="margin: 2px 0; font-size: 12px">User : ${
        user && user.fullName
      }</p>
      <p style="margin: 2px 0; font-size: 12px">Email : ${
        user && user.email
      }</p>
      <p style="margin: 2px 0; font-size: 12px">
        Downloaded : ${new Date().toLocaleString()}
      </p>
      <a href="https://www.solvelitigation.com"
        >https://solvelitigation.com</a
      >
    </div>
    <div>
      <a href="https://www.solvelitigation.com"
        ><img
          src="data:image/svg+xml,%3csvg%20width='100'%20height='100'%20xmlns='http://www.w3.org/2000/svg'%20data-name='Layer%201'%3e%3cg%3e%3ctitle%3eLayer%201%3c/title%3e%3cpolygon%20id='svg_1'%20fill='%230052cc'%20points='95.45%2087.04%2090.12%2096.31%2047.33%2096.31%2052.68%2087.04%2058.02%2077.79%2063.37%2068.52%2068.72%2059.27%2074.07%2050%2079.4%2040.73%2079.42%2040.73%2084.77%2050%2079.42%2059.27%2074.07%2068.52%2068.72%2077.79%2063.38%2087.04%2084.77%2087.04%2090.1%2077.79%2090.12%2077.79%2095.45%2087.04'%20class='cls-1'/%3e%3cpolygon%20id='svg_2'%20fill='%230052cc'%20points='74.07%2031.48%2068.73%2040.73%2068.72%2040.73%2068.72%2040.75%2063.38%2050%2063.37%2050%2058.03%2040.73%2063.37%2031.48%2058.02%2022.21%2052.68%2031.48%2047.33%2040.73%2041.98%2050%2047.32%2059.27%2047.33%2059.27%2052.67%2068.52%2052.68%2068.54%2047.33%2077.79%2042%2087.04%2041.97%2087.04%2041.98%2087.06%2036.63%2096.31%204.55%2096.31%209.9%2087.04%2015.25%2077.79%2020.6%2068.52%2031.28%2068.52%2025.93%2077.79%2020.6%2087.04%2031.28%2087.04%2036.63%2077.79%2041.98%2068.52%2036.63%2059.27%2031.28%2050%2036.63%2040.75%2036.63%2040.73%2041.98%2031.48%2041.98%2031.46%2047.33%2022.21%2052.67%2012.96%2058.02%203.69%2063.37%2012.96%2068.72%2022.21%2074.07%2031.48'%20class='cls-1'/%3e%3c/g%3e%3c/svg%3e"
          alt="Logo"
          style="width: 85px; height: 85px; margin-bottom: 20px"
      /></a>
    </div>
  </div>
  <div
    style="width: 100%; height: 1px; background: black; margin-bottom: 20px"
  ></div>
  <div>
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
      "
    >
      ${data.citationNo}
    </p>
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 18px;
        color: #0052cc;
      "
    >
      ${data.title}
    </p>
    ${
      data.institutionName &&
      `
    <p style="margin: 10px 0; text-align: center; font-size: 16px">
      ${data.institutionName}
    </p>
    `
    }
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      "
    >
      Bench: ${data.judgeName}
    </p>
    ${
      data.partyNameAppealant &&
      `
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 16px;
        font-style: italic;
      "
    >
      ${stripHtml(data.partyNameAppealant)}
    </p>
    `
    }
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
      "
    >
      Versus
    </p>
    ${
      data.partyNameRespondent &&
      `
    <p
      style="
        margin: 10px 0;
        text-align: center;
        font-size: 16px;
        font-style: italic;
      "
    >
      ${stripHtml(data.partyNameRespondent)}
    </p>
    `
    } ${
    data.dateOfOrder &&
    `
    <p style="margin: 10px 0; text-align: center; font-size: 16px">
      Date of Order : ${new Date(data.dateOfOrder).toLocaleDateString()}
    </p>
    `
  }
  </div>
</div>
  `

  const handleApprove = async () => {
    try {
      setIsApproving(true)

      const token = localStorage.getItem('token')

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

  const generatePdf = async () => {
    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${data.citationNo}</title>
      </head>
      <body>
      ${pdfHeader + document.querySelector('#citation-pdf').innerHTML}
      </body>
      </html>
      `

    try {
      setIsDownloading(true)
      const response = await axios.post(
        `${api}/api/solve_litigation/citation/citation-pdf`,
        { htmlContent },
        {
          responseType: 'blob',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const url = window.URL.createObjectURL(
        new Blob([response.data], { type: 'application/pdf' })
      )
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `${data.citationNo}-pdf.pdf`)
      document.body.appendChild(link)
      link.click()
      link.parentNode.removeChild(link)
    } catch (error) {
      console.error('Error downloading the PDF:', error)
    } finally {
      setIsDownloading(false)
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
        <div className='flex items-center justify-center gap-3 pb-3'>
          {user && user.userType === 'admin' && (
            <div className='flex gap-3'>
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
          {user && (
            <div className='flex max-sm:grid grid-cols-2 gap-3'>
              <SLButton
                variant={'primary'}
                onClick={() => setIsShareModalOpen(true)}
                title={'Share'}
              />
              <SLButton
                variant={'primary'}
                isLoading={isDownloading}
                loadingText={'Downloading...'}
                onClick={generatePdf}
                iconColor={'white'}
                title={'Download PDF'}
              />
            </div>
          )}
        </div>
        {isShareModalOpen && (
          <ShareCitationModal
            isOpen={true}
            onClose={() => setIsShareModalOpen(false)}
            citation={data._id}
          />
        )}
        <div style={{ padding: '10px', fontSize: 16 }}>
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
            <p id='partyName' className='text-center uppercase'>
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
            <p id='opponentName' className='text-center uppercase'>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.partyNameRespondent,
                }}
              />
            </p>
          )}
          {data.dateOfOrder && (
            <p className='text-center font-extrabold underline text-lg py-3'>
              Date : {new Date(data.dateOfOrder).toDateString()}
            </p>
          )}

          <div id='citation-pdf'>
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
    </div>
  )
}

export default SingleCitationPage
