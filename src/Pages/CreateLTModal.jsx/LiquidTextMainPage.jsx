import { useState, useEffect, useCallback } from 'react'
import { pdfjs, Document, Page } from 'react-pdf'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import { CustomInput, SLButton, SLSpinner } from '../../Components/Customs'
import { useNavigate, useParams } from 'react-router-dom'
import { api } from '../../Components/Apis'
import axios from 'axios'
import CreateArgumentModal from './CreateArgumentModal'
import CreateLTModal from './CraeteLTModal'
import ConfirmDeleteModal from './ConfirmDeleteModal'
import ShareUserModal from './ShareUserModal'
import { enqueueSnackbar } from 'notistack'

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   'pdfjs-dist/build/pdf.worker.min.mjs',
//   import.meta.url
// ).toString()

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
}

const maxWidth = 800

const LiquidTextMainPage = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const [clientDetails, setClientDetails] = useState(null)
  const [file, setFile] = useState(null)
  const [isFileLoading, setIsFileLoading] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [numPages, setNumPages] = useState(0)
  const [deleteType, setDeleteType] = useState('')
  const [deleteTitle, setDeleteTitle] = useState('')
  const [deleteClientId, setDeleteClientId] = useState('')
  const [deleteArgumentId, setDeleteArgumentId] = useState('')
  const [deleteLiquidText, setDeleteLiquidText] = useState('')
  const [allArguments, setAllArguments] = useState([])
  const [liquidTexts, setLiquidTexts] = useState([])
  const [liquidTextTitle, setLiquidTextTitle] = useState('')
  const [selectedArgumentId, setSelectedArgumentId] = useState('')
  const [fetchedArgumentDetails, setFetchedArgumentDetails] = useState(null)
  const [isCreateArgumentModalOpen, setIsCreateArgumentModalOpen] =
    useState(false)
  const [isCreateLTModalOpen, setIsCreateLTModalOpen] = useState(false)
  const [isShareModalOpen, setIsShareodalOpen] = useState(false)

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    text: '',
    page: '',
  })

  useEffect(() => {
    fetchClientDetails(id)
  }, [id])

  const fetchClientDetails = async (clientId) => {
    try {
      setClientDetails(null)
      setAllArguments([])

      const response = await axios.get(
        `${api}/api/solve_litigation/liquid-text/client-details/${clientId}`
      )
      setClientDetails(response.data)
      setAllArguments(response.data.arguments)
    } catch (error) {
      console.error('Error fetching document details:', error)
      // Handle error (e.g., show error message)
    }
  }

  const fetchArgumentDetails = async (argumentId) => {
    try {
      setSelectedArgumentId(argumentId)
      setFile(null)
      setFetchedArgumentDetails(null)
      setIsFileLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/liquid-text/argument-details/${id}/${argumentId}`
      )
      console.log(response.data)
      setFetchedArgumentDetails(response.data.argumentDetails)
      setLiquidTexts(response.data.argumentDetails.liquidText)

      await fetchArgumentFile(response.data.argumentDetails.file.fileName)
    } catch (error) {
      console.error('Error fetching PDF:', error)
      // Handle error (e.g., show error message)
    } finally {
      setIsFileLoading(false)
    }
  }

  const fetchArgumentFile = async (fileName) => {
    try {
      setFile(null)
      setIsFileLoading(true)
      const response = await axios.get(
        `${api}/api/solve_litigation/liquid-text/download-file/${fileName}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
          responseType: 'blob',
        }
      )

      const fileUrl = URL.createObjectURL(
        new Blob([response.data], { type: response.headers['content-type'] })
      )
      setFile(fileUrl)
    } catch (error) {
      console.error('Error fetching PDF:', error)
    } finally {
      setIsFileLoading(false)
    }
  }

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }) => {
    setNumPages(nextNumPages)
  }

  const handleArgumentCreated = (newArgument) => {
    setAllArguments(newArgument)
  }

  const handleLiquidTextAdded = (liquidText) => {
    setLiquidTexts(liquidText)
  }

  function findTextOnPageAndScroll(text, pageNo) {
    const elementsContainingText = []
    console.log(pageNo)

    // Function to check if an element contains the search text
    function searchElement(element) {
      if (element.nodeType === Node.TEXT_NODE) {
        if (element.textContent.includes(text)) {
          elementsContainingText.push(element.parentElement)
        }
      } else {
        element.childNodes.forEach((child) => searchElement(child))
      }
    }

    searchElement(document.body)

    if (elementsContainingText.length > 0) {
      elementsContainingText[0].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }

    console.log(elementsContainingText)

    return elementsContainingText
  }

  const handleDelete = (title, type, clientId, argumentId, liquidTextId) => {
    console.log(liquidTextId)
    setDeleteClientId(clientId)
    setDeleteArgumentId(argumentId)
    setDeleteLiquidText(liquidTextId)

    setDeleteTitle(title)
    setDeleteType(type)
    setIsDeleteModalOpen(true)
  }

  const handleReload = () => {
    if (deleteType === 'delete-argument') {
      fetchClientDetails(id)
      fetchArgumentDetails(selectedArgumentId)
    }
    if (deleteType === 'delete-liquid-text') {
      fetchArgumentDetails(selectedArgumentId)
    }
    if (deleteType === 'delete-client') {
      navigate('/prepare-argument')
    }
  }

  const handleTextSelection = useCallback((event) => {
    event.preventDefault() // Prevent the default context menu from showing
    const selectedText = window.getSelection().toString()
    if (selectedText) {
      let pageNumber = null
      let node = event.target
      while (node) {
        if (node.hasAttribute && node.hasAttribute('data-page-number')) {
          pageNumber = parseInt(node.getAttribute('data-page-number'), 10)
          break
        }
        node = node.parentNode
      }
      // Adjust x and y to include offsets if needed
      setContextMenu({
        visible: true,
        x: event.clientX + window.scrollX,
        y: event.clientY + window.scrollY,
        text: selectedText,
        page: pageNumber,
      })
      console.log(`Selected text: ${selectedText}`)
      console.log(`Page number: ${pageNumber}`)
    } else {
      setContextMenu({ visible: false, x: 0, y: 0, text: '' })
    }
  }, [])

  useEffect(() => {
    document.addEventListener('contextmenu', handleTextSelection)
    return () => {
      document.removeEventListener('contextmenu', handleTextSelection)
    }
  }, [handleTextSelection])

  const handleAddLiquidText = async () => {
    // e.preventDefault()

    if (contextMenu.title === '') {
      enqueueSnackbar('Invalid Title', {
        variant: 'error',
      })
      return
    }

    try {
      const response = await axios.post(
        `${api}/api/solve_litigation/liquid-text/add-liquid-text/${id}/${selectedArgumentId}`,
        {
          title: liquidTextTitle,
          text: contextMenu.text,
          pageNo: contextMenu.page,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      console.log(response.data)
      setLiquidTexts(response.data.liquidText)
      setContextMenu({ visible: false, text: '', page: '' })
      setLiquidTextTitle('')
    } catch (error) {
      enqueueSnackbar(error.response.data.error, {
        variant: 'error',
      })
    }
  }

  return (
    <div className='w-full container mx-auto min-h-screen p-5'>
      {/* <p className='text-4xl font-bold text-center'>Client Details</p> */}
      {contextMenu.visible && (
        <div
          className='absolute z-50 p-2 bg-white border border-gray-300 shadow-lg'
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <p
            className='absolute top-0 right-0 p-2 text-sm cursor-pointer'
            onClick={() => setContextMenu(false)}
          >
            ❌
          </p>
          <div className=''>
            <p className='font-bold p-1'>Add to liquid text</p>
            <div className='flex gap-2'>
              <CustomInput
                name={liquidTextTitle}
                value={liquidTextTitle}
                onChange={(e) => setLiquidTextTitle(e.target.value)}
                placeholder={'Enter a title...'}
              />
              <SLButton
                onClick={() => handleAddLiquidText()}
                title={'Add'}
                variant={'primary'}
              />
            </div>
          </div>
        </div>
      )}
      {clientDetails && (
        <div className='flex flex-col gap-5'>
          <div className='flex justify-center max-md:flex-col gap-3 pt-3'>
            <div className='bg-gray-200 p-8 lg:w-1/3 items-center justify-between flex'>
              <div>
                <p>
                  Name :{' '}
                  <strong className='text-primary capitalize'>
                    {clientDetails.clientName}
                  </strong>
                </p>
                <p>
                  Address :{' '}
                  <strong className='text-primary capitalize'>
                    {clientDetails.clientAddress}
                  </strong>
                </p>
                <div className='flex gap-2 pt-2'>
                  <SLButton
                    className={'text-sm'}
                    title={'Create Argument'}
                    onClick={() => setIsCreateArgumentModalOpen(true)}
                    variant={'primary'}
                  />
                  <SLButton
                    className={'text-sm'}
                    title={'Delete Client'}
                    onClick={() =>
                      handleDelete(
                        clientDetails.clientName,
                        'delete-client',
                        id
                      )
                    }
                    variant={'error'}
                  />
                </div>
              </div>
            </div>
            <div className='bg-gray-200 p-8 lg:w-2/3 justify-between flex'>
              {allArguments.length > 0 && (
                <div className=''>
                  <p className='font-bold pb-2 text-xl'>Arguments</p>
                  <div className='flex flex-wrap items-start gap-5'>
                    {allArguments.map((data, index) => (
                      <div
                        onClick={() => fetchArgumentDetails(data.id)}
                        key={index}
                        className={`px-2 py-1 cursor-pointer rounded-sm font-semibold ${
                          selectedArgumentId === data.id
                            ? 'bg-primaryHover'
                            : 'bg-primary'
                        } text-sm text-white`}
                      >
                        {data.title}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isCreateArgumentModalOpen && (
        <CreateArgumentModal
          isOpen={true}
          onClose={() => setIsCreateArgumentModalOpen(false)}
          onArgumentCreated={handleArgumentCreated}
          clientId={id}
        />
      )}
      {isCreateLTModalOpen && (
        <CreateLTModal
          isOpen={true}
          onClose={() => setIsCreateLTModalOpen(false)}
          clientId={id}
          argumentId={selectedArgumentId}
          onLiquidTextAdded={handleLiquidTextAdded}
        />
      )}
      {isShareModalOpen && (
        <ShareUserModal
          isOpen={true}
          onClose={() => setIsShareodalOpen(false)}
        />
      )}
      {isDeleteModalOpen && (
        <ConfirmDeleteModal
          isOpen={true}
          onClose={() => setIsDeleteModalOpen(false)}
          title={deleteTitle}
          type={deleteType}
          clientId={deleteClientId}
          argumentId={deleteArgumentId}
          liquidTextId={deleteLiquidText}
          reload={handleReload}
        />
      )}
      <div>
        {isFileLoading && (
          <div className='flex py-10'>
            <SLSpinner className={'w-14'} />
          </div>
        )}
        {file && (
          <div className='flex w-full max-md:flex-col-reverse justify-between bg-gray-200 mt-3 gap-5 p-7'>
            <div className='w-2/3 max-md:w-full border rounded-sm flex justify-center p-0'>
              <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    width={maxWidth}
                    data-page-number={index + 1}
                  />
                ))}
              </Document>
            </div>
            <div className='relative w-1/3 max-md:w-full'>
              {fetchedArgumentDetails && (
                <div>
                  <p className='text-2xl text-primary font-bold'>
                    {fetchedArgumentDetails.title}
                  </p>
                </div>
              )}
              <div className='flex flex-col sticky py-3 left-0 top-0 w-full justify-between items-start gap-3'>
                <div className='flex w-full gap-3 items-center'>
                  <SLButton
                    className={'text-sm'}
                    title={'Delete this Argument'}
                    onClick={() =>
                      handleDelete(
                        fetchedArgumentDetails.title,
                        'delete-argument',
                        id,
                        selectedArgumentId,
                        ''
                      )
                    }
                    variant={'error'}
                  />
                  <SLButton
                    className={'text-sm'}
                    title={'Add Liquid Text'}
                    variant={'primary'}
                    onClick={() => setIsCreateLTModalOpen(true)}
                  />
                  <span
                    title='Share this argument'
                    onClick={() => setIsShareodalOpen(true)}
                    className='cursor-pointer'
                  >
                    <svg
                      className='w-7'
                      fill='#26a269'
                      viewBox='0 0 32 32'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      stroke='#26a269'
                    >
                      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                      <g
                        id='SVGRepo_tracerCarrier'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      ></g>
                      <g id='SVGRepo_iconCarrier'>
                        {' '}
                        <title>share</title>{' '}
                        <path d='M0 25.472q0 2.368 1.664 4.032t4.032 1.664h18.944q2.336 0 4-1.664t1.664-4.032v-8.192l-3.776 3.168v5.024q0 0.8-0.544 1.344t-1.344 0.576h-18.944q-0.8 0-1.344-0.576t-0.544-1.344v-18.944q0-0.768 0.544-1.344t1.344-0.544h9.472v-3.776h-9.472q-2.368 0-4.032 1.664t-1.664 4v18.944zM5.696 19.808q0 2.752 1.088 5.28 0.512-2.944 2.24-5.344t4.288-3.872 5.632-1.664v5.6l11.36-9.472-11.36-9.472v5.664q-2.688 0-5.152 1.056t-4.224 2.848-2.848 4.224-1.024 5.152zM32 22.080v0 0 0z'></path>{' '}
                      </g>
                    </svg>
                  </span>
                </div>
                {liquidTexts.length > 0 && (
                  <div className='w-full'>
                    <p className='text-2xl font-semibold pb-1'>
                      All Liquid Text
                    </p>
                    <div className='gap-3 flex flex-col w-full'>
                      {liquidTexts.length > 0 &&
                        liquidTexts.map((data, index) => (
                          <div key={index} className='flex w-full'>
                            <div
                              onClick={() =>
                                findTextOnPageAndScroll(data.text, data.pageNo)
                              }
                              className='w-full rounded-sm text-sm px-2 py-1 cursor-pointer bg-gray-400 text-white'
                            >
                              {data.title}
                            </div>
                            <div
                              onClick={() =>
                                handleDelete(
                                  data.title,
                                  'delete-liquid-text',
                                  id,
                                  selectedArgumentId,
                                  data._id
                                )
                              }
                              className='flex cursor-pointer hover:bg-errorHover justify-center px-2 items-center bg-error'
                            >
                              <svg
                                className='w-5'
                                viewBox='0 0 24 24'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                                <g
                                  id='SVGRepo_tracerCarrier'
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                ></g>
                                <g id='SVGRepo_iconCarrier'>
                                  {' '}
                                  <path
                                    d='M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16'
                                    stroke='#ffffff'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>{' '}
                                </g>
                              </svg>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default LiquidTextMainPage
