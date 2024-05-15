const UserDetailsModal = ({ isOpen, onClose, title, user }) => {
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
              className={`text-2xl border-b pb-3 font-extrabold text-primary mb-4`}
            >
              {title}
            </div>
            <div className='text-gray-700'>
              <div>
                <p>
                  Email : <span className='text-primary'>{user.email}</span>
                </p>
                <p>
                  Phone Number :{' '}
                  <span className='text-primary'>{user.phoneNumber}</span>
                </p>
                <p>
                  State Name :{' '}
                  <span className='text-primary'>{user.state}</span>
                </p>
                <p>
                  District Name :{' '}
                  <span className='text-primary'>{user.district}</span>
                </p>
                {user.address && (
                  <p>
                    Address :{' '}
                    <span className='text-primary'>{user.address}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default UserDetailsModal
