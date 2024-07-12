import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../UserContext'
import ChangePasswordModal from './ChangePasswordModal'
import axios from 'axios'
import Loading from '../../Components/Loading'
import { api } from '../../Components/Apis'
import SelectServiceModal from '../../Components/SelectServiceModal'
import ReVerifyEmail from '../../Components/ReVerifyEmail'
import ProfileImg from '../../assets/profile.svg'
import { SLButton } from '../../Components/Customs'
import { enqueueSnackbar } from 'notistack'

const ProfileSettingsPage = () => {
  const { user } = useContext(UserContext)
  const [userDetails, setUserDetails] = useState(null)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false)
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [updatedDetails, setUpdatedDetails] = useState({})

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
      setUpdatedDetails(response.data)
    } catch (error) {
      console.error('Error fetching user details:', error.response.data)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUpdatedDetails({
      ...updatedDetails,
      [name]: value,
    })
  }

  const handleSubmit = async () => {
    const token = localStorage.getItem('token')

    try {
      setIsSaving(true)
      const response = await axios.put(
        `${api}/api/solve_litigation/auth/update-details/${user._id}`,
        updatedDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      fetchUserDetails()
      setIsEdit(false)
      enqueueSnackbar(response.data.message, { variant: 'success' })
    } catch (error) {
      enqueueSnackbar(error.response.data.error, { variant: 'error' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className='flex justify-center lg:pt-10 lg:bg-gray-100 items-start min-h-screen '>
      {!userDetails ? (
        <Loading title={'Loading'} />
      ) : (
        <div className='flex flex-col items-center w-full max-w-3xl lg:px-10 py-10 bg-white shadow-xl lg:rounded-xl'>
          {user.userType === 'admin' || user.isVerified ? (
            <div>
              <div className='flex max-md:flex-col items-center gap-6'>
                <div className='lg:w-1/3 max-md:flex justify-center flex-col items-center'>
                  <img src={ProfileImg} className='max-md:w-[57%]' alt='' />
                  <p className='font-bold text-center'>
                    {userDetails.fullName}
                  </p>
                  <p className='text-base text-center'>{userDetails.email}</p>
                </div>
                <div className='lg:w-2/3'>
                  <div className='flex justify-center gap-3'>
                    <SLButton
                      title={'Profile'}
                      onClick={() => setIsEdit(false)}
                      variant={isEdit ? 'outline' : 'primary'}
                    />
                    <SLButton
                      title={'Edit Profile'}
                      onClick={() => setIsEdit(true)}
                      variant={!isEdit ? 'outline' : 'primary'}
                    />
                  </div>
                  <div className='p-3 text-base bg-gray-100 mt-5'>
                    {userDetails.fullName && (
                      <div className='flex items-center  px-5 py-2 rounded-sm justify-between'>
                        <p>Full Name</p>
                        <p className='text-primary font-semibold'>
                          {userDetails.fullName}
                        </p>
                      </div>
                    )}
                    {userDetails.email && (
                      <div className='flex items-center px-5 py-2 rounded-sm justify-between'>
                        <p>Email Address</p>
                        <p className='text-primary font-semibold'>
                          {userDetails.email}
                        </p>
                      </div>
                    )}
                    {userDetails.phoneNumber && (
                      <div className='flex items-center  px-5 py-2 rounded-sm justify-between'>
                        <p>Phone Number</p>
                        {isEdit ? (
                          <CustomInput
                            value={updatedDetails.phoneNumber}
                            name='phoneNumber'
                            placeholder={'Enter phone number'}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className='text-primary font-semibold'>
                            {userDetails.phoneNumber}
                          </p>
                        )}
                      </div>
                    )}
                    {user.userType !== 'guest' && (
                      <div className='flex items-center px-5 py-2 rounded-sm justify-between'>
                        <p>Bio</p>
                        {isEdit ? (
                          <CustomInput
                            value={updatedDetails.bio}
                            name='bio'
                            placeholder={'Enter bio'}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className='text-primary font-semibold'>
                            {userDetails.bio}
                          </p>
                        )}
                      </div>
                    )}
                    {user.userType !== 'admin' && (
                      <div className='flex items-center  px-5 py-2 rounded-sm justify-between'>
                        <p>Address</p>
                        {isEdit ? (
                          <CustomInput
                            value={updatedDetails.address}
                            name='address'
                            placeholder={'Enter address'}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className='text-primary font-semibold'>
                            {userDetails.address}
                          </p>
                        )}
                      </div>
                    )}
                    {userDetails.specialist && (
                      <div className='flex items-center  px-5 py-2 rounded-sm justify-between'>
                        <p>Speciality</p>
                        <p className='text-primary font-semibold'>
                          {userDetails.specialist}
                        </p>
                      </div>
                    )}
                    {userDetails.state && (
                      <div className='flex items-center px-5 py-2 rounded-sm justify-between'>
                        <p>State</p>
                        <p className='text-primary font-semibold'>
                          {userDetails.state}
                        </p>
                      </div>
                    )}
                    {userDetails.district && (
                      <div className='flex items-center  px-5 py-2 rounded-sm justify-between'>
                        <p>District</p>
                        <p className='text-primary font-semibold'>
                          {userDetails.district}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className='flex max-md:justify-center justify-end lg:px-5 pt-5 '>
                    {isEdit ? (
                      <SLButton
                        className={'text-base'}
                        isLoading={isSaving}
                        loadingText={'Saving...'}
                        iconColor={'white'}
                        title={'Save Changes'}
                        onClick={handleSubmit}
                        variant={'primary'}
                      />
                    ) : (
                      <div className='flex max-md:justify-center justify-end px-5 lg:pr-5 lg:gap-5 gap-2'>
                        <SLButton
                          className={'text-base'}
                          title={'Update Services'}
                          onClick={() => setIsServiceModalOpen(true)}
                          variant={'outline'}
                        />
                        <SLButton
                          className={'text-base'}
                          title={'Change Password'}
                          onClick={() => setIsChangePassModalOpen(true)}
                          variant={'outline'}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
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

const CustomInput = ({ type, placeholder, onChange, value, name }) => {
  return (
    <input
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      name={name}
      type={type ? type : 'text'}
      className='px-3 py-1 w-48 focus:border-primary text-base focus:outline-none border rounded-sm'
    />
  )
}

export default ProfileSettingsPage
