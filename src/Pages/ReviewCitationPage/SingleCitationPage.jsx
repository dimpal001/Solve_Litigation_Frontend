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

  const pdfHeader = `
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="display: flex; gap: 7px; width: 100%">
    <div>
        <a href="https://www.solvelitigation.com">
          <img
            src="data:image/svg+xml,%3csvg%20width='100'%20height='100'%20xmlns='http://www.w3.org/2000/svg'%20data-name='Layer%201'%3e%3cg%3e%3ctitle%3eLayer%201%3c/title%3e%3cpolygon%20id='svg_1'%20fill='%230052cc'%20points='95.45%2087.04%2090.12%2096.31%2047.33%2096.31%2052.68%2087.04%2058.02%2077.79%2063.37%2068.52%2068.72%2059.27%2074.07%2050%2079.4%2040.73%2079.42%2040.73%2084.77%2050%2079.42%2059.27%2074.07%2068.52%2068.72%2077.79%2063.38%2087.04%2084.77%2087.04%2090.1%2077.79%2090.12%2077.79%2095.45%2087.04'%20class='cls-1'/%3e%3cpolygon%20id='svg_2'%20fill='%230052cc'%20points='74.07%2031.48%2068.73%2040.73%2068.72%2040.73%2068.72%2040.75%2063.38%2050%2063.37%2050%2058.03%2040.73%2063.37%2031.48%2058.02%2022.21%2052.68%2031.48%2047.33%2040.73%2041.98%2050%2047.32%2059.27%2047.33%2059.27%2052.67%2068.52%2052.68%2068.54%2047.33%2077.79%2042%2087.04%2041.97%2087.04%2041.98%2087.06%2036.63%2096.31%204.55%2096.31%209.9%2087.04%2015.25%2077.79%2020.6%2068.52%2031.28%2068.52%2025.93%2077.79%2020.6%2087.04%2031.28%2087.04%2036.63%2077.79%2041.98%2068.52%2036.63%2059.27%2031.28%2050%2036.63%2040.75%2036.63%2040.73%2041.98%2031.48%2041.98%2031.46%2047.33%2022.21%2052.67%2012.96%2058.02%203.69%2063.37%2012.96%2068.72%2022.21%2074.07%2031.48'%20class='cls-1'/%3e%3c/g%3e%3c/svg%3e"
            alt="Logo"
            style="width: 80px; height: 80px; margin-bottom: 20px"
          />
        </a>
      </div>  
    <div style="color: #0052cc">
        <p style="margin: 2px 0; padding-top: 5px; font-size: 12px">User: ${
          user && user.fullName
        }</p>
        <p style="margin: 2px 0; font-size: 12px">Email: ${
          user && user.email
        }</p>
        <p style="margin: 2px 0; font-size: 12px">Downloaded: ${new Date().toLocaleString()}</p>
        <a href="https://www.solvelitigation.com">https://solvelitigation.com</a>
      </div>
    </div>
    <div style="width: 100%; height: 1px; background: black; margin-bottom: 20px"></div>
    <div style="width: 100%">
      <p style="margin: 10px 0; text-transform: uppercase; text-align: center; font-size: 20px; font-weight: bold;">${
        data.citationNo
      }</p>
      ${
        data.institutionName &&
        `<p style="margin: 10px 0; text-transform: capitalize; text-align: center; font-size: 19px; font-weight: 500;">${data.institutionName}</p>`
      }

      ${
        data.caseNo &&
        `<p style="margin: 10px 0; text-transform: capitalize; text-align: center; font-size: 19px; font-weight: 500;">${data.caseNo}</p>`
      }
      ${
        data.partyNameAppealant &&
        `<div style="text-align: center; padding-top: 5px; text-transform: uppercase; width: 100%">
          <div style="display: flex; position: relative; align-items: center; justify-content: center; width: 100%;">
            <div>${data.partyNameAppealant}</div>
            <div style="text-transform: capitalize; position: absolute; right: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;......Appellant</div>
          </div>
        </div>`
      }
      <p style="margin: 5px 0; text-align: center; font-size: 16px; font-weight: bold;">Versus</p>
      ${
        data.partyNameRespondent &&
        `<div style="text-align: center; padding-top: 5px; text-transform: uppercase;">
          <div style="display: flex; position: relative; align-items: center; justify-content: center; width: 100%;">
            <div>${data.partyNameRespondent}</div>
            <div style="text-transform: capitalize; position: absolute; right: 0;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;......Respondent</div>
          </div>
        </div>`
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
            Authorization: `Bearer ${localStorage.getItem('token')}`,
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

  const printPdf = async () => {
    // example header, replace with your actual header

    const htmlContent = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${data.citationNo}</title>
        <style>
        @page {
          margin-top: 1.1in;
          margin-bottom: 1.1in;
          margin: 1in;
        }
        body {
          margin: 0;
        }
        /* Hide header/footer elements that show date, page numbers, etc. */
        @media print {
          body {
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
        }
      </style>
      </head>
      <body>
        ${pdfHeader + document.querySelector('#citation-pdf').innerHTML}
      </body>
    </html>`

    // Create an iframe element
    const iframe = document.createElement('iframe')
    iframe.style.position = 'fixed'
    iframe.style.right = '100%'
    iframe.style.bottom = '100%'
    iframe.style.width = '0'
    iframe.style.height = '0'
    iframe.style.border = 'none'
    document.body.appendChild(iframe)

    // Write the HTML content to the iframe
    const doc = iframe.contentDocument || iframe.contentWindow.document
    doc.open()
    doc.write(htmlContent)
    doc.close()

    // Wait for the iframe content to load, then print
    setTimeout(() => {
      iframe.contentWindow.print()
      document.body.removeChild(iframe)
    }, 500) // Adjust the delay as needed
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
          <div className='py-3'>
            <p>
              Created by :{' '}
              <strong className='text-primary'>
                {data.uploadedBy.userName}
              </strong>
            </p>
            {data.createdAt && (
              <p className='uppercase'>
                Created at :{' '}
                <strong className='text-primary'>
                  {new Date(data.createdAt).toLocaleString()}
                </strong>
              </p>
            )}
            <p className='uppercase'>
              Last modified at :{' '}
              <strong className='text-primary'>
                {new Date(data.lastModifiedDate).toLocaleString()}
              </strong>
            </p>
          </div>
        )}
        <div className='flex items-center justify-center gap-3 pb-3'>
          {user && (
            <div className='flex gap-3'>
              {user.userType === 'staff' ||
                (user.userType === 'admin' && (
                  <Link to={`/admin-dashboard/edit-citation/${data._id}`}>
                    <SLButton
                      className={'max-md:text-sm px-2 py-[5px]'}
                      variant={'primary'}
                      title={'Edit'}
                    />
                  </Link>
                ))}
              {user.userType === 'admin' && (
                <SLButton
                  className={'max-md:text-sm px-2 py-[5px]'}
                  variant={'error'}
                  onClick={() => setIsDeleteModalOpen(true)}
                  title={'Delete'}
                />
              )}
              {data.status === 'pending' && user.userType === 'admin' && (
                <SLButton
                  className={'max-md:text-sm px-2 py-[5px]'}
                  variant={'success'}
                  onClick={handleApprove}
                  isLoading={isApproving}
                  loadingText={'Approving...'}
                  title={'Approve'}
                />
              )}

              {data.status === 'approved' && user.userType === 'admin' && (
                <SLButton
                  className={'max-md:text-sm px-2 py-[5px]'}
                  variant={'primary'}
                  onClick={() => setIsNotificationModalOpen(true)}
                  title={'Add to Notification'}
                />
              )}
            </div>
          )}
          {user && (
            <div className='flex max-sm:grid grid-cols-3 gap-3'>
              {user.userType !== 'staff' && (
                <SLButton
                  className={'max-md:text-sm px-2 py-[5px]'}
                  variant={'primary'}
                  onClick={() => setIsShareModalOpen(true)}
                  title={'Share'}
                />
              )}
              <SLButton
                className={'max-md:text-sm px-2 py-[5px]'}
                variant={'primary'}
                isLoading={isDownloading}
                loadingText={'Downloading...'}
                onClick={generatePdf}
                iconColor={'white'}
                title={'Download'}
              />
              <SLButton
                className={'max-md:text-sm px-2 py-[5px]'}
                variant={'primary'}
                onClick={printPdf}
                title={'Print'}
              />
            </div>
          )}
        </div>
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
        {isShareModalOpen && (
          <ShareCitationModal
            isOpen={true}
            onClose={() => setIsShareModalOpen(false)}
            citation={data._id}
          />
        )}
        <div style={{ padding: '10px', fontSize: 16 }}>
          <p
            className='text-center uppercase font-extrabold'
            style={{
              textAlign: 'center',
              fontWeight: '700',
              fontSize: '1.5rem',
              textTransform: 'uppercase',
            }}
          >
            {data.citationNo}
          </p>

          {/* {data.equivalentCitations && (
            <p className='text-center py-2 capitalize'>
              Equivalent Citations : {data.equivalentCitations}
            </p>
          )} */}

          <p className='text-center text-2xl py-2 capitalize'>
            {data.institutionName}
          </p>

          {data.apellateType && (
            <p className='text-center text-lg capitalize'>
              {data.apellateType} Appellant Jurisdiction
            </p>
          )}

          {/* {data.judgeName && (
            <p className='text-center text-lg capitalize'>
              {' '}
              <strong>Bench : </strong>
              <span className='uppercase'>{data.judgeName}</span>
            </p>
          )} */}

          {data.caseNo && (
            <div>
              <div
                style={{ textAlign: 'center' }}
                className='pb-5 text-black text-center pt-5 text-2xl'
                dangerouslySetInnerHTML={{
                  __html: data.caseNo,
                }}
              />
            </div>
          )}

          {data.partyNameAppealant && (
            <div id='partyName' className='text-center pt-3 uppercase'>
              <div className='flex relative items-center justify-center w-full'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.partyNameAppealant,
                  }}
                />
                <div className='capitalize absolute right-0'>
                  {' '}
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp;......Appellant
                </div>
              </div>
            </div>
          )}
          {data.partyNameAppealant && (
            <p className='text-center text-lg'>Versus</p>
          )}
          {data.partyNameRespondent && (
            <div id='opponentName' className='text-center uppercase'>
              <div className='flex relative items-center justify-center w-full'>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.partyNameRespondent,
                  }}
                />
                <div className='capitalize absolute right-0 top-0'>
                  {' '}
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp;......Respondent
                </div>
              </div>
            </div>
          )}

          {data.advocatePetitioner && (
            <div>
              <strong className='text-lg underline'>
                Advocate for Petitioner / Appellant :{' '}
              </strong>
              {/* <p>{data.advocatePetitioner}</p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: data.advocatePetitioner,
                }}
              />
            </div>
          )}

          {data.advocateRespondent && (
            <div className='pb-7'>
              <strong className='text-lg underline'>
                Advocate for Respondent :{' '}
              </strong>
              {/* <p>{data.advocateRespondent}</p> */}
              <div
                dangerouslySetInnerHTML={{
                  __html: data.advocateRespondent,
                }}
              />
            </div>
          )}

          {data.whetherReported && (
            <div>
              <div
                className='pb-5 text-black'
                dangerouslySetInnerHTML={{
                  __html: data.whetherReported,
                }}
              />
            </div>
          )}

          <div id='citation-pdf'>
            {data.headNote && (
              <div className='pt-14'>
                {/* <strong className='text-lg underline'>Headnote :</strong> */}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.headNote,
                  }}
                />
              </div>
            )}

            {data.index && (
              <div>
                <p className='text-lg underline font-semibold'>Index :</p>
                <div
                  className='pb-5 text-black'
                  dangerouslySetInnerHTML={{
                    __html: data.index,
                  }}
                />
              </div>
            )}

            {data.judgements && (
              <div>
                {data.type === 'judgement' && (
                  <p className='text-lg font-bold py-5 underline'>
                    Judgment :{' '}
                  </p>
                )}
                <div
                  dangerouslySetInnerHTML={{
                    __html: data.judgements,
                  }}
                />
              </div>
            )}

            {data.dateOfHearing && (
              <p
                style={{ paddingTop: '30px' }}
                className='font-extrabold text-xl py-3'
              >
                <strong>Date of Hearing</strong> :{' '}
                {new Date(data.dateOfHearing).toLocaleDateString('en-GB')}
              </p>
            )}

            {data.dateOfOrder && (
              <p className='font-extrabold text-xl pb-3'>
                <strong>Date of Judgment</strong> :{' '}
                {new Date(data.dateOfOrder).toLocaleDateString('en-GB')}
              </p>
            )}

            {data.judgeName && (
              <p className='text-lg capitalize'>
                {' '}
                <strong>Judge Name : </strong>
                <span className='uppercase'>{data.judgeName}</span>
              </p>
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

            {data.diaryNo && (
              <div>
                <p className=' font-bold text-lg pt-3'>
                  Diary No : <span className='font-normal'>{data.diaryNo}</span>
                </p>
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

            <p
              style={{
                color: 'red',
                paddingTop: '20px',
                textAlign: 'justify',
                fontSize: '14px',
              }}
              className='text-red-600 pt-10 text-justify text-sm'
            >
              <strong className='underline'>Disclaimer :</strong> This text of
              the judgment/order is provided for informational purposes to our
              subscribers until it is officially reported in Supreme Court Cases
              or the relevant law report/journal. It has not yet been processed,
              verified, or authenticated based on the certified copy. The Guide
              Notes in bold are only indicative of the subject matter addressed
              by the Court. Therefore, the editors, publishers, and printers are
              not liable for any actions taken or not taken, or any advice given
              or accepted, based on this text.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleCitationPage

{
  /* <p style="margin: 10px 0; text-align: center; font-size: 16px;">Bench: ${
        data.judgeName
      }</p> */
}
