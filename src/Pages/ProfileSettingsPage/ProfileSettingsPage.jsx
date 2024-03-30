import { Center } from '@chakra-ui/react'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import { FaEdit } from 'react-icons/fa'
import { Colors } from '../../Components/Colors'
import {} from '@chakra-ui/react'
import { PrimaryOutlineButton } from '../../Components/Customs'
import ChangeEmailPhone from './ChangeEmailPhone'
import ChangePasswordModal from './ChangePasswordModal'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { api } from '../../Components/Apis'

const ProfileSettingsPage = () => {
  const { user } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState(null)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false)
  const [selectedModal, setSelectedModal] = useState('')

  const handleModalOpen = () => {
    setIsModalOpen(true)
  }
  const handleChangePassModalOpen = () => {
    setIsChangePassModalOpen(true)
  }

  const fetchUserDetails = async () => {
    const token = sessionStorage.getItem('token')

    try {
      const response = await axios.get(
        `${api}/api/solve_litigation/auth/user-details/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      setUserDetails(response.data)
      console.log(userDetails)
    } catch (error) {
      console.error('Error fetching user details:', error.response.data)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const reloadData = () => {
    fetchUserDetails()
  }

  return (
    <div>
      {!userDetails ? (
        <Loading title={'Loading'} />
      ) : (
        <Center className='flex max-md:px-5 max-md:pt-10 justify-center w-full'>
          <div
            data-aos='fade-up'
            className='shadow-xl border w-[500px] p-10 rounded-xl'
          >
            <div className='flex-col gap-10'>
              <div>
                <p className='text-center font-extrabold pt-5'>Profile</p>
                <div className='flex flex-col gap-5'>
                  <div>
                    <p className='text-sm'>Full Name</p>
                    <p className='font-extrabold'>{userDetails.fullName}</p>
                  </div>
                  <div>
                    <p className='text-sm'>Email Address</p>
                    <div className='flex items-center justify-between gap-3'>
                      <p className='font-extrabold'>{userDetails.email} </p>
                      <FaEdit
                        cursor={'pointer'}
                        onClick={() => {
                          handleModalOpen()
                          setSelectedModal('email')
                        }}
                        color={Colors.primary}
                      />
                    </div>
                  </div>
                  <div>
                    <p className='text-sm'>Phone Number</p>
                    <div className='flex items-center justify-between gap-3'>
                      <p className='font-extrabold'>
                        {userDetails.phoneNumber}{' '}
                      </p>
                      <FaEdit
                        cursor={'pointer'}
                        onClick={() => {
                          handleModalOpen()
                          setSelectedModal('phoneNumber')
                        }}
                        color={Colors.primary}
                      />
                    </div>
                  </div>
                  {userDetails.userType === 'guest' && (
                    <div>
                      <p className='text-sm'>State Name</p>
                      <p className='font-extrabold'>{userDetails.state}</p>
                    </div>
                  )}
                  {userDetails.userType === 'guest' && (
                    <div>
                      <p className='text-sm'>District Name</p>
                      <p className='font-extrabold'>{userDetails.district}</p>
                    </div>
                  )}
                  <div>
                    <PrimaryOutlineButton
                      size={'sm'}
                      onClick={handleChangePassModalOpen}
                      title={'Change Password'}
                    />
                  </div>
                </div>
                {isModalOpen && (
                  <ChangeEmailPhone
                    selectedModal={selectedModal}
                    closeModal={() => setIsModalOpen(false)}
                    isModalOpen={true}
                    reload={reloadData}
                  />
                )}
                {isChangePassModalOpen && (
                  <ChangePasswordModal
                    isModalOpen={true}
                    closeModal={() => setIsChangePassModalOpen(false)}
                  />
                )}
              </div>
            </div>
          </div>
        </Center>
      )}
    </div>
  )
}

export default ProfileSettingsPage
