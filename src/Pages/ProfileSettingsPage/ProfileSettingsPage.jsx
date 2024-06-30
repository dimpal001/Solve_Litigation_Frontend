import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import ChangeEmailPhone from './ChangeEmailPhone'
import ChangePasswordModal from './ChangePasswordModal'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { api } from '../../Components/Apis'
import SelectServiceModal from '../../Components/SelectServiceModal'
import ReVerifyEmail from '../../Components/ReVerifyEmail'
import UpdateBioModal from './UpdateBioModal'

const ProfileSettingsPage = () => {
  const { user } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false)
  const [isBioModalOpen, setIsBioModalOpen] = useState(false)
  const [selectedModal, setSelectedModal] = useState('')

  const fetchUserDetails = async () => {
    const token = localStorage.getItem('token')

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
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      {!userDetails ? (
        <Loading title={'Loading'} />
      ) : (
        <div className='flex flex-col items-center w-full max-w-2xl px-10 py-10 bg-white shadow-xl rounded-xl'>
          {user.userType === 'admin' || user.isVerified ? (
            <div className='w-full'>
              <p className='text-3xl text-primary font-extrabold pb-5'>
                Profile
              </p>
              <div className='grid grid-cols-2 gap-6'>
                <div>
                  <p className='text-sm'>Full Name</p>
                  <p className='font-extrabold'>{userDetails.fullName}</p>
                </div>
                {userDetails.bio && (
                  <div>
                    <p className='text-sm'>Speciality</p>
                    <p className='font-extrabold'>{userDetails.bio}</p>
                  </div>
                )}
                <div>
                  <p className='text-sm'>Email Address</p>
                  <p className='font-extrabold'>{userDetails.email} </p>
                </div>
                {userDetails.specialist && (
                  <div>
                    <p className='text-sm'>Speciality</p>
                    <p className='font-extrabold'>{userDetails.specialist}</p>
                  </div>
                )}
                {userDetails.state && (
                  <div>
                    <p className='text-sm'>State</p>
                    <p className='font-extrabold'>{userDetails.state}</p>
                  </div>
                )}
                {userDetails.district && (
                  <div>
                    <p className='text-sm'>Speciality</p>
                    <p className='font-extrabold'>{userDetails.district}</p>
                  </div>
                )}
                <div>
                  <p className='text-sm'>Phone Number</p>
                  <div className='flex items-center justify-between gap-3'>
                    <p className='font-extrabold'>
                      {userDetails.phoneNumber}{' '}
                      <span
                        onClick={() => {
                          setIsModalOpen(true)
                          setSelectedModal('phoneNumber')
                        }}
                        className='text-primary cursor-pointer'
                      >
                        Edit
                      </span>
                    </p>
                    {/* <p
                      onClick={() => {
                        setIsModalOpen(true)
                        setSelectedModal('phoneNumber')
                      }}
                      className='text-primary cursor-pointer'
                    >
                      Edit
                    </p> */}
                  </div>
                </div>
                {userDetails.userType === 'guest' && (
                  <>
                    <div>
                      <p className='text-sm'>State Name</p>
                      <p className='font-extrabold'>{userDetails.state}</p>
                    </div>
                    <div>
                      <p className='text-sm'>District Name</p>
                      <p className='font-extrabold'>{userDetails.district}</p>
                    </div>
                  </>
                )}
              </div>
              <div className='flex mt-6 gap-5'>
                <p
                  onClick={() => setIsChangePassModalOpen(true)}
                  className='text-primary font-bold cursor-pointer hover:underline'
                >
                  Change Password
                </p>
                {user.userType === 'guest' && (
                  <p
                    onClick={() => setIsServiceModalOpen(true)}
                    className='text-primary font-bold cursor-pointer hover:underline'
                  >
                    Update Service(s)
                  </p>
                )}
                {!user.bio && user.userType === 'lawyer' && (
                  <p
                    onClick={() => setIsBioModalOpen(true)}
                    className='text-primary font-bold cursor-pointer hover:underline'
                  >
                    Add Bio
                  </p>
                )}
              </div>
              {isBioModalOpen && (
                <UpdateBioModal
                  reload={reloadData}
                  isOpen={true}
                  onClose={() => setIsBioModalOpen(false)}
                />
              )}
              {isModalOpen && (
                <ChangeEmailPhone
                  selectedModal={selectedModal}
                  closeModal={() => setIsModalOpen(false)}
                  isModalOpen={true}
                  reload={reloadData}
                />
              )}
              {isServiceModalOpen && (
                <SelectServiceModal
                  isOpen={true}
                  setIsOpen={setIsServiceModalOpen}
                />
              )}
              {isChangePassModalOpen && (
                <ChangePasswordModal
                  isModalOpen={true}
                  closeModal={() => setIsChangePassModalOpen(false)}
                />
              )}
            </div>
          ) : (
            <ReVerifyEmail />
          )}
        </div>
      )}
    </div>
  )
}

export default ProfileSettingsPage
