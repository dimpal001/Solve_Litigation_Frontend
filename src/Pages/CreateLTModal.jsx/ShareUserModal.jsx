import { useEffect, useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  SLButton,
  SLSpinner,
} from '../../Components/Customs'
import axios from 'axios'
import { api } from '../../Components/Apis'
import { enqueueSnackbar } from 'notistack'

const ShareUserModal = ({ isOpen, onClose }) => {
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [isSharing, setIsSharing] = useState(false)

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/auth/user-list`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      setUsers(response.data)
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleShare = () => {
    if (selectedUsers.length === 0) {
      enqueueSnackbar('Select a user!', { variant: 'error' })
      return
    }
    setIsSharing(true)
    console.log(selectedUsers)
  }

  return (
    <Modal isOpen={isOpen} size={'md'}>
      <ModalContent>
        <ModalCloseButton onClick={onClose} />
        <ModalHeader>Share this Argument</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-3'>
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={index}>
                  <User
                    user={user}
                    isSelect={selectedUsers.includes(user._id) ? true : false}
                    setSelectedUsers={setSelectedUsers}
                  />
                </div>
              ))
            ) : (
              <div className='flex justify-center items-center h-[100px]'>
                <SLSpinner width={'30px'} />
              </div>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <SLButton title={'Close'} onClick={onClose} variant={'secondary'} />
          <SLButton
            title={'Share'}
            onClick={handleShare}
            isLoading={isSharing}
            loadingText={'Sharing...'}
            iconColor={'white'}
            variant={'primary'}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

const User = ({ user, isSelect, setSelectedUsers }) => {
  const addUser = (user) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.includes(user)
        ? prevSelectedUsers.filter((id) => id !== user)
        : [...prevSelectedUsers, user]
    )
  }

  return (
    <div
      onClick={() => addUser(user._id)}
      className={`flex items-center ${
        isSelect
          ? 'bg-primary hover:bg-primary'
          : 'bg-gray-200 hover:bg-teal-100'
      } p-3 rounded-sm gap-5 cursor-pointer`}
    >
      <div
        className={`h-10 ${
          isSelect ? 'bg-gray-200 text-primary' : 'bg-primary text-white'
        } w-10 rounded-full flex justify-center items-center`}
      >
        {user.fullName.charAt(0)}
      </div>
      <div className={`${isSelect && 'text-white'}`}>
        <p className='font-semibold max-md:text-base'>{user.fullName}</p>
        <p className='text-sm max-md:text-xs'>{user.address}</p>
      </div>
      {isSelect && (
        <span className='w-8 ml-auto'>
          <svg
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
                d='M4.89163 13.2687L9.16582 17.5427L18.7085 8'
                stroke='#ffffff'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>{' '}
            </g>
          </svg>
        </span>
      )}
    </div>
  )
}

export default ShareUserModal
