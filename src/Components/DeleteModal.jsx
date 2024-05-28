import axios from 'axios'
import { SLSpinner } from './Customs'
import { enqueueSnackbar } from 'notistack'
import { useState } from 'react'

const DeleteModal = ({
  isOpen,
  onClose,
  title,
  api,
  variant,
  reload,
  iconColor,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const response = await axios.delete(`${api}`)
      reload()
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
      console.log(error)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <>
      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          <div className='fixed inset-0 bg-black opacity-50'></div>
          <div className='relative bg-white rounded-sm w-96 p-6'>
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
              className={`text-2xl ${
                variant === 'error' && 'text-red-500'
              } font-extrabold mb-4`}
            >
              {title}
            </div>
            <div className='text-gray-700'>This fucntion cannot be undone.</div>
            <div className='mt-6 flex justify-end'>
              <button
                onClick={onClose}
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-sm hover:bg-gray-400'
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className={`ml-2 px-4 py-2 flex justify-center items-center gap-2
                  ${variant === 'error' && 'bg-red-500 hover:bg-red-600'}
                  ${variant === 'success' && 'bg-green-500 hover:bg-green-600'}
                  ${!variant && 'bg-primary hover:bg-secondary'}
                   text-white rounded-sm`}
              >
                {isLoading === true ? (
                  <SLSpinner iconColor={iconColor} />
                ) : (
                  'Delete'
                )}{' '}
                {isLoading && 'Deleting...'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteModal
